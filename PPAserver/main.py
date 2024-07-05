import os
from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.responses import JSONResponse,StreamingResponse
from subprocess import run
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import MongoClient
from pydantic import BaseModel
from typing import List
import gridfs
from bson import ObjectId

# Initialize FastAPI app
app = FastAPI()

# MongoDB connection settings
MONGO_DETAILS = "mongodb://localhost:27017"
client = AsyncIOMotorClient(MONGO_DETAILS)
database = client["AILMS"]
collection = database["analyzedPPA"]

# Synchronous MongoClient for GridFS
sync_client = MongoClient(MONGO_DETAILS)
sync_db = sync_client["AILMS"]
fs = gridfs.GridFS(sync_db)

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

class PastPaperAnalysis(BaseModel):
    pdf_id: str
    faculty: str
    year: int
    module: str
    course: str

@app.get("/get_all", response_model=List[PastPaperAnalysis])
async def get_all_past_paper_analysis():
    try:
        past_paper_analyses = []
        async for document in collection.find():
            document["_id"] = str(document["_id"])
            document["pdf_id"] = str(document["pdf_id"])
            past_paper_analyses.append(document)
        return past_paper_analyses
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/download/{pdf_id}")
async def download_pdf(pdf_id: str):
    try:
        pdf_id = ObjectId(pdf_id)
        grid_out = fs.get(pdf_id)
        return StreamingResponse(grid_out, media_type="application/pdf", headers={"Content-Disposition": f"attachment; filename={grid_out.filename}"})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/view/{pdf_id}")
async def view_pdf(pdf_id: str):
    try:
        pdf_id = ObjectId(pdf_id)
        grid_out = fs.get(pdf_id)
        return StreamingResponse(grid_out, media_type="application/pdf")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/upload")
async def upload_file(
        pdf: UploadFile = File(...),
        module: str = Form(...),
        year: str = Form(...),
        faculty: str = Form(...),
        course: str = Form(...)
):
    pdf_dir = "pdfUploads"
    pdf_path = os.path.join(pdf_dir, "analyze.pdf")

    if not os.path.exists(pdf_dir):
        os.makedirs(pdf_dir)

    try:
        with open(pdf_path, "wb") as f:
            f.write(await pdf.read())
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saving file: {e}")

    # Process the PDF to extract text and store in ChromaDB
    try:
        run(["python", "process_pdf.py"])
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing PDF: {e}")

    # Analyze the data in ChromaDB and store the analyzed PDF in MongoDB
    try:
        run(["python", "chroma_db.py", module, year, faculty, course])
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing PDF: {e}")

    return JSONResponse(content={"message": "File processed successfully"})


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)