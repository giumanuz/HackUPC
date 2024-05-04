from llama_index import SimpleDirectoryReader, StorageContext, ServiceContext
from llama_index.indices.vector_store import VectorStoreIndex
from llama_iris import IRISVectorStore


import getpass
import os
from dotenv import load_dotenv
from logging import getLogger
FOLDER_PATH = f'/app/backend/file_uploadati'

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
        embed_dim=1536,
    )
    storage_context = StorageContext.from_defaults(vector_store=vector_store)

    documents = SimpleDirectoryReader(FOLDER_PATH).load_data()

    index = VectorStoreIndex.from_documents(
        documents, 
        storage_context=storage_context, 
        show_progress=True, 
    )
    query_engine = index.as_query_engine()
    return query_engine


###### response = query_engine.query("Summary the essay")
