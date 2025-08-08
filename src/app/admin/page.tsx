
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Logo } from '@/components/icons';

export default function AdminLoginPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock authentication for admin
        if (email === 'Admin123' && password === 'timewise123T!') {
            toast({
                title: 'Login Successful',
                description: 'Redirecting to the admin dashboard.',
            });
            // In a real app, you would set an auth state/cookie here
            router.push('/admin');
        } else {
            toast({
                variant: 'destructive',
                title: 'Login Failed',
                description: 'Invalid username or password.',
            });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <Card className="mx-auto max-w-sm">
                <CardHeader className="text-center">
                    <Logo className="h-12 w-12 text-primary mx-auto mb-4" />
                    <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
                    <CardDescription>Enter your credentials to access the admin dashboard.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Username</Label>
                            <Input
                                id="email"
                                type="text"
                                placeholder="Admin123"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="timewise123T!"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
