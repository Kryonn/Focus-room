import "dotenv/config";
import express from "express";
import PublicRouter from "./routers/public.router.js";
import PrivateRouter from "./routers/private.router.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const port = "3000";

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


app.use(PublicRouter);
app.use(PrivateRouter);

app.listen(port, () => {
    console.log("Servidor da api ligada na porta: ", port);
});

export default app;
