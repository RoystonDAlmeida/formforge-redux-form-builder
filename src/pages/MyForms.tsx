import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useAppDispatch, useAppSelector } from "@/store";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import { deleteForm } from "@/store/formsSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function MyForms() {
  const forms = useAppSelector((s) => s.forms.forms);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [formToDelete, setFormToDelete] = useState<string | null>(null);

  // Opens the delete form dialog.
  const openDeleteDialog = (id: string) => {
    setFormToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  // Handles the deletion of a form.
  const handleConfirmDelete = () => {
    if (!formToDelete) return;
    dispatch(deleteForm(formToDelete));
    toast.success("Form deleted successfully.");
    setIsDeleteDialogOpen(false);
    setFormToDelete(null);
  };
  
  return (
    <main className="container py-8">
      <Helmet>
        <title>My Forms — FormForge Redux</title>
        <meta name="description" content="Browse and open your saved FormForge Redux forms from localStorage." />
        <link rel="canonical" href="/myforms" />
      </Helmet>

      <header className="mb-6">
        <h1 className="text-3xl font-bold">My Forms</h1>
        <p className="text-muted-foreground">All your saved forms</p>
      </header>

      <div className="grid gap-4">
        {forms.map((f) => (
          <div key={f.id} className="rounded-lg border p-4 flex items-center justify-between">
            <div>
              <div className="font-medium">{f.name}</div>
              <div className="text-sm text-muted-foreground">Created {new Date(f.createdAt).toLocaleString()}</div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outlined" onClick={() => navigate(`/preview/${f.id}`)}>Open</Button>
              <IconButton color="error" onClick={() => openDeleteDialog(f.id)} aria-label="Delete">✕</IconButton>
            </div>
          </div>
        ))}
        {forms.length === 0 && (
          <div className="text-muted-foreground">No saved forms yet. Create one in the builder.</div>
        )}
      </div>

      <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the form "{forms.find((f) => f.id === formToDelete)?.name}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}