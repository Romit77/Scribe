import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

//49

app.post("/api/v1/signup", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    await prisma.user.create({
      data: {
        username: body.username,
        password: body.password,
        name: body.name,
      },
    });
    return c.text("signed up");
  } catch (error) {
    console.log(error);
    c.status(411);
    return c.text("user already exists or invalid credentials");
  }
});

app.post("/api/v1/signin", (c) => {
  return c.text("signup route");
});

app.put("/api/v1/blog", (c) => {
  const id = c.req.param("id");
  console.log(id);
  return c.text("get blog route");
});

app.get("/api/v1/blog/:id", (c) => {
  return c.text("hello");
});

export default app;
