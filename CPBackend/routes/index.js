import express from "express";
import studentRoutesIndex from './studentsRoutes/index.js'

const router = express.Router();

router.use('/',studentRoutesIndex);

export default router;