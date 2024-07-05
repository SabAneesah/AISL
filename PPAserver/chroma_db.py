
import sys
import os
import openai
import gridfs
from pymongo import MongoClient
from fpdf import FPDF
from datetime import datetime
import chromadb
from chromadb.config import Settings
from dotenv import load_dotenv
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings
from chromadb.utils import embedding_functions



# Load environment variables
load_dotenv()

import google.generativeai as genai
import PIL.Image

genai.configure(api_key='AIzaSyBkPq2iOCRIdZiEH_ZqGs0jlU1HMJ64mms')

CHROMA_PATH = "chromaPath"
EMBED_MODEL = "all-MiniLM-L6-v2"
COLLECTION_NAME = "demo_docs6"

client = chromadb.PersistentClient(CHROMA_PATH)
embedding_func = embedding_functions.SentenceTransformerEmbeddingFunction(
    model_name=EMBED_MODEL
)
collection = client.get_collection(name=COLLECTION_NAME, embedding_function=embedding_func)

from openai import OpenAI

client = OpenAI(
  api_key='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',  
)

def retrieve_all_embeddings_from_collection():
    """Retrieve all embeddings from a ChromaDB collection."""
    results = collection.query(
        query_texts=["Query all data"],
        n_results=5,
        include=["documents","metadatas"]
    )
    return results

def analyze_content_with_llm(content):
    model = genai.GenerativeModel('models/gemini-pro')
    result = model.generate_content(content)
    return result.text


def create_pdf(text, output_path):
    if not os.path.exists(output_path):
        os.makedirs(output_path)

    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    filename = f"analysis_report_{timestamp}.pdf"
    output_path = os.path.join(output_path, filename)

    pdf = FPDF()
    pdf.add_page()

     # Load a TTF font that supports Unicode
    font_path = "E:/Desktop/AILMS/AISL/PPAserver/TTF/DejaVuSans.ttf"  # Replace with the path to your TTF font
    pdf.add_font("DejaVu", "", font_path, uni=True)
    pdf.set_font("DejaVu", size=12)

    pdf.multi_cell(0, 10, text)
    pdf.output(output_path)

    return output_path


def store_pdf_in_mongodb(pdf_path, module, year, faculty, course):
    client = MongoClient("mongodb://localhost:27017/")
    db = client["AILMS"]
    fs = gridfs.GridFS(db)

    with open(pdf_path, "rb") as f:
        pdf_id = fs.put(f, filename=pdf_path)

    collection = db["analyzedPPA"]
    document = {
        "pdf_id": pdf_id,
        "faculty": faculty,
        "year": year,
        "module": module,
        "course": course
    }
    collection.insert_one(document)



if __name__ == "__main__":
    # if len(sys.argv) < 5:
    #     print("Usage: chroma_db.py <module_name> <year> <faculty> <course>")
    #     sys.exit(1)

    module_name = sys.argv[1]
    year = sys.argv[2]
    faculty = sys.argv[3]
    course = sys.argv[4]
    collection_name = f"{module_name}_{year}"

    results = retrieve_all_embeddings_from_collection()
    print("Results:", results)

    # Check if the collection is empty
    if not results['documents']:
        print("No documents found in the ChromaDB collection.")
        sys.exit(1)

    # Flatten the list of lists
    flattened_documents = [item for sublist in results['documents'] for item in sublist]

    content = "This is a {moduel_name} past paper. Analyze the following content and generate a detailed report on question patterns, answers and provide insights on frequently asked topics:".join(flattened_documents)  # Assuming documents are stored as plain text strings
    # content = " ".join(results['documents'])

    print("content:",content)

    analyzed_text = analyze_content_with_llm(content)

    print ("analysis:",analyzed_text)

    output_pdf_path = "analyzedPdf/"
    pdf_path = create_pdf(analyzed_text, output_pdf_path)
    store_pdf_in_mongodb(pdf_path, module_name, year, faculty, course)
    
