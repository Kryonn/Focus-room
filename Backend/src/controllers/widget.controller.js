import { WidgetModel } from "../model/widget.model.js";

export const WidgetController = {
    async getWidgetAll(req, res) {
        const username = req.query.username;
        const gridName = req.query.gridName;

        try {
            const selectResponse = await WidgetModel.selectWidgetAll(
                username,
                gridName,
            );

            return res.status(200).json({ error: false, data: selectResponse });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    async createPomodoro(req, res) {
        const body = req.body;
        const widgetId = body.widgetId;
        const username = body.username;
        const gridName = body.gridName;
        const xPosition = body.xPosition;
        const yPosition = body.yPosition;

        try {
            const insertResponse = await WidgetModel.insertPomodoro(username, gridName, widgetId, xPosition, yPosition);

            return res.status(201).json({ error: false, data: insertResponse });
        } catch(err) {
            return res.status(400).json({ error: err.message });
        }
    },

    async updateWidget(req, res) {
        const body = req.body;
        const widgetId = body.widgetId;
        const username = body.username;
        const gridName = body.gridName;
        const width = body.width;
        const height = body.height;
        const xPosition = body.xPosition;
        const yPosition = body.yPosition;

        try {
            const updateResponse = await WidgetModel.putWidget(
                username,
                gridName,
                widgetId,
                width,
                height,
                xPosition,
                yPosition,
            );

            res.status(201).json({ error: false, data: updateResponse });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async removeWidget(req, res) {
        const body = req.body;
        const widgetId = body.widgetId;
        const username = body.username;
        const gridName = body.gridName;

        try {
            const removeResponse = await WidgetModel.deleteWidget(
                username,
                gridName,
                widgetId
            );

            res.status(200).json({ error: false, data: removeResponse });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async updateListWidget(req, res) {
        const body = req.body;
        const username = body.username;
        const gridname = body.gridname;
        const widgetId = body.widgetId;
        const newListName = body.newListName;

        try {
            const updateResponse = await WidgetModel.updateListWidget(username, gridname, widgetId, newListName);

            res.status(200).json({ error: false, data: updateResponse });
        } catch(err) {
            res.status(400).json({ error: err.message });
        }
    },

    async updateNoteNameWidget(req, res) {
        const body = req.body;
        const username = body.username;
        const gridname = body.gridname;
        const widgetId = body.widgetId;
        const newNoteName = body.newNoteName;

        try {
            const updateResponse = await WidgetModel.updateNoteNameWidget(username, gridname, widgetId, newNoteName);

            res.status(200).json({ error: false, data: updateResponse });
        } catch(err) {
            res.status(400).json({ error: err.message });
        }
    },

    async updateNoteDescriptionWidget(req, res) {
        const body = req.body;
        const username = body.username;
        const gridname = body.gridname;
        const widgetId = body.widgetId;
        const newNoteDescription = body.newNoteDescription;

        try {
            const updateResponse = await WidgetModel.updateNoteDescriptionWidget(username, gridname, widgetId, newNoteDescription);

            res.status(200).json({ error: false, data: updateResponse });
        } catch(err) {
            res.status(400).json({ error: err.message });
        }
    },

    async createList(req, res) {
        const body = req.body;
        const username = body.username;
        const gridName = body.gridName;
        const widgetId = body.widgetId;
        const listName = body.listName;
        const xPosition = body.xPosition;
        const yPosition = body.yPosition;

        try {
            const insertResponse = await WidgetModel.insertList(username, gridName, widgetId, listName, xPosition, yPosition);

            res.status(201).json({ error: false, data: insertResponse });
        } catch(err) {
            res.status(400).json({ error: err.message });
        }
    },

    async createNote(req, res) {
        const body = req.body;
        const username = body.username;
        const gridName = body.gridName;
        const widgetId = body.widgetId;
        const noteName = body.noteName;
        const xPosition = body.xPosition;
        const yPosition = body.yPosition;

        try {
            const insertResponse = await WidgetModel.insertNote(username, gridName, widgetId, noteName, xPosition, yPosition);

            res.status(201).json({ error: false, data: insertResponse });
        } catch(err) {
            res.status(400).json({ error: err.message });
        }
    }
};
