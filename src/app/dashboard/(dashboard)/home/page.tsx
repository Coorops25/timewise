'use client'
import React from 'react';

// Simulate user data (replace with real data fetching logic)
const user = undefined; // or { name: 'John Doe' }

export default function DashboardHome() {
  return (
    <main style={{ padding: 32 }} className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <h1>Welcome{user && user.name ? `, ${user.name}` : ''}!</h1>
      <p>This is your dashboard home page.</p>
    </main>
  );
}
