import express, {Request, Response, NextFunction} from "express";
import cors from "cors";
import tripRouter from "./routes/tripRouter";
import authRouter from "./routes/authRouter";

const app = express();
const port = 4000;
app.use(express.json());

app.use(cors());

app.use("/trips", tripRouter);
app.use("/auth", authRouter);

app.use((req, res) => {
    res.status(404).json({success: "error", message: "Page not found"});
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({status: "error", message: error.message});
});

app.listen(port, () => {
    console.log(`Server running at
http://localhost:${port}/`);
});
