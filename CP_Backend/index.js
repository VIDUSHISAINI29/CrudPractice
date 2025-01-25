import express from "express";
import axios from "axios";
import router from './routes/index.js'
const app = express();
const port = 4026;

app.use(express.json)
app.use(router);

app.listen(port, () => {
    console.log(`server is running on port `, port);
    
})