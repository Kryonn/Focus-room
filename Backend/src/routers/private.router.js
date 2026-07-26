import express from "express";
import GridController from "../controllers/grid.controller.js";
import { WidgetController } from "../controllers/widget.controller.js";
import TaskController from "../controllers/task.controller.js";

const router = express.Router();

// Grid
router.get("/grid", GridController.getGrid);
router.post("/grid", GridController.createGrid);
router.delete("/grid", GridController.removeGrid);
router.put("/grid", GridController.updateGrid);

// Widget
router.get("/widget", WidgetController.getWidgetAll);
router.post("/widget", WidgetController.createPomodoro);
router.post("/widget/list", WidgetController.createList);
router.post("/widget/note", WidgetController.createNote);
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
