import express from "express";
import GridController from "../controllers/grid.controller.js";
import { WidgetController } from "../controllers/widget.controller.js";
import TaskController from "../controllers/task.controller.js";

const router = express.Router();

// Grid
router.get("/grid", GridController.getUserGrid);
router.post("/grid", GridController.createUserGrid);
router.delete("/grid", GridController.removeGrid);

// Widget
router.get("/widget", WidgetController.getWidgetAll);
router.post("/widget", WidgetController.createWidget);
router.put("/widget", WidgetController.updateWidget);
router.delete("/widget", WidgetController.removeWidget);
router.put("/widget/list", WidgetController.updateListWidget);
router.put("/widget/note/name", WidgetController.updateNoteNameWidget);
router.put("/widget/note/description", WidgetController.updateNoteDescriptionWidget);

// Task
router.post("/task", TaskController.createTask);
router.delete("/task", TaskController.removeTask);
router.get("/task", TaskController.getTaskAll);

export default router;
