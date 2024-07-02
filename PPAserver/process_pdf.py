import chromadb
from chromadb.utils import embedding_functions
from sentence_transformers import SentenceTransformer
import PyPDF2
from langchain_community.document_loaders import PyPDFLoader

# Load environment variables
from dotenv import load_dotenv
import os

load_dotenv()

# Constants
CHROMA_DATA_PATH = "chromaPath/"
EMBED_MODEL = "all-MiniLM-L6-v2"
COLLECTION_NAME = "demo_docs6"

# Initialize ChromaDB
client = chromadb.PersistentClient(path=CHROMA_DATA_PATH)

embedding_func = embedding_functions.SentenceTransformerEmbeddingFunction(
    model_name=EMBED_MODEL
)

collection = client.create_collection(
    name=COLLECTION_NAME,
    embedding_function=embedding_func,
    metadata={"hnsw:space": "cosine"}
)

# model = SentenceTransformer(EMBED_MODEL)


# Function to extract text from PDF
def extract_text(directory_path):
    pdf_texts = []

    # Iterate over all files in the directory
    for filename in os.listdir(directory_path):
        # Check if the file is a PDF
        if filename.endswith('.pdf'):
            pdf_path = os.path.join(directory_path, filename)

            try:
                # Open the PDF file
                with open(pdf_path, 'rb') as pdf_file:
                    reader = PyPDF2.PdfReader(pdf_file)
                    text = ""

                    # Iterate over each page
                    for page_num in range(len(reader.pages)):
                        page = reader.pages[page_num]
                        text += page.extract_text()

                    pdf_texts.append(text)
                    print(f"Extracted text from {filename}")

            except Exception as e:
                print(f"An error occurred with {filename}: {e}")

    return pdf_texts


if __name__ == "__main__":
    pdf_path = "E:/Desktop/AILMS/AISL/PPAserver/pdfUploads"
    documents = extract_text(pdf_path)

    collection.add(
        documents=documents,
        ids=[f"id{i}" for i in range(len(documents))],
    )
