import Navbar from "@/components/navbar";
import Link from "next/link";
import Reveal from "@/components/reveal";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-gradient-to-b from-background/90 via-muted/60 to-background/95">
        <section className="container px-90 py-20 text-center flex flex-col items-center">
          <Reveal>
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight text-foreground">
              Hire Smarter with AI-Driven Talent Matching
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Supercharge your recruitment with AI-driven CV screening,
              automated skill extraction, and precision candidate matching —
              find the right talent in a fraction of the time.
            </p>
          </Reveal>

          <Reveal>
            <div className="mt-8">
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-3 px-5 py-3 rounded-lg text-white font-medium bg-gradient-to-r from-primary to-accent shadow-lg hover:opacity-95"
              >
                Get started
              </Link>
            </div>
          </Reveal>

          <div className="mt-10 flex gap-8">
            <Reveal className="flex flex-col" delay={320}>
              <span className="text-2xl font-bold text-primary">95%</span>
              <span className="text-sm text-muted-foreground">
                Matching accuracy
              </span>
            </Reveal>
            <Reveal className="flex flex-col" delay={320}>
              <span className="text-2xl font-bold text-primary">3x</span>
              <span className="text-sm text-muted-foreground">
                Faster hiring
              </span>
            </Reveal>
            <Reveal className="flex flex-col">
              <span className="text-2xl font-bold text-primary">100%</span>
              <span className="text-sm text-muted-foreground">
                Automated screening
              </span>
            </Reveal>
          </div>
        </section>

        <section id="features" className="container mx-auto px-8 py-16">
          <h2 className="text-2xl font-semibold mb-6">Why teams choose us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Reveal className="p-6 rounded-lg bg-card border border-border">
              <h3 className="font-bold text-lg">AI-Powered Matching</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Prioritize candidates based on role fit, skills, and culture
                match.
              </p>
            </Reveal>
            <Reveal className="p-6 rounded-lg bg-card border border-border">
              <h3 className="font-bold text-lg">Automated Screening</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Extract skills and qualifications automatically from CVs.
              </p>
            </Reveal>
            <Reveal className="p-6 rounded-lg bg-card border border-border">
              <h3 className="font-bold text-lg">Seamless Exports</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Export candidate lists to Excel with a single click for
                reporting.
              </p>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}
