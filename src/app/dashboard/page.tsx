'use client';

import { useEffect, useState } from 'react';
import TodoList from '@/components/TodoList';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
     const router = useRouter();
     const [todos, setTodos] = useState([]);
     const [task, setTask] = useState('');

     const fetchTodos = async () => {
          const res = await fetch('/api/todos');
          if (res.ok) {
               const data = await res.json();
               setTodos(data);
          } else {
               router.push('/login');
          }
     };

     const handleAdd = async () => {
          if (!task) return;
          await fetch('/api/todos', {
               method: 'POST',
               body: JSON.stringify({ task }),
          });
          setTask('');
          fetchTodos();
     };

     const handleDelete = async (id: string) => {
          await fetch('/api/todos', {
               method: 'DELETE',
               body: JSON.stringify({ id }),
          });
          fetchTodos();
     };

     const handleEdit = async (id: string, newTask: string) => {
          await fetch('/api/todos', {
               method: 'PUT',
               body: JSON.stringify({ id, task: newTask }),
          });
          fetchTodos();
     };

     useEffect(() => {
          fetchTodos();
     }, []);

     return (
          <div className="bg-white p-6 rounded shadow-md mt-10">
               <h1 className="text-2xl font-bold mb-4 text-center">Your Todo List</h1>
               <div className="flex gap-2 mb-4">
                    <input
                         type="text"
                         value={task}
                         onChange={(e) => setTask(e.target.value)}
                         placeholder="New task..."
                         className="flex-1 px-3 py-2 border rounded"
                    />
                    <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2 rounded">
                         Add
                    </button>
               </div>
               <TodoList todos={todos} onDelete={handleDelete} onEdit={handleEdit} />
          </div>
     );
}
