import express from "express";
import GridController from "../controllers/grid.controller.js";
import { WidgetController } from "../controllers/widget.controller.js";
import TaskController from "../controllers/task.controller.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Grid
router.get("/grid", AuthMiddleware.jwtCheck, GridController.getGridAll);
router.post("/grid", AuthMiddleware.jwtCheck, GridController.createGrid);
router.delete("/grid", AuthMiddleware.jwtCheck, GridController.removeGrid);
router.put("/grid", AuthMiddleware.jwtCheck, GridController.updateGrid);


// Widget
router.get("/widget", AuthMiddleware.jwtCheck, WidgetController.getWidgetAll);
router.post("/widget/pomodoro", AuthMiddleware.jwtCheck, WidgetController.createPomodoro);
router.post("/widget/list", AuthMiddleware.jwtCheck, WidgetController.createList);
router.post("/widget/note", AuthMiddleware.jwtCheck, WidgetController.createNote);
router.put("/widget", AuthMiddleware.jwtCheck, WidgetController.updateWidget);
router.put("/widget/pomodoro/time", AuthMiddleware.jwtCheck, WidgetController.updatePomodoroWidget);
router.put("/widget/list/name", AuthMiddleware.jwtCheck, WidgetController.updateListNameWidget);
router.put("/widget/note/name", AuthMiddleware.jwtCheck, WidgetController.updateNoteNameWidget);
router.put("/widget/note/description", AuthMiddleware.jwtCheck, WidgetController.updateNoteDescriptionWidget);
router.delete("/widget", AuthMiddleware.jwtCheck, WidgetController.removeWidget);
router.delete("/widget/all", AuthMiddleware.jwtCheck, WidgetController.removeWidgetAll);


// Task
router.get("/task", AuthMiddleware.jwtCheck, TaskController.getTaskAll);
router.post("/task", AuthMiddleware.jwtCheck, TaskController.createTask);
router.delete("/task", AuthMiddleware.jwtCheck, TaskController.removeTask);








// Grid
// router.get("/grid", GridController.getGridAll);
// router.post("/grid", GridController.createGrid);
// router.delete("/grid", GridController.removeGrid);
// router.put("/grid", GridController.updateGrid);


// Widget
// router.get("/widget", WidgetController.getWidgetAll);
// router.post("/widget/pomodoro", WidgetController.createPomodoro);
// router.post("/widget/list", WidgetController.createList);
// router.post("/widget/note", WidgetController.createNote);
// router.put("/widget", WidgetController.updateWidget);
// router.put("/widget/pomodoro/time", WidgetController.updatePomodoroWidget);
// router.put("/widget/list/name", WidgetController.updateListNameWidget);
// router.put("/widget/note/name", WidgetController.updateNoteNameWidget);
// router.put("/widget/note/description", WidgetController.updateNoteDescriptionWidget);
// router.delete("/widget", WidgetController.removeWidget);
// router.delete("/widget/all", WidgetController.removeWidgetAll);


// Task
// router.get("/task", TaskController.getTaskAll);
// router.post("/task", TaskController.createTask);
// router.delete("/task", TaskController.removeTask);


export default router;
