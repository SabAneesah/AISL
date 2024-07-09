from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import tempfile
import subprocess
import os
import PyPDF2

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    try:
        # Create a temporary file to save the uploaded PDF
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp_pdf:
            contents = await file.read()
            tmp_pdf.write(contents)
            tmp_pdf_path = tmp_pdf.name
            print(tmp_pdf_path)

        def is_valid_pdf(file_path):
            try:
                with open(file_path, 'rb') as file:
                    reader = PyPDF2.PdfReader(file)
                    if len(reader.pages) > 0:
                        return True
            except PyPDF2.errors.PdfReadError:
                return False
            except Exception as e:
                print(f"An error occurred: {e}")
                return False
            return False

        # Usage
        file_path = tmp_pdf_path 
        if is_valid_pdf(file_path):
            print("The file is a valid PDF.")
        else:
            print("Invalid")

        # Call the process.py script with the path to the temporary PDF file
        result = subprocess.run(["python", "process.py", tmp_pdf_path], capture_output=True, text=True)

        print(result.stdout)

        # Check if the script was executed successfully
        if result.returncode == 0:
            return JSONResponse(content={"message": "PDF processed successfully", "output": result.stdout})
        else:
            return JSONResponse(content={"error": result.stderr}, status_code=500)
        
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
    finally:
        # Clean up the temporary file if it exists
        if os.path.exists(tmp_pdf_path):
            os.remove(tmp_pdf_path)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
