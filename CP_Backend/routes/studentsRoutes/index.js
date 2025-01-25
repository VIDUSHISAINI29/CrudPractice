import express from "express";
import studentsDataRoutes from "./studentsDataRoutes.js"
const app = express();

app.use('students-data', studentsDataRoutes);

export default app;
