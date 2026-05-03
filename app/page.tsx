import { HardHat, Users, ClipboardCheck, BarChart3, ArrowRight, ShieldCheck, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ConstructionLanding() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="px-4 lg:px-6 h-14 flex items-center border-b border-border/40">
        <Link className="flex items-center justify-center" href="#">
          <HardHat className="h-6 w-6 text-primary mr-2" />
          <span className="font-bold text-xl tracking-tighter">BuildTrack</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#about">
            About
          </Link>
          <Link href="/dashboard">
            <Button size="sm">Go to Dashboard</Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Precision Management for <br />
                  <span className="text-primary">Modern Construction</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  BuildTrack empowers site managers to monitor labor productivity, ensure safety compliance, and streamline workforce allocation in real-time.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/dashboard">
                  <Button className="px-8 py-6 text-lg" size="lg">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/10">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Everything you need to lead</h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-lg/relaxed">
                  Our platform provides comprehensive tools designed specifically for the construction industry.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex flex-col items-center p-6 bg-card rounded-xl border border-border shadow-sm">
                <div className="p-3 bg-primary/10 rounded-full mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Workforce Tracking</h3>
                <p className="text-muted-foreground text-center">
                  Real-time monitoring of personnel across multiple sites with automated attendance logs.
                </p>
              </div>
              <div className="flex flex-col items-center p-6 bg-card rounded-xl border border-border shadow-sm">
                <div className="p-3 bg-primary/10 rounded-full mb-4">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Safety Compliance</h3>
                <p className="text-muted-foreground text-center">
                  Digitized safety briefings, hazard reporting, and automated compliance tracking.
                </p>
              </div>
              <div className="flex flex-col items-center p-6 bg-card rounded-xl border border-border shadow-sm">
                <div className="p-3 bg-primary/10 rounded-full mb-4">
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Project Analytics</h3>
                <p className="text-muted-foreground text-center">
                  Detailed insights into labor costs, project timelines, and overall site productivity.
                </p>
              </div>
              <div className="flex flex-col items-center p-6 bg-card rounded-xl border border-border shadow-sm">
                <div className="p-3 bg-primary/10 rounded-full mb-4">
                  <ClipboardCheck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Skill Management</h3>
                <p className="text-muted-foreground text-center">
                  Maintain a database of worker certifications, skills, and past performance ratings.
                </p>
              </div>
              <div className="flex flex-col items-center p-6 bg-card rounded-xl border border-border shadow-sm">
                <div className="p-3 bg-primary/10 rounded-full mb-4">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Multi-Site Allocation</h3>
                <p className="text-muted-foreground text-center">
                  Easily move crews between projects based on urgency and resource requirements.
                </p>
              </div>
              <div className="flex flex-col items-center p-6 bg-card rounded-xl border border-border shadow-sm">
                <div className="p-3 bg-primary/10 rounded-full mb-4">
                  <HardHat className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Resource Optimization</h3>
                <p className="text-muted-foreground text-center">
                  Reduce idle time and labor overhead with intelligent scheduling and forecasting.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 border-t border-border/40">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to streamline your sites?</h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                  Join hundreds of construction firms optimizing their workforce with BuildTrack.
                </p>
              </div>
              <Link href="/dashboard">
                <Button size="lg" className="mt-4 px-10 py-6 text-lg">
                  Launch Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-border/40">
        <p className="text-xs text-muted-foreground">© 2026 BuildTrack Inc. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
