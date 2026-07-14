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

    async createWidget(req, res) {
        const body = req.body;
        const id = body.id;
        const username = body.username;
        const gridName = body.gridName;
        const xposition = body.xposition;
        const yposition = body.yposition;
        const type = body.type;
        let insertResponse = "";

        try {
            switch (type) {
                case "pomodoro":
                    insertResponse = await WidgetModel.insertPomodoro(
                        id,
                        username,
                        gridName,
                        xposition,
                        yposition,
                    );
                    break;

                case "list":
                    insertResponse = await WidgetModel.insertPomodoro(
                        id,
                        username,
                        gridName,
                        xposition,
                        yposition,
                    );
                    break;
            }

            return res.status(201).json({ error: false, data: insertResponse });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    async updateWidget(req, res) {
        const body = req.body;
        const id = body.id;
        const username = body.username;
        const gridName = body.gridName;
        const width = body.width;
        const height = body.height;
        const xposition = body.xposition;
        const yposition = body.yposition;

        console.log(body);

        try {
            const updateResponse = await WidgetModel.putWidget(
                id,
                username,
                gridName,
                width,
                height,
                xposition,
                yposition,
            );

            res.status(201).json({ error: false, data: updateResponse });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async removeWidget(req, res) {
        const body = req.body;
        const id = body.id;
        const username = body.username;
        const gridName = body.gridName;

        try {
            const removeResponse = await WidgetModel.deleteWidget(
                id,
                username,
                gridName,
            );

            res.status(200).json({ error: false, data: removeResponse });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
};
