import { NextRequest, NextResponse } from "next/server";
import { getTodos, saveTodos } from "@/lib/db";
import { withAuth } from "@/lib/middleware";
import { v4 as uuid } from "uuid";

type AuthPayload = { username: string };

type Todo = {
  id: string;
  task: string;
  username: string;
};

export const GET = withAuth(async (_req: NextRequest, payload: AuthPayload) => {
  const todos: Todo[] = await getTodos();
  const userTodos = todos.filter((t: Todo) => t.username === payload.username);
  return NextResponse.json(userTodos);
});

export const POST = withAuth(async (req: NextRequest, payload: AuthPayload) => {
  const { task } = await req.json();
  const todos: Todo[] = await getTodos();
  const newTodo: Todo = { id: uuid(), task, username: payload.username };
  todos.push(newTodo);
  await saveTodos(todos);
  return NextResponse.json({ message: "Todo added" });
});

export const DELETE = withAuth(async (req: NextRequest, payload: AuthPayload) => {
  const { id } = await req.json();
  const todos: Todo[] = await getTodos();
  const filteredTodos = todos.filter(
    (t: Todo) => !(t.id === id && t.username === payload.username)
  );
  await saveTodos(filteredTodos);
  return NextResponse.json({ message: "Todo deleted" });
});

// ✅ New PUT handler to edit a todo task
export const PUT = withAuth(async (req: NextRequest, payload: AuthPayload) => {
  const { id, task } = await req.json();
  const todos: Todo[] = await getTodos();

  const todoIndex = todos.findIndex(
    (t: Todo) => t.id === id && t.username === payload.username
  );

  if (todoIndex === -1) {
    return NextResponse.json({ message: "Todo not found" }, { status: 404 });
  }

  todos[todoIndex].task = task;
  await saveTodos(todos);

  return NextResponse.json({ message: "Todo updated" });
});
