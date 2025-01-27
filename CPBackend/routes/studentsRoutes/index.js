import express from "express";
import studentsDataRoutes from "./studentsDataRoutes.js";
import addStudentDataRoutes from "./addStudentsDataRoutes.js";
import deleteStudentsDataRoute from "./deleteStudentsDataRoute.js";
import updateStudentsDataRoute from "./updateStudentsDataRoute.js";
const app = express();

app.use('/students-data', studentsDataRoutes);
app.use('/add-data', addStudentDataRoutes);
app.use('/delete-data', deleteStudentsDataRoute);
app.use('/update-data', updateStudentsDataRoute);

export default app;
