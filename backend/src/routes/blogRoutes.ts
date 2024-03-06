import { PrismaClient } from "@prisma/client/edge";
import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createPostInput, updatePostInput } from "@mcace007/medium-common";
import { verify } from "hono/jwt";

const router = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

const responseMessage = {
  invalidInputs400: "Invalid input. Please check your request and try again.",
  emailAlreadyInUse409:
    "Failed to create user. The email address is already in use.",
  userDoesNotExits404: "The user does not exist.",
  notLoggedIn403: "You are not logged in",
};

router.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization") || "";
  try {
    const user = await verify(authHeader, c.env.JWT_SECRET);
    if (user) {
      c.set("userId", user.id);
      await next();
    } else {
      c.status(403);
      return c.json({
        status: "error",
        message: responseMessage.notLoggedIn403,
      });
    }
  } catch (e) {
    c.status(403);
    return c.json({
      status: "error",
      message: responseMessage.notLoggedIn403,
    });
  }
});

router.post("/", async (c) => {
  const body = await c.req.json();
  const { success } = createPostInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({
      status: "error",
      message: responseMessage.invalidInputs400,
    });
  }

  const authorId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.blog.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: authorId,
    },
  });

  c.status(201);
  return c.json({
    status: "success",
    data: {
      blogId: blog.id,
    },
  });
});

router.put("/", async (c) => {
  const body = await c.req.json();
  const { success } = updatePostInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({
      status: "error",
      message: responseMessage.invalidInputs400,
    });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.blog.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.json({
    status: "success",
    data: {
      blogId: blog.id,
    },
  });
});

router.get("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const blogs = await prisma.blog.findMany({
    select: {
      content: true,
      title: true,
      id: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return c.json({
    status: "success",
    data: {
      blogs,
    },
  });
});

router.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.blog.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return c.json({
      status: "success",
      data: {
        blog,
      },
    });
  } catch (e) {
    c.status(404);
    return c.json({
      status: "error",
      message: responseMessage.userDoesNotExits404,
    });
  }
});

export default router;
