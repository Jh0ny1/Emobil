
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex flex-col">
      <header className="border-b bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto py-4 px-6 flex justify-between items-center">
          <div className="font-semibold text-xl text-real-600">PropVue</div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/dashboard">Log In</Link>
            </Button>
            <Button asChild>
              <Link to="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-16 md:py-24 container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Manage Your Real Estate Business <span className="text-real-600">Efficiently</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 md:mb-12">
              PropVue provides all the tools you need to manage properties, clients, and transactions in one intuitive platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/dashboard">Enter Dashboard</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/properties">View Properties</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-card">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Everything You Need in One Place</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our comprehensive real estate management system helps you stay organized and increase productivity.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-lg bg-background border">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Property Management</h3>
                <p className="text-muted-foreground">
                  Easily list, organize, and track all your properties in one central location.
                </p>
              </div>
              <div className="p-6 rounded-lg bg-background border">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Client Relationships</h3>
                <p className="text-muted-foreground">
                  Manage client interactions, preferences, and communications efficiently.
                </p>
              </div>
              <div className="p-6 rounded-lg bg-background border">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="m9 16 2 2 4-4"/></svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Visit Scheduling</h3>
                <p className="text-muted-foreground">
                  Schedule and track property visits, follow-ups, and appointments.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Optimize Your Real Estate Business?</h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of real estate professionals who have transformed their business with PropVue.
            </p>
            <Button size="lg" asChild>
              <Link to="/dashboard">Get Started Now</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="font-semibold text-xl text-real-600 mb-4 md:mb-0">PropVue</div>
            <div className="text-sm text-muted-foreground">
              © 2025 PropVue. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
