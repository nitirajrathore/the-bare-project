import chromadb
import numpy as np

# Create a Chroma client
client = chromadb.Client() # in memory client

# Create a collection
collection = client.create_collection("my_collection")

# Generate some random embeddings (e.g., vectors with 512 dimensions)
embeddings = np.random.random((10, 512))

# Metadata for each embedding (e.g., document IDs)
metadata = [{"id": f"doc_{i}", "text": f"Document {i}"} for i in range(10)]
ids = [f"doc_{i}" for i in range(10)]


# Insert embeddings into the collection
collection.add(ids=ids, embeddings=embeddings.tolist(), metadatas=metadata)

# Generate a query vector (random in this case)
query_embedding = np.random.random((1, 512))

# Perform a similarity search
results = collection.query(query_embeddings=query_embedding.tolist(), n_results=3)

# Print the results
print(results)
