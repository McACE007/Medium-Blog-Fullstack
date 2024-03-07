import { Hono } from "hono";
import apiV1Router from "./routes/apiV1Routes";
import { cors } from "hono/cors";

const app = new Hono();

app.use("*", cors());
app.route("/api/v1", apiV1Router);

export default app;
