import {Router} from "express";
import { getSingleStudentData } from "../../controller/studentsController/singleStudentDataController.js";

const router = Router();

router.post('/',getSingleStudentData);

export default router;