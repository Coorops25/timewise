
'use client';

import { useState, useEffect } from 'react';
import { user } from '@/lib/data';

export function WelcomeHeader() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = time
    ? time.toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ' '; // Using a non-breaking space as a placeholder

  const formattedTime = time
    ? time.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    : ' '; // Using a non-breaking space as a placeholder

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
