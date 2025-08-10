import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/store";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CreateForm from "./pages/CreateForm";
import Preview from "./pages/Preview";
import MyForms from "./pages/MyForms";
import Header from "@/components/layout/Header";

// Create a client for TanStack Query
const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Header />

            {/* Defines the application's routes */}
            <Routes>
              {/* Route for the home/index page */}
              <Route path="/" element={<Index />} />
              {/* Route for the form creation page */}
              <Route path="/create" element={<CreateForm />} />
              {/* Route for previewing a form from the builder */}
              <Route path="/preview" element={<Preview />} />
              {/* Route for previewing a specific saved form by its ID */}
              <Route path="/preview/:id" element={<Preview />} />
              {/* Route for listing all saved forms */}
              <Route path="/myforms" element={<MyForms />} />
              {/* Catch-all route for handling 404 Not Found errors */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </Provider>
);

export default App;
