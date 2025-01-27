import {Router} from "express";
import { deleteStudentsData } from "../../controller/studentsController/deleteStudentsDataController.js";

const router = Router();

router.delete('/', deleteStudentsData);

export default router;

