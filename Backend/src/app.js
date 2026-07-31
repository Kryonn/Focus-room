import "dotenv/config";
import express from "express";
import PublicRouter from "./routers/public.router.js";
import PrivateRouter from "./routers/private.router.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || "3000";

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    process.env.CLIENT_URL
].filter(Boolean);

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: (origin, callback) => {
        if(!origin) {
            return callback(null, true);
        }

        if(allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Blocked by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(PublicRouter);
app.use(PrivateRouter);

app.listen(port, () => {
    console.log("Server online at port: ", port);
});

export default app;
