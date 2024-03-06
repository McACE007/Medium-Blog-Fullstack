import { Hono } from "hono";

const router = new Hono();

router
  .post("/", (c) => {
    return c.text("createNewBlog");
  })
  .put("/", (c) => {
    return c.text("updateBlog");
  })
  .get("/", (c) => {
    return c.text("getAllBlogs");
  })
  .get("/:id", (c) => {
    return c.text("getBlog");
  });

export default router;
