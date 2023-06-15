import {OpenAIEmbeddings} from 'langchain/embeddings/openai';
import {Chroma} from 'langchain/vectorstores/chroma';
import {CSVLoader} from "langchain/document_loaders/fs/csv";
import * as dotenv from "dotenv";
import {ChromaClient} from "chromadb";


const COLLECTION_NAME = "articles"

export const ingest = async () => {
    const loader = new CSVLoader("documents/example_articles.csv");
    let docs = await loader.load();
    docs = docs.slice(0, 10)

    console.log('docs: ', docs);

    console.log('creating vector store...');
    /*create and store the embeddings in the vectorStore*/
    dotenv.config({ path: '../.env.local' });
    console.log('ENV', process.env.OPENAI_API_KEY)
    const embeddings = new OpenAIEmbeddings({openAIApiKey: process.env.OPENAI_API_KEY});

    //clean existing embeddings
    const client = new ChromaClient();
    await client.reset()
    console.log("chroma.reset")

    // Ingest documents
    const chromaClient = await Chroma.fromDocuments(docs, embeddings, {
        collectionName: COLLECTION_NAME,
    });
    console.log('client', chromaClient)
    const response = await chromaClient.similaritySearch("test", 2)
    console.log('response', response)
};

(async () => {
    await ingest();
    console.log('ingestion complete');
})();