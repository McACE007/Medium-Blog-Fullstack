import { Hono } from "hono";
import userRouter from "./userRoutes";
import postRouter from "./postRoutes";

const router = new Hono();

router.route("/user", userRouter);
router.route("/post", postRouter);

export default router;
