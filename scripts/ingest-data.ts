import {OpenAIEmbeddings} from 'langchain/embeddings/openai';
import {Chroma} from 'langchain/vectorstores/chroma';
import {CSVLoader} from "langchain/document_loaders/fs/csv";

export const COLLECTION_NAME = "test-articles"

export const ingest = async () => {
    const loader = new CSVLoader("documents/example_articles.csv");
    let docs = await loader.load();
    docs = docs.slice(0, 10)

    console.log('docs: ', docs);

    console.log('creating vector store...');
    /*create and store the embeddings in the vectorStore*/
    const embeddings = new OpenAIEmbeddings();

    //clean existing embeddings
    let chroma = new Chroma(embeddings, {collectionName: COLLECTION_NAME})
    await chroma.index?.reset()

    // Ingest documents
    Chroma.fromDocuments(docs, embeddings, {
        collectionName: COLLECTION_NAME,
    });
};

(async () => {
    await ingest();
    console.log('ingestion complete');
})();