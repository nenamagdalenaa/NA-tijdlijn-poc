from sentence_transformers import SentenceTransformer
import sys
import json

model = SentenceTransformer("intfloat/multilingual-e5-large-instruct")
query = sys.argv[1]
embedding = model.encode(query).tolist()

print(json.dumps(embedding))
