'use client';

import { useState, useEffect } from 'react';
import { user } from '@/lib/data';

export function WelcomeHeader() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = time.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = time.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div className="flex items-start justify-between">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, {user.name}!</h2>
        <p className="text-muted-foreground">
          {formattedDate}
        </p>
      </div>
      <div className="text-right hidden sm:block">
        <p className="text-3xl font-bold tracking-tighter">{formattedTime}</p>
        <p className="text-muted-foreground">Keep up the great work!</p>
      </div>
    </div>
  );
}
