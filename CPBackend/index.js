import express from "express";
import axios, { all } from "axios";
import routes from './routes/index.js'

import cors from "cors";
import bodyParser from "body-parser";
import { configDotenv } from "dotenv";
configDotenv();
const app = express();
const port = 4026;
const allowedOrigin = process.env.FRONTEND_URL;

app.use(
    cors({
        origin: allowedOrigin,
        credentials: true
    })
)

app.use(express.json());
app.use(bodyParser.json());
app.use(routes);
app.use(cors)

app.listen(port, () => {
    console.log(`server is running on port `, port);
    
})