import fs from "fs/promises";
import path from "path";
import bcrypt from "bcryptjs";

const usersPath = path.join(process.cwd(), "data/users.json");
const todosPath = path.join(process.cwd(), "data/todos.json");

export async function getUsers() {
  const data = await fs.readFile(usersPath, "utf8");
  return JSON.parse(data);
}

export async function getTodos() {
  const data = await fs.readFile(todosPath, "utf8");
  return JSON.parse(data);
}

export async function saveUsers(users: any) {
  await fs.writeFile(usersPath, JSON.stringify(users, null, 2));
}

export async function saveTodos(todos: any) {
  await fs.writeFile(todosPath, JSON.stringify(todos, null, 2));
}

export async function createUser(username: string, password: string) {
  const users = await getUsers();
  if (users.find((u: any) => u.username === username)) return null;
  const hashed = await bcrypt.hash(password, 10);
  const newUser = { username, password: hashed };
  users.push(newUser);
  await saveUsers(users);
  return newUser;
}

export async function validateUser(username: string, password: string) {
  const users = await getUsers();
  const user = users.find((u: any) => u.username === username);
  if (!user) return null;
  const match = await bcrypt.compare(password, user.password);
  return match ? user : null;
}
