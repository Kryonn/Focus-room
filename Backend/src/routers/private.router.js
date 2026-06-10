import express from "express";
import GridController from "../controllers/grid.controller.js"

const router = express.Router();

router.get("/grid", GridController.getUserGrid);

export default router