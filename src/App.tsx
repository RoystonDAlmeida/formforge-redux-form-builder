import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/store";
import { HelmetProvider } from "react-helmet-async";
import Header from "@/components/layout/Header";
import { Suspense, lazy } from "react";
import LoadingIndicator from "./components/layout/LoadingIndicator";

// Lazy-load page components for code-splitting and suspense-based loading states
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const CreateForm = lazy(() => import("./pages/CreateForm"));
const Preview = lazy(() => import("./pages/Preview"));
const MyForms = lazy(() => import("./pages/MyForms"));

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

            {/* Suspense provides a fallback UI (the loading indicator) while lazy-loaded components are fetched */}
            <Suspense fallback={<LoadingIndicator />}>
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
            </Suspense>
            
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </Provider>
);

export default App;
