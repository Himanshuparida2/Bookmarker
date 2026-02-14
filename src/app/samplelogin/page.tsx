"use client";
import { Bookmark, Zap, Shield, Layout, Search as SearchIcon, ArrowRight } from "lucide-react";
import { Button } from "../../../components/ui/button";
import React from 'react'

function samplelogin() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-background font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-primary/10 p-1.5 rounded-lg">
              <Bookmark className="w-5 h-5 text-primary" />
            </div>
            <span className="font-bold text-lg tracking-tight">SmartBookmarks</span>
          </div>
          <Button variant="ghost"  className="rounded-xl font-medium">
            Sign In
          </Button>
        </div>
      </nav>

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          {/* Ambient Background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-8 animate-in fade-in slide-in-from-bottom-3 duration-1000">
                <Zap className="w-3 h-3 fill-current" />
                <span>ALL YOUR LINKS IN ONE PLACE</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-display font-bold leading-[1.1] mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
                The bookmarks app <br />
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent italic">actually worth using.</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-300">
                SmartBookmarks is the minimalist, high-speed bookmark manager that helps you organize your digital world without the clutter.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-500">
                <Button 
                  size="lg" 
                  //onClick={handleLogin}
                  className="h-14 px-10 rounded-2xl text-lg font-semibold shadow-2xl shadow-primary/30 hover:shadow-primary/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Start Saving for Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <p className="text-sm text-muted-foreground/60 italic">No credit card required. Google Auth only.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Bento */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 p-8 rounded-3xl bg-background border border-border/50 hover:border-primary/20 transition-colors">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Lightning Fast Sync</h3>
                <p className="text-muted-foreground text-lg">Your bookmarks are instantly available across all your tabs and devices the moment you hit save.</p>
              </div>
              <div className="p-8 rounded-3xl bg-background border border-border/50 hover:border-primary/20 transition-colors">
                <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Private</h3>
                <p className="text-muted-foreground text-lg">Your data is yours alone. We use secure authentication to keep your links private.</p>
              </div>
              <div className="p-8 rounded-3xl bg-background border border-border/50 hover:border-primary/20 transition-colors">
                <div className="h-12 w-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6">
                  <Layout className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Clean UI</h3>
                <p className="text-muted-foreground text-lg">No ads, no tracking, no distractions. Just your links in a beautiful layout.</p>
              </div>
              <div className="md:col-span-2 p-8 rounded-3xl bg-background border border-border/50 hover:border-primary/20 transition-colors">
                <div className="h-12 w-12 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6">
                  <SearchIcon className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Instant Search</h3>
                <p className="text-muted-foreground text-lg">Find what you need instantly with our powerful, real-time search engine that works as you type.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 -skew-y-3 origin-right" />
          <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="text-4xl font-bold mb-8">Ready to reclaim your browser?</h2>
            <Button 
              size="lg" 
              //onClick={handleLogin}
              className="h-14 px-10 rounded-2xl text-lg font-semibold hover:scale-[1.02] transition-transform"
            >
              Get Started with Google
            </Button>
            <div className="mt-12 flex items-center justify-center space-x-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              <span className="font-bold text-xl tracking-tighter">TRUSTED BY 10,000+ USERS</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-border/40">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2">
            <Bookmark className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-semibold text-muted-foreground">© 2026 SmartBookmarks</span>
          </div>
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <span className="hover:text-foreground cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">Support</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default samplelogin
