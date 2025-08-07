import React, { useState } from 'react';

type Todo = {
     id: string;
     task: string;
};

type Props = {
     todos: Todo[];
     onDelete: (id: string) => void;
     onEdit: (id: string, newTask: string) => void;
};

const TodoList: React.FC<Props> = ({ todos, onDelete, onEdit }) => {
     const [editingId, setEditingId] = useState<string | null>(null);
     const [editText, setEditText] = useState('');

     const startEditing = (id: string, currentTask: string) => {
          setEditingId(id);
          setEditText(currentTask);
     };

     const handleEditSave = (id: string) => {
          if (editText.trim() === '') return;
          onEdit(id, editText);
          setEditingId(null);
     };

     return (
          <ul className="space-y-4">
               {todos.map((todo) => (
                    <li
                         key={todo.id}
                         className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl p-4 shadow hover:shadow-lg transition-shadow duration-200"
                    >
                         {editingId === todo.id ? (
                              <input
                                   type="text"
                                   value={editText}
                                   onChange={(e) => setEditText(e.target.value)}
                                   className="flex-1 px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mr-4"
                                   placeholder="Edit task..."
                              />
                         ) : (
                              <span className="flex-1 text-gray-800 text-md">{todo.task}</span>
                         )}

                         <div className="flex gap-2 ml-4">
                              {editingId === todo.id ? (
                                   <button
                                        onClick={() => handleEditSave(todo.id)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm transition-colors"
                                   >
                                        Save
                                   </button>
                              ) : (
                                   <button
                                        onClick={() => startEditing(todo.id, todo.task)}
                                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm transition-colors"
                                   >
                                        Edit
                                   </button>
                              )}

                              <button
                                   onClick={() => onDelete(todo.id)}
                                   className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition-colors"
                              >
                                   Delete
                              </button>
                         </div>
                    </li>
               ))}
          </ul>
     );
};

export default TodoList;
