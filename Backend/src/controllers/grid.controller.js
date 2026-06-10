import GridModel from "../model/grid.model.js"

const GridController = {
    async getUserGrid(req, res) {
        // const body = req.body;
        const username = req.query.username;

        console.log(username);

        try {
            const selectReponse = await GridModel.selectUserGrid(username);
            
            res.status(200).json({ error: false, msg: "Lista de grids retornado com sucesso", data: selectReponse });
        } catch(error) {
            res.status(400).json({ error: false, msg: error.message });
        }
    }
}

export default GridController;