import express from 'express';
import { startDB } from "./src/config/database.js";
import { userRouter } from "./src/routes/user.route.js";
import { taskRouter } from "./src/routes/task.route.js";
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", taskRouter);
app.use("/api", userRouter);

app.listen(PORT, async () => {
    console.log(`Servidor conectado en el puerto ${PORT}`);
    await startDB();
    console.log("Conectado a la base de datos");
});
