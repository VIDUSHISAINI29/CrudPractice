import express from "express";
import { getStudentsData } from "../../controller/studentsController/studentsDataController.js";
const router = express.Router();

router.get('/',getStudentsData);

export default router;
