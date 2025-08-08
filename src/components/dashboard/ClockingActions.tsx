'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock } from 'lucide-react';

type ClockingState = 'idle' | 'prompt' | 'clocking' | 'confirmed';
type ClockingType = 'in' | 'out';

export function ClockingActions() {
  const [state, setState] = useState<ClockingState>('idle');
  const [clockingType, setClockingType] = useState<ClockingType>('in');
  const [progress, setProgress] = useState(0);
  const [confirmedTime, setConfirmedTime] = useState('');

  const handleOpenPrompt = () => setState('prompt');

  const handleClockAction = (type: ClockingType) => {
    setClockingType(type);
    setState('clocking');
  };
  
  useEffect(() => {
    if (state === 'clocking') {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setConfirmedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
                    setState('confirmed');
                    return 100;
                }
                return prev + 10 + Math.random() * 10;
            });
        }, 200);
        return () => clearInterval(timer);
    }
  }, [state]);

  const reset = () => {
    setState('idle');
    setProgress(0);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Time Clock</CardTitle>
          <CardDescription>Clock in or out to track your work hours.</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground">Ready to start or end your work session?</p>
        </CardContent>
        <CardFooter>
          <Button size="lg" onClick={handleOpenPrompt} className="w-full">
            <Clock className="mr-2 h-5 w-5" />
            Clock In / Out
          </Button>
        </CardFooter>
      </Card>
      
      <Dialog open={state === 'prompt'} onOpenChange={(open) => !open && reset()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>What would you like to do?</DialogTitle>
            <DialogDescription>Select an action to log your time.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
              <Button variant="outline" size="lg" onClick={() => handleClockAction('in')}>Clock In</Button>
              <Button variant="outline" size="lg" onClick={() => handleClockAction('out')}>Clock Out</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={state === 'clocking'} onOpenChange={(open) => !open && reset()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Clocking {clockingType}...</DialogTitle>
            <DialogDescription>
              Please wait while we log your time. This shouldn't take long.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Progress value={progress} className="w-full" />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={state === 'confirmed'} onOpenChange={(open) => !open && reset()}>
        <DialogContent>
          <div className="flex flex-col items-center text-center gap-4 pt-8">
            <CheckCircle className="h-16 w-16 text-green-500 animate-in fade-in zoom-in-50 duration-500"/>
            <h2 className="text-2xl font-semibold">Success!</h2>
            <p className="text-muted-foreground">
            You have successfully clocked {clockingType} at {confirmedTime}.
            </p>
            <Button onClick={reset} className="w-full mt-4">
              Great!
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
