import {Router} from "express";
import { getStudentsData } from "../../controller/studentsController/studentsDataController.js";
const router = Router();

router.get('/',getStudentsData);

export default router;
