import express from "express";
import morgan from "morgan";
import todoRouter from "./routes/todoRoutes";
import transactionRouter from "./routes/transactionRoutes";

const app = express();

// MIDDLEWARES
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use((req, res, next) => {
  console.log("Hello from the middleware 👋");
  next();
});

// ROUTES
app.use("/api/v1/todos", todoRouter);

app.use("/api/v1/transaction", transactionRouter);

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Our Express Server!!!!");
});

export default app;
