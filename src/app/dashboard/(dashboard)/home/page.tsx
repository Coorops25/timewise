"use client";
export const dynamic = 'force-dynamic';

import React from 'react';

// Simula datos de usuario (reemplaza por tu lógica real)
const user = undefined; // o { name: 'John Doe' }

export default function DashboardHome() {
  return (
    <main style={{ padding: 32 }}>
      <h1>Bienvenido {user?.name ?? "Invitado"}</h1>
      <p>Este es tu dashboard de inicio.</p>
    </main>
  );
}
