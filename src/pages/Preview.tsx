import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store";
import FormRenderer from "@/components/form/FormRenderer";
import { Button } from "@mui/material";

// A page component to preview a form, either from the live builder or a saved schema.
export default function Preview() {
  // Retrieves the form ID from the URL, if present.
  const { id } = useParams();

  // Selects all saved forms from the Redux store.
  const forms = useAppSelector((s) => s.forms.forms);

  // Gets the navigate function for client-side routing.
  const navigate = useNavigate();

  // Selects the current fields from the form builder state.
  const builderFields = useAppSelector((s) => s.builder.fields);

  // Determines the form schema to render: a saved form if an ID exists, otherwise the live builder's fields.
  const schema = id ? forms.find((f) => f.id === id)?.fields ?? [] : builderFields;

  // Determines the form name to display.
  const formName = id ? forms.find((f) => f.id === id)?.name ?? "Preview" : "Live Builder Preview";

  return (
    <main className="container py-8">
      {/* Manages the document head for SEO and accessibility. */}
      <Helmet>
        <title>{formName} - Preview | FormForge Redux</title>
        <meta name="description" content="Preview forms in FormForge Redux with live validations and derived fields updates." />
        <link rel="canonical" href={id ? `/preview/${id}` : "/preview"} />
      </Helmet>

      {/* Page header displaying the form's name. */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold">{formName}</h1>
        <p className="text-muted-foreground">Interact with the form below as an end user.</p>
      </header>
      
      {/* Conditionally renders the form or a placeholder if the schema is empty. */}
      {schema.length > 0 ? (
        <FormRenderer schema={schema} />
      ) : (
        <section className="rounded-lg border p-6 text-center">
          <p className="text-muted-foreground">No fields to preview yet.</p>
          {/* Provides navigation buttons to create or open a form. */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-2">
            <Button
              variant="contained"
              onClick={() => navigate('/create')}
              sx={{
                backgroundColor: 'black',
                '&:hover': { backgroundColor: 'grey.800' },
              }}
            >
              Build a form
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/myforms')}
              sx={{
                color: 'black',
                borderColor: 'black',
                '&:hover': { borderColor: 'black', backgroundColor: 'rgba(0, 0, 0, 0.04)' },
              }}
            >
              Open a saved form
            </Button>
          </div>
        </section>
      )}

    </main>
  );
}