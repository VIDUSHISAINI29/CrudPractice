import {Router} from "express";
import { updateStudentsData } from "../../controller/studentsController/updateStudentsDataController.js";

const router = Router();

router.patch('/', updateStudentsData);

export default router;
