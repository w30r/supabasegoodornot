import { Utensils, MapPin, Users, ArrowRight, Zap } from "lucide-react";
import { createLobby } from "./actions";
import { Button } from "@/components/ui/button";

export default function MakanManaLanding() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 font-sans select-none">
      {/* Hero Section */}
      <div className="text-center mb-10">
        <div className="bg-primary w-20 h-20 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg rotate-2 border-2 border-primary">
          <Utensils className="text-primary-foreground w-10 h-10" />
        </div>
        <h1 className="text-4xl font-bold text-foreground tracking-tight italic">
          MAKAN<span className="text-primary">MANA?</span>
        </h1>
        <p className="text-muted-foreground mt-2 text-base font-medium">
          Solving the &quot;mana-mana pun boleh&quot; dilemma.
        </p>
      </div>

      {/* Action Card */}
      <div className="w-full max-w-sm bg-card rounded-xl shadow-xl p-8 border-2 border-border">
        <div className="space-y-6">
          {/* Create Room Button */}
          <form
            // action={createLobby}
            className="space-y-6"
            onSubmit={createLobby}
          >
            <Button
              variant="default"
              type="submit"
              className="w-full bg-primary hover:opacity-90 text-primary-foreground font-bold py-4 rounded-lg flex items-center justify-center gap-3 transition-all active:translate-y-1 shadow-md"
            >
              <Zap className="w-5 h-5 fill-current" />
              Create Lobby
              <ArrowRight className="w-5 h-5" />
            </Button>
          </form>

          <div className="relative flex items-center py-2">
            <div className="grow border-t border-border"></div>
            <span className="shrink mx-4 text-muted-foreground text-xs font-bold uppercase tracking-widest">
              Join Friends
            </span>
            <div className="grow border-t border-border"></div>
          </div>

          {/* Join Room Section */}
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="ROOM CODE"
                className="flex-1 bg-input border-2 border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ring uppercase font-mono tracking-tighter text-foreground placeholder:text-muted-foreground/50"
              />
              <button className="bg-secondary hover:opacity-90 text-secondary-foreground px-5 py-3 rounded-lg font-bold shadow-sm transition-all active:translate-y-1">
                JOIN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Malaysian Vibes Badges */}
      <div className="mt-10 flex flex-wrap justify-center gap-3 w-full max-w-sm">
        <div className="flex items-center gap-2 text-muted-foreground text-xs font-bold bg-muted/30 px-3 py-2 rounded-full border border-border shadow-xs">
          <MapPin className="w-3 h-3" />
          <span>KL / SELANGOR</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground text-xs font-bold bg-muted/30 px-3 py-2 rounded-full border border-border shadow-xs">
          <Users className="w-3 h-3" />
          <span>COUPLES / GANGS</span>
        </div>
      </div>

      <footer className="mt-16 flex flex-col items-center gap-2">
        <div className="h-1 w-12 bg-primary/20 rounded-full" />
        <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.2em]">
          Built for the 🇲🇾 Foodie
        </p>
      </footer>
    </div>
  );
}
