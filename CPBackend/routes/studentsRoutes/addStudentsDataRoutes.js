import {Router} from "express";
import { addStudentsData } from "../../controller/studentsController/addStudentsDataController.js";

const router = Router();

router.get('/', addStudentsData);

export default router;