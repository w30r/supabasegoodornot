import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import {
  HardHat,
  ArrowLeft,
  MapPin,
  CreditCard,
  Calendar,
  User,
  ShieldCheck,
  Clock,
  Briefcase,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function WorkerDetailsPage({ params }: Props) {
  const { id } = await params;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: worker, error } = await supabase
    .from("workers")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !worker) {
    console.error("❌ Error fetching worker details:", error);
    notFound();
  }

  const statusStyles = {
    active:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    on_leave:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    terminated: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <HardHat className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">BuildTrack</span>
            </Link>
            <span className="text-muted-foreground mx-2">/</span>
            <Link
              href="/dashboard"
              className="hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
            <span className="text-muted-foreground mx-2">/</span>
            <span className="font-medium">Worker Profile</span>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 space-y-6">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Directory
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Basic Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader className="text-center pb-2">
                <div className="mx-auto w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <User className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold">
                  {worker.full_name}
                </CardTitle>
                <div className="flex justify-center mt-2">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[worker.status as keyof typeof statusStyles]}`}
                  >
                    {worker.status.toUpperCase().replace("_", " ")}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Separator />
                <div className="grid gap-3 pt-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground flex items-center">
                      <Briefcase className="h-4 w-4 mr-2" /> Role
                    </span>
                    <span className="font-medium">{worker.role}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground flex items-center">
                      <CreditCard className="h-4 w-4 mr-2" /> Passport
                    </span>
                    <span className="font-medium font-mono">
                      {worker.passport_number}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground flex items-center">
                      <MapPin className="h-4 w-4 mr-2" /> Location
                    </span>
                    <span className="font-medium">{worker.site_location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <ShieldCheck className="h-5 w-5 mr-2 text-primary" />{" "}
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li className="flex justify-between">
                    <span>CIDB Green Card</span>
                    <span className="text-green-500 font-medium">Valid</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Safety Induction</span>
                    <span className="text-green-500 font-medium">
                      Completed
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>Working at Heights</span>
                    <span className="text-muted-foreground">Not Required</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Detailed Stats & Activity */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  Work History & Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-muted/50 p-4 rounded-lg text-center">
                    <Clock className="h-5 w-5 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">160h</div>
                    <div className="text-xs text-muted-foreground">
                      Hours this month
                    </div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg text-center">
                    <Calendar className="h-5 w-5 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">22/24</div>
                    <div className="text-xs text-muted-foreground">
                      Attendance rate
                    </div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg text-center">
                    <Activity className="h-5 w-5 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">0</div>
                    <div className="text-xs text-muted-foreground">
                      Safety incidents
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-semibold">Recent Logs</h3>
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-center">
                          <div className="bg-primary/10 p-2 rounded mr-3">
                            <Clock className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="text-sm font-medium">
                              Clocked in at {worker.site_location}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              2 days ago • 08:00 AM
                            </div>
                          </div>
                        </div>
                        <div className="text-xs font-medium text-green-500">
                          Verified
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-3">
              <Button variant="outline">Suspend Worker</Button>
              <Button>Update Profile</Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t bg-card mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 BuildTrack Workforce Management
          </p>
        </div>
      </footer>
    </div>
  );
}
