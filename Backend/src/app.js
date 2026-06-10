import express from "express"
import PublicRouter from "./routers/public.router.js"
import PrivateRouter from "./routers/private.router.js"
import cors from "cors";
import "dotenv/config";

const app = express();
const port = "3000";

app.use(cors());

app.use(express.json());

app.use(PublicRouter);
app.use(PrivateRouter);

app.listen(port, () => {
    console.log("Servidor da api ligada na porta: ", port);
})


export default app

