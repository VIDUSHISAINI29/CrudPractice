import express from "express";
import axios, { all } from "axios";
import routes from './routes/index.js'
import cors from "cors";
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
app.use(routes);
app.use(cors)

app.listen(port, () => {
    console.log(`server is running on port `, port);
    
})