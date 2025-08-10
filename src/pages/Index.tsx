import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <Helmet>
        <title>FormForge Redux — Dynamic Form Builder</title>
        <meta name="description" content="FormForge Redux lets you build dynamic forms with validations and derived fields. Preview instantly and manage saved forms—no backend." />
        <link rel="canonical" href="/" />
      </Helmet>
      <section className="text-center space-y-6 px-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">FormForge Redux — Dynamic Form Builder</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">Create forms with text, numbers, selects, checkboxes, radios, and dates. Add validations and derived fields. Save to your browser and preview instantly.</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a href="/create"><Button>Start Building</Button></a>
          <a href="/preview"><Button variant="secondary">Live Preview</Button></a>
          <a href="/myforms"><Button variant="outline">My Forms</Button></a>
        </div>
      </section>
    </main>
  );
};

export default Index;
