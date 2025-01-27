import express from "express";
import studentsDataRoutes from "./studentsDataRoutes.js"
import addStudentDataRoutes from "./addStudentsDataRoutes.js";
const app = express();

app.use('/students-data', studentsDataRoutes);
app.use('/edit-data', addStudentDataRoutes);

export default app;
