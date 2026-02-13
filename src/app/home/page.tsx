import { Button } from "../../../components/ui/button";
import { ArrowRight, Bookmark, CheckCircle2 } from "lucide-react";

export default function home() {
  const handleLogin = () => {
    window.location.href = "";
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-background font-sans">
      <div className="flex-1 flex flex-col justify-center items-start p-8 lg:p-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="z-10 max-w-xl">
          <div className="flex items-center space-x-2 mb-8 animate-enter" style={{ animationDelay: "0ms" }}>
            <div className="bg-primary/10 p-2 rounded-lg">
              <Bookmark className="w-6 h-6 text-primary" />
            </div>
            <span className="font-bold text-lg tracking-tight">SmartBookmarks</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-display font-bold leading-[1.1] mb-6 animate-enter" style={{ animationDelay: "100ms" }}>
            Organize your <br />
            <span className="text-blue-600">digital life.</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-10 leading-relaxed animate-enter" style={{ animationDelay: "200ms" }}>
            A minimalist, distraction-free space for your most important links. 
            Syncs instantly across all your devices.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-enter" style={{ animationDelay: "300ms" }}>
            <Button
              size="lg" 
              className="text-lg bg-blue-600 text-white px-8 py-6 rounded-2xl shadow-xl shadow-blue-600/20 hover:shadow-2xl hover:shadow-blue-600/30 transition-all duration-300 transform hover:-translate-y-1 hover:cursor-pointer"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-6 rounded-2xl border-2 hover:bg-muted/50 hover:cursor-pointer"
            >
              Learn more
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-enter" style={{ animationDelay: "400ms" }}>
            {[
              "Instant Sync",
              "Private & Secure",
              "Minimalist Design",
              "Smart Search"
            ].map((feature) => (
              <div key={feature} className="flex items-center space-x-3 text-sm font-medium text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-primary/60" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:w-[45%] bg-muted/30 border-l border-border/50 relative hidden lg:flex items-center justify-center p-12">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-5 grayscale mix-blend-multiply" />

        <div className="relative w-full max-w-md aspect-[4/5] perspective-1000">
          <div className="absolute top-1/4 left-0 right-0 bg-blue-50 p-6 rounded-3xl shadow-2xl border border-border/50 transform rotate-[-6deg] hover:rotate-0 transition-transform duration-500 z-10">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">R</div>
              <div>
                <div className="h-2 w-24 bg-foreground/10 rounded mb-1" />
                <div className="h-2 w-16 bg-foreground/5 rounded" />
              </div>
            </div>
            <div className="h-24 bg-muted/30 rounded-xl" />
          </div>

          <div className="absolute top-1/3 left-8 right-[-2rem] bg-blue-50 p-6 rounded-3xl shadow-2xl border border-border/50 transform rotate-[3deg] hover:rotate-0 transition-transform duration-500 z-20">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">D</div>
              <div>
                <div className="h-2 w-32 bg-foreground/10 rounded mb-1" />
                <div className="h-2 w-20 bg-foreground/5 rounded" />
              </div>
            </div>
            <div className="h-24 bg-muted/30 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
