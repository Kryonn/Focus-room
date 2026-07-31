import GridModel from "../model/grid.model.js";

const GridController = {
    async getGridAll(req, res) {
        const username = req.user.username;

        try {
            const selectReponse = await GridModel.selectUserGrid(username);

            res.status(200).json({
                error: false,
                msg: "Lista de grids retornado com sucesso",
                data: selectReponse,
            });
        } catch (error) {
            res.status(401).json({ error: false, msg: error.message });
        }
    },

    async createGrid(req, res) {
        const body = req.body;
        const username = req.user.username;
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
        const username = req.user.username;
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

    async updateGrid(req, res) {
        const body = req.body;
        const username = req.user.username;
        const gridName = body.gridName;
        const gridStatic = body.gridStatic;

        try {
            const putResponse = await GridModel.updateGrid(username, gridName, gridStatic);

            res.status(200).json({ error: false, data: putResponse });
        } catch(err) {
            res.status(400).json({ error: err.message });
        }
    }
};

export default GridController;
