'use client';

import { useState, useEffect, useRef } from 'react';
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
import { CheckCircle, Clock, Camera, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

type ClockingState = 'idle' | 'prompt' | 'clocking' | 'confirmed';
type ClockingType = 'in' | 'out';

export function ClockingActions() {
  const [state, setState] = useState<ClockingState>('idle');
  const [clockingType, setClockingType] = useState<ClockingType>('in');
  const [progress, setProgress] = useState(0);
  const [confirmedTime, setConfirmedTime] = useState('');
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [reason, setReason] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  const handleOpenPrompt = () => setState('prompt');

  const handleClockAction = (type: ClockingType) => {
    setClockingType(type);
    setState('clocking');
  };
  
  useEffect(() => {
    if (state === 'prompt') {
      const getCameraPermission = async () => {
        if (hasCameraPermission !== null) return; // Only ask for permission once
        try {
          const stream = await navigator.mediaDevices.getUserMedia({video: true});
          setHasCameraPermission(true);

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing camera:', error);
          setHasCameraPermission(false);
          toast({
            variant: 'destructive',
            title: 'Camera Access Denied',
            description: 'Please enable camera permissions in your browser settings to use this app.',
          });
        }
      };

      getCameraPermission();
    }
  }, [state, hasCameraPermission, toast]);

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
    setPhoto(null);
    setReason('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhoto(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const takeSnapshot = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        setPhoto(canvas.toDataURL('image/png'));
      }
    }
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>What would you like to do?</DialogTitle>
            <DialogDescription>Select an action, attach a photo, and provide a reason if necessary.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">1. Verification Photo</h3>
              <div className="space-y-2">
                <Label htmlFor="photo-upload">Upload Photo</Label>
                <div className="flex items-center gap-2">
                  <Input id="photo-upload" type="file" accept="image/*" onChange={handleFileChange} className="flex-1"/>
                  <Button variant="outline" size="icon" onClick={() => document.getElementById('photo-upload')?.click()}><Upload className="h-4 w-4"/></Button>
                </div>
              </div>
              <div className="relative space-y-2">
                <video ref={videoRef} className="w-full aspect-video rounded-md bg-muted" autoPlay muted />
                <Button onClick={takeSnapshot} disabled={!hasCameraPermission} className="w-full"><Camera className="mr-2 h-4 w-4"/>Take Snapshot</Button>
                {hasCameraPermission === false && (
                    <Alert variant="destructive">
                      <AlertTitle>Camera Access Required</AlertTitle>
                      <AlertDescription>
                        Please allow camera access to use this feature.
                      </AlertDescription>
                    </Alert>
                )}
              </div>
              {photo && <img src={photo} alt="Verification" className="rounded-md mt-2 w-full"/>}
            </div>
            <div className="space-y-4">
               <h3 className="font-semibold text-lg">2. Action & Reason</h3>
              <div className="space-y-2">
                <Label htmlFor="reason">Reason (if late)</Label>
                <Textarea 
                  id="reason"
                  placeholder="e.g. Doctor's appointment"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
               <div className="grid grid-cols-2 gap-4 pt-4">
                  <Button variant="outline" size="lg" onClick={() => handleClockAction('in')}>Clock In</Button>
                  <Button variant="outline" size="lg" onClick={() => handleClockAction('out')}>Clock Out</Button>
                  <Button variant="outline" size="lg">Start Break</Button>
                  <Button variant="outline" size="lg">End Break</Button>
              </div>
            </div>
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

    