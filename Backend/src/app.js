import express from "express"
import PublicRouter from "./routers/public.router.js"
import cors from "cors";
import "dotenv/config";

const app = express();
const port = "3000";

app.use(cors());
// app.use(cors({
//     origin: `${process.env.API_URL}/5173`,
//     methods: ["POST", "GET"],
//     allowedHeaders: ["Content-Type", "Authorization"] 
// ))

app.use(express.json());


app.use(PublicRouter);

app.listen(port, () => {
    console.log("Servidor da api ligada na porta: ", port);
})


export default app

