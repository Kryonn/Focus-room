import express from "express";
import GridController from "../controllers/grid.controller.js"
import { WidgetController } from "../controllers/widget.controller.js";

const router = express.Router();

router.get("/grid", GridController.getUserGrid);
router.post("/widget", WidgetController.createWidget);
router.get("/widget", WidgetController.getWidgetAll);

export default router