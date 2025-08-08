
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Logo className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">TimeWise</span>
        </div>
        <nav>
          <Button variant="ghost" asChild>
            <Link href="/dashboard">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard">Admin Access</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-background">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-extrabold tracking-tight lg:text-6xl">
            Smart, Simple, and Secure Time Tracking
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Welcome to TimeWise, the effortless solution for managing employee attendance. Clock in, track hours, and generate reports with ease and precision.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild>
                <Link href="/dashboard">Employee Login</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
                 <Link href="/dashboard">Admin Dashboard</Link>
            </Button>
          </div>
        </div>
      </main>
      <footer className="p-4 border-t text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} TimeWise, Inc. All rights reserved.
      </footer>
    </div>
  );
}
