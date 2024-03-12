import app from "./server";
import { env } from "./config/index";
import { AppDataSource, db_init } from "./database/db";

const { port } = env;

db_init(AppDataSource);

app.listen(port, () => console.log(`Server up at http://localhost:${port}`));