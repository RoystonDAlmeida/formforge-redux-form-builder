import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import FieldListEditor from "@/components/form/FieldListEditor";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store";
import { addForm } from "@/store/formsSlice";
import { resetBuilder } from "@/store/builderSlice";
import { nanoid } from "nanoid";
import { FormSchema } from "@/types/form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

// The main component for the form creation page.
export default function CreateForm() {
  // Selects the current fields from the Redux builder state.
  const fields = useAppSelector((s) => s.builder.fields);
  // Gets the dispatch function from the Redux store.
  const dispatch = useAppDispatch();
  // Gets the navigate function from React Router for redirection.
  const navigate = useNavigate();
  // Gets location object to check for state passed during navigation.
  const location = useLocation();
  // State to control the visibility of the save form dialog.
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  // State to hold the name of the form being created.
  const [formName, setFormName] = useState("");

  // Clear the builder state when the component mounts, unless we are editing a form.
  useEffect(() => {
    if (location.state?.fromMyForms !== true) {
      dispatch(resetBuilder());
    }
  }, [dispatch, location.state]);

  // Handles the final save action after the user provides a form name.
  const handleConfirmSave = () => {
    // Validates that the form name is not empty.
    if (!formName.trim()) {
      toast.error("Form name cannot be empty.");
      return;
    }
    // Creates the form schema object.
    const schema: FormSchema = {
      id: nanoid(),
      name: formName.trim(),
      createdAt: new Date().toISOString(),
      fields,
    };
    dispatch(addForm(schema));
    // Shows a success toast notification.
    toast.success("Form saved successfully!");
    // Closes the save dialog.
    setIsSaveDialogOpen(false);
    // Navigates to the preview page for the newly created form.
    navigate(`/preview/${schema.id}`);
  };

  // Opens the save dialog and resets the form name input.
  const openSaveDialog = () => {
    setFormName(""); // Clear previous name before opening
    setIsSaveDialogOpen(true);
  };

  return (
    <main className="container py-8">
      {/* Manages the document head for SEO and accessibility. */}
      <Helmet>
        <title>Create Form — FormForge Redux</title>
        <meta name="description" content="Design dynamic forms in FormForge Redux with validations and derived fields. Save your schema locally and iterate quickly." />
        <link rel="canonical" href="/create" />
      </Helmet>
      {/* Page header section. */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Form Builder</h1>
        <p className="text-muted-foreground">Add fields, configure validations, and define derived logic.</p>
      </header>
      {/* Renders the main field editor component. */}
      <FieldListEditor />
      {/* Container for the save button. */}
      <div className="mt-6">
        <Button variant="contained" onClick={openSaveDialog} disabled={fields.length === 0}>Save Form</Button>
      </div>

      {/* Dialog for entering the form name before saving. */}
      <Dialog open={isSaveDialogOpen} onClose={() => setIsSaveDialogOpen(false)}>
        <DialogTitle>Save Form</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your form. This will be used to identify it later.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Form Name"
            type="text"
            fullWidth
            variant="standard"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleConfirmSave()}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsSaveDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmSave} disabled={!formName.trim()}>Save</Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}
