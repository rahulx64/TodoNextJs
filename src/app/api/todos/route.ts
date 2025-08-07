import { NextRequest, NextResponse } from "next/server";
import { getTodos, saveTodos } from "@/lib/db";
import { withAuth } from "@/lib/middleware";
import { v4 as uuid } from "uuid";

export const GET = withAuth(async (_req: NextRequest, payload: any) => {
  const todos = await getTodos();
  const userTodos = todos.filter((t: any) => t.username === payload.username);
  return NextResponse.json(userTodos);
});

export const POST = withAuth(async (req: NextRequest, payload: any) => {
  const { task } = await req.json();
  const todos = await getTodos();
  const newTodo = { id: uuid(), task, username: payload.username };
  todos.push(newTodo);
  await saveTodos(todos);
  return NextResponse.json({ message: "Todo added" });
});

export const DELETE = withAuth(async (req: NextRequest, payload: any) => {
  const { id } = await req.json();
  let todos = await getTodos();
  todos = todos.filter(
    (t: any) => !(t.id === id && t.username === payload.username)
  );
  await saveTodos(todos);
  return NextResponse.json({ message: "Todo deleted" });
});

// ✅ New PUT handler to edit a todo task
export const PUT = withAuth(async (req: NextRequest, payload: any) => {
  const { id, task } = await req.json();
  let todos = await getTodos();

  const todoIndex = todos.findIndex(
    (t: any) => t.id === id && t.username === payload.username
  );

  if (todoIndex === -1) {
    return NextResponse.json({ message: "Todo not found" }, { status: 404 });
  }

  todos[todoIndex].task = task;
  await saveTodos(todos);

  return NextResponse.json({ message: "Todo updated" });
});
