import fetch from "node-fetch";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get('/', async (req, res)=>{
    const response = await fetch("https://tender-mclean-00a2bd.netlify.app/web/movies.json");
    res.json(await response.json());
});

app.listen(3001, ()=> {
    console.log("listening on port 3001")
});