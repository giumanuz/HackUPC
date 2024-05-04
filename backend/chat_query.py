from llama_index import SimpleDirectoryReader, StorageContext, ServiceContext
from llama_index.indices.vector_store import VectorStoreIndex
from llama_iris import IRISVectorStore

import getpass
import os
from dotenv import load_dotenv

def return_query_engine(table_name: str):
    load_dotenv(override=True)
    if not os.environ.get("OPENAI_API_KEY"):
        os.environ["OPENAI_API_KEY"] = getpass.getpass("OpenAI API Key:")

    username = 'demo'
    password = 'demo' 
    hostname = os.getenv('IRIS_HOSTNAME', 'localhost')
    port = '1972' 
    namespace = 'USER'
    CONNECTION_STRING = f"iris://{username}:{password}@{hostname}:{port}/{namespace}"


    vector_store = IRISVectorStore.from_params(
        connection_string=CONNECTION_STRING,
        table_name=table_name,
        embed_dim=1536,  # openai embedding dimension
    )
    storage_context = StorageContext.from_defaults(vector_store=vector_store)
    # service_context = ServiceContext.from_defaults(
    #     embed_model=embed_model, llm=None
    # )

    print("Loading documents...\n\n")
    documents = SimpleDirectoryReader("file_uploadati").load_data()
    print("Documents loaded.\n\n")
    # print("Document ID:", documents[0].doc_id)
    # print("Document ID:", documents[1].doc_id)

    index = VectorStoreIndex.from_documents(
        documents, 
        storage_context=storage_context, 
        show_progress=True, 
        # service_context=service_context,
    )
    query_engine = index.as_query_engine()
    return query_engine


# # If reconnecting to the vector store, use this: 

# index = VectorStoreIndex.from_vector_store(vector_store=vector_store)
# storage_context = StorageContext.from_defaults(vector_store=vector_store)
# query_engine = index.as_query_engine()

# # Adding documents to existing index

# for d in documents:
#     index.insert(document=d, storage_context=storage_context)



###### response = query_engine.query("Summary the essay")
