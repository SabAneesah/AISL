from pdf2image import convert_from_path
import pytesseract as tess
from PIL import Image
from pymongo import MongoClient
from gridfs import GridFS
import sys
import io
from transformers import pipeline
import os

# Configure Tesseract path
tess.pytesseract.tesseract_cmd = r'F:\Tesseract-OCR\tesseract.exe'

# Establish the connection with the DB
client = MongoClient('mongodb+srv://aneesha13sabar:KBpKXvNWEvLevaF8@cluster0.qhunrvl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client['SummaryCreator']
fs = GridFS(db)

# Ensure a PDF path is provided
if len(sys.argv) < 2:
    print("Usage: python process.py <pdf_path>")
    sys.exit(1)

# Convert PDF to images
pdf_path = sys.argv[1]
pdf_name = os.path.basename(pdf_path)
poppler_path = r'F:\Release-24.02.0-0\poppler-24.02.0\Library\bin'
images = convert_from_path(pdf_path, 500, poppler_path=poppler_path)

# Store images in MongoDB with metadata
for i, image in enumerate(images):
    image_name = f'page_{i + 1}.jpg'
    img_byte_arr = io.BytesIO()
    image.save(img_byte_arr, format='JPEG')
    img_byte_arr = img_byte_arr.getvalue()
    fs.put(img_byte_arr, filename=image_name, pdf_name=pdf_name)
    #print(f"Stored {image_name} from {pdf_name} in MongoDB.")

# Preprocess image to improve OCR accuracy
def preprocess_image(image):
    gray_image = image.convert('L')
    enhanced_image = gray_image.point(lambda x: 0 if x < 128 else 255, '1')
    return enhanced_image

# Function to retrieve images from MongoDB and extract text for a specific PDF
def extract_text_from_images(pdf_name):
    text = ""
    for grid_out in fs.find({'pdf_name': pdf_name}):
        try:
            image_name = grid_out.filename
            img_byte_arr = grid_out.read()
            img = Image.open(io.BytesIO(img_byte_arr))
            processed_img = preprocess_image(img)
            page_text = tess.image_to_string(processed_img, config='--psm 6')
            text += page_text + " "
        except Exception as e:
            print(f"Error processing {image_name}: {e}")
    return text

# Extract text from images stored in MongoDB for the specific PDF
text = extract_text_from_images(pdf_name)

# Ensure text is not None or empty before summarizing
if not text.strip():
    print("No text extracted from images.")
else:
    # Summarize the extracted text using BERT-based model
    summarizer = pipeline('summarization', model='facebook/bart-large-cnn')
    
    # Split text into smaller chunks to fit within model constraints
    max_chunk_size = 1024  # Adjust this value based on model constraints
    chunks = [text[i:i + max_chunk_size] for i in range(0, len(text), max_chunk_size)]

    # Summarize each chunk and combine the summaries
    full_summary = ""
    for chunk in chunks:
        summaries = summarizer(chunk, max_length=150, min_length=50, do_sample=False)
        full_summary += summaries[0]['summary_text'] + " "

    print(f"\n{full_summary}")
