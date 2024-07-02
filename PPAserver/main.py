import os
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
from subprocess import run
from fastapi.middleware.cors import CORSMiddleware
from chromadb.config import Settings
from chromadb import Client
from chromadb.api.fastapi import FastAPI as ChromaFastAPI

# Initialize FastAPI app
app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # List of allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

@app.post("/upload")
async def upload_file(
        pdf: UploadFile = File(...),
        module: str = Form(...),
        year: str = Form(...),
        faculty: str = Form(...),
        course: str = Form(...),
):
    pdf_path = f"pdfUploads/anaylze.pdf"

    with open(pdf_path, "wb") as f:
        f.write(await pdf.read())

    # Process the PDF to extract text and store in ChromaDB
    run(["python", "process_pdf.py"])

    # Analyze the data in ChromaDB and store the analyzed PDF in MongoDB
    run(["python", "chroma_db.py", module, year, faculty, course])

    return JSONResponse(content={"message": "File processed successfully"})


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
