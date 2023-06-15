import express from 'express';
import {Chroma} from "langchain/vectorstores/chroma";
import {OpenAIEmbeddings} from "langchain/embeddings/openai";
import * as dotenv from "dotenv";

const app = express();

app.use(express.json())

const chromaQuery = async (query: string) => {
    const vectorStore = await Chroma.fromExistingCollection(
        new OpenAIEmbeddings({openAIApiKey: process.env.OPENAI_API_KEY}),
        {collectionName: "articles"})
    return await vectorStore.similaritySearch(query, 2);
}

app.get('/', (req, res) => {
    res.send("ai-runner started")
});

app.post('/runner', async (req, res) => {
    console.log('req.body', req.body)
    const body = req.body;

    console.log("body.prompt", body.prompt)
    const response = await chromaQuery(body.prompt)
    console.log("response", response);

    const firstPageContent = response[0].pageContent

    console.log("response", response);
    res.send({ data: firstPageContent });
});

dotenv.config({ path: '../.env.local' });
app.listen(3000, () => {
    console.log('server started');
});