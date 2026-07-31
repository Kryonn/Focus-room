import jwt from "jsonwebtoken"

export const AuthMiddleware = {
    async jwtCheck(req, res, next) {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if(!token) {
            return res.status(401).json({ error: true, msg: "Token not found" });
        }


        try {
            const payload = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.user = payload;
            next();
        } catch(err) {
            return res.status(401).json({ error: true, msg: "Invalid token" });
        }

    }
}