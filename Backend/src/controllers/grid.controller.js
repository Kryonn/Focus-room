import GridModel from "../model/grid.model.js";

const GridController = {
    async getUserGrid(req, res) {
        const username = req.query.username;

        try {
            const selectReponse = await GridModel.selectUserGrid(username);

            res.status(200).json({
                error: false,
                msg: "Lista de grids retornado com sucesso",
                data: selectReponse,
            });
        } catch (error) {
            res.status(400).json({ error: false, msg: error.message });
        }
    },

    async createUserGrid(req, res) {
        const body = req.body;
        const username = body.username;
        const gridName = body.gridName;

        try {
            const insertResponse = await GridModel.insertUserGrid(
                username,
                gridName,
            );

            res.status(201).json({ error: false, data: insertResponse });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async removeGrid(req, res) {
        const body = req.body;
        const username = body.username;
        const gridName = body.gridName;

        try {
            const deleteResponse = await GridModel.deleteGrid(
                username,
                gridName,
            );

            res.status(200).json({ error: false, data: deleteResponse });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
};

export default GridController;
