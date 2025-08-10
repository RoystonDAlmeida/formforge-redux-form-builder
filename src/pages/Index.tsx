import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import {
  ClipboardList,
  Database,
  Edit,
  Eye,
  Folder,
  Replace,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    icon: <Replace className="h-8 w-8 text-primary" />,
    title: "Dynamic Fields",
    description:
      "Fields can be shown, hidden, or have their values calculated based on other fields' states.",
  },
  {
    icon: <CheckCircle2 className="h-8 w-8 text-primary" />,
    title: "Live Validation",
    description:
      "Get instant feedback with built-in validation rules for all field types.",
  },
  {
    icon: <Database className="h-8 w-8 text-primary" />,
    title: "No Backend Needed",
    description:
      "Save your form schemas directly in your browser's local storage for quick access.",
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-background text-foreground">
      <Helmet>
        <title>FormForge Redux — Dynamic Form Builder</title>
        <meta name="description" content="FormForge Redux lets you build dynamic forms with validations and derived fields. Preview instantly and manage saved forms—no backend." />
        <link rel="canonical" href="/" />
      </Helmet>

      <main className="container mx-auto px-4">

        {/* Hero section */}
        <section className="text-center py-20 md:py-32 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-block p-4 bg-primary/10 rounded-full mb-6">
            <ClipboardList className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">FormForge Redux</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mt-4">A dynamic form builder with validations and derived fields. Preview instantly and manage saved forms—all without a backend.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/create')}
              startIcon={<Edit size={16} />}
              sx={{
                backgroundColor: 'black',
                '&:hover': { backgroundColor: 'grey.800' },
              }}
            >
              Start Building
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/preview')}
              startIcon={<Eye size={16} />}
              sx={{
                color: 'black',
                borderColor: 'black',
                '&:hover': {
                  borderColor: 'black',
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              Live Preview
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/myforms')}
              startIcon={<Folder size={16} />}
              sx={{
                color: 'black',
                borderColor: 'black',
                '&:hover': { borderColor: 'black', backgroundColor: 'rgba(0, 0, 0, 0.04)' },
              }}
            >
              My Forms
            </Button>
          </div>
        </section>

        {/* Features section */}
        <section className="py-16 md:py-24">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
            <h2 className="text-3xl md:text-4xl font-bold">Powerful Features, Zero Hassle</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Everything you need to build complex forms with ease, right out of the box.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={feature.title} 
                className="p-6 bg-card rounded-xl border text-center animate-in fade-in slide-in-from-bottom-12 duration-700"
                style={{ animationDelay: `${200 + index * 150}ms` }}
              >
                <div className="flex justify-center items-center mb-4 h-16 w-16 bg-primary/10 rounded-full mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
