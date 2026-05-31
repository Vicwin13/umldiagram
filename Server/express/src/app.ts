import { AppError } from './errors/errors';
import connectDB from "./config/db";
import dotenv from "dotenv";
import express from "express";
import { loggerMiddleware } from "./middleware/logger.middleware";
import masterRouter from "./routes/index.routes";

// import cors from "cors"; // Disabled: not needed for Postman testing (no frontend yet)


// import helmet from "helmet"; // Disabled: not needed for Postman testing (no frontend yet)



dotenv.config();

const app = express();

// Register middleware
// app.use(helmet()); // Disabled: enable when adding a frontend
// app.use(cors());   // Disabled: enable when adding a frontend
app.use(express.json());
app.use(loggerMiddleware);

// Register routes
app.use('/api', masterRouter);

// Error handler middleware (must be last, with 4 params)
app.use((err: AppError, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            message: err.message,
        });
        return;
    }

    console.error(err);
    res.status(500).json({
        message: "Internal Server Error",
    });
});

// Start server and connect to database
app.listen(process.env.PORT, async () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    await connectDB();
});
