const express=require("express");
import { createConnection } from "typeorm";
import userRouter from "./routes/userRoutes";
import categoryRouter from "./routes/categoryRoutes";
import TodoRouter from "./routes/todoDataRoutes";
import { authenticateUser } from "./middlewares/Authenticate";

const app=express();

app.use(express.json());

app.use("/users",userRouter);
app.use("/category",categoryRouter);
app.use("/todo",authenticateUser,TodoRouter);

createConnection()
  .then(async (connection) => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });


app.listen(8000, async () => {
    console.log("listening on port 8000");
});
  