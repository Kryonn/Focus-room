import express from "express";
import GridController from "../controllers/grid.controller.js";
import { WidgetController } from "../controllers/widget.controller.js";
import TaskController from "../controllers/task.controller.js";

const router = express.Router();

// Grid
router.get("/grid", GridController.getGridAll);
router.post("/grid", GridController.createGrid);
router.delete("/grid", GridController.removeGrid);
router.put("/grid", GridController.updateGrid);


// Widget
router.get("/widget", WidgetController.getWidgetAll);
router.post("/widget/pomodoro", WidgetController.createPomodoro);
router.post("/widget/list", WidgetController.createList);
router.post("/widget/note", WidgetController.createNote);
router.put("/widget", WidgetController.updateWidget);
router.put("/widget/pomodoro/time", WidgetController.updatePomodoroWidget);
router.put("/widget/list/name", WidgetController.updateListNameWidget);
router.put("/widget/note/name", WidgetController.updateNoteNameWidget);
router.put("/widget/note/description", WidgetController.updateNoteDescriptionWidget);
router.delete("/widget", WidgetController.removeWidget);
router.delete("/widget/all", WidgetController.removeWidgetAll);


// Task
router.get("/task", TaskController.getTaskAll);
router.post("/task", TaskController.createTask);
router.delete("/task", TaskController.removeTask);


export default router;
