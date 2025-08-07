// src/app/layout.tsx
import './styles/globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Todo JWT App',
  description: 'A personal todo app with JWT authentication',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-tr from-blue-100 to-purple-200 font-sans">
        <main className="max-w-3xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
