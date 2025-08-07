'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
     const router = useRouter();
     const [form, setForm] = useState({ username: '', password: '' });
     const [error, setError] = useState('');

     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          setForm({ ...form, [e.target.name]: e.target.value });
     };

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          setError('');
          const res = await fetch('/api/auth/register', {
               method: 'POST',
               body: JSON.stringify(form),
          });

          if (res.ok) {
               router.push('/login');
          } else {
               const data = await res.json();
               setError(data.message || 'Registration failed');
          }
     };

     return (
          <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto mt-20">
               <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
               {error && <p className="text-red-500">{error}</p>}
               <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                         type="text"
                         name="username"
                         placeholder="Username"
                         value={form.username}
                         onChange={handleChange}
                         className="w-full px-3 py-2 border rounded"
                         required
                    />
                    <input
                         type="password"
                         name="password"
                         placeholder="Password"
                         value={form.password}
                         onChange={handleChange}
                         className="w-full px-3 py-2 border rounded"
                         required
                    />
                    <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full">
                         Register
                    </button>
               </form>
               <p className="text-center mt-4 text-sm">
                    Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
               </p>
          </div>
     );
}
