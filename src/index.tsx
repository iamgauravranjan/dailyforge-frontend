import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './APP';
import { AuthProvider } from './AuthContext';

const container = document.getElementById('root');

if (!container) {
  throw new Error("Failed to find the root element. Make sure your index.html has a <div id='root'></div>");
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    {/* 🚀 Wrapping the App component inside our provider fixes the lifecycle race condition */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);