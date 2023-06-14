import {ChatOpenAI} from "langchain/chat_models/openai";
import {CallbackManager} from "langchain/callbacks";
import {HumanChatMessage} from "langchain/schema";
import {NextResponse} from "next/server";
import {Chroma} from "langchain/vectorstores/chroma";
import {OpenAIEmbeddings} from "langchain/embeddings/openai";
import {COLLECTION_NAME} from "@/scripts/ingest-data";
import {CSVLoader} from "langchain/document_loaders/fs/csv";
export const runtime = "edge";

export async function POST(req: Request) {
    const body = await req.json();
    const encoder = new TextEncoder();
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();

    console.log("body.promt" + body.promt)
    await ingest()
    const response = await chromaQuery(body.promt)

    console.log(response);
    await writer.ready
    await writer.write(encoder.encode(`data: ${response.toString().replace(/["'\n\r]/g, "")}\n\n`))

    return new NextResponse(stream.readable, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
        },
    });
}

const ingest = async () => {
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
const chromaQuery = async (query: string) => {
    const vectorStore = await Chroma.fromExistingCollection(
        new OpenAIEmbeddings(),
        {collectionName: COLLECTION_NAME})

    return await vectorStore.similaritySearch(query, 2);
}