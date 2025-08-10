import { useMemo } from "react";
import { Button, IconButton, MenuItem, Select, TextField, Checkbox, FormControlLabel, Typography, Divider } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store";
import { addField, moveFieldDown, moveFieldUp, removeField, updateField } from "@/store/builderSlice";
import { FormField, FieldType } from "@/types/form";
import { nanoid } from "nanoid";

// Defines the available field types for the form builder UI.
const fieldTypes: { label: string; value: FieldType }[] = [
  { label: "Text", value: "text" },
  { label: "Number", value: "number" },
  { label: "Textarea", value: "textarea" },
  { label: "Select", value: "select" },
  { label: "Radio", value: "radio" },
  { label: "Checkbox", value: "checkbox" },
  { label: "Date", value: "date" },
];

// A utility function to create a URL- and code-friendly name from a field label.
function makeSafeName(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9_]+/g, "_").replace(/^_+|_+$/g, "");
}

// The main component for editing the list of fields in the form builder.
export default function FieldListEditor() {
  const dispatch = useAppDispatch();
  const fields = useAppSelector((s) => s.builder.fields);

  // Handles the creation of a new form field and adds it to the Redux store.
  const addNewField = (type: FieldType) => {
    const baseLabel = `${type.charAt(0).toUpperCase()}${type.slice(1)} Field`;
    const newField: FormField = {
      id: nanoid(),
      name: makeSafeName(baseLabel),
      type,
      label: baseLabel,
      required: false,
      defaultValue: "",
      validations: {},
      ...(type === "select" || type === "radio" || type === "checkbox" ? { options: ["Option 1", "Option 2"] } : {}),
    } as FormField;
    dispatch(addField(newField));
  };

  return (
    <div className="space-y-6">
      {/* Section for adding new fields */}
      <div className="flex flex-wrap items-center gap-3">
        <Typography variant="h6" className="font-semibold">Add field</Typography>
        <div className="flex flex-wrap gap-2">
          {fieldTypes.map((t) => (
            <Button key={t.value} variant="outlined" size="small" onClick={() => addNewField(t.value)}>
              {t.label}
            </Button>
          ))}
        </div>
      </div>
      <Divider />
      {/* Renders the list of existing fields for editing */}
      <div className="space-y-6">
        {fields.map((f, idx) => (
          <FieldEditor key={f.id} field={f} index={idx} total={fields.length} />
        ))}
        {fields.length === 0 && (
          <Typography color="text.secondary">No fields yet. Use the buttons above to add your first field.</Typography>
        )}
      </div>
    </div>
  );
}

// A component for editing the properties of a single form field.
function FieldEditor({ field, index, total }: { field: FormField; index: number; total: number }) {
  const dispatch = useAppDispatch();
  const fields = useAppSelector((s) => s.builder.fields);

  // Memoizes the list of fields that can be parents for a derived field.
  const parentCandidates = useMemo(() => fields.filter((f) => f.id !== field.id), [fields, field.id]);

  // A helper function to dispatch an update action for the current field.
  const update = (changes: Partial<FormField>) => dispatch(updateField({ id: field.id, changes }));

  return (
    <div className="rounded-lg border p-4">
      {/* Header section with field label, type, and action buttons */}
      <div className="flex items-center justify-between gap-3">
        <Typography variant="subtitle1" className="font-medium">{field.label} <span className="text-muted-foreground">({field.type})</span></Typography>
        <div className="flex items-center gap-1">
          <IconButton size="small" onClick={() => dispatch(moveFieldUp(field.id))} disabled={index === 0} aria-label="Move up">↑</IconButton>
          <IconButton size="small" onClick={() => dispatch(moveFieldDown(field.id))} disabled={index === total - 1} aria-label="Move down">↓</IconButton>
          <IconButton size="small" color="error" onClick={() => dispatch(removeField(field.id))} aria-label="Delete">✕</IconButton>
        </div>
      </div>

      {/* General field settings */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField label="Label" value={field.label} onChange={(e) => update({ label: e.target.value, name: makeSafeName(e.target.value) })} fullWidth />
        <Select value={field.type} onChange={(e) => update({ type: e.target.value as any })} displayEmpty>
          {fieldTypes.map((t) => (
            <MenuItem key={t.value} value={t.value}>{t.label}</MenuItem>
          ))}
        </Select>
        <FormControlLabel control={<Checkbox checked={field.required} onChange={(e) => update({ required: e.target.checked })} />} label="Required" />
        <TextField label="Default value" value={field.defaultValue ?? ""} onChange={(e) => update({ defaultValue: e.target.value })} fullWidth />

        {/* Options editor for select, radio, and checkbox fields */}
        {(field.type === "select" || field.type === "radio" || field.type === "checkbox") && (
          <TextField
            label="Options (comma separated)"
            value={("options" in field && field.options ? field.options.join(", ") : "")}
            onChange={(e) => update({ ...(field as any), options: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
            fullWidth
          />
        )}
      </div>

      {/* Validation rules editor */}
      <div className="mt-4 space-y-2">
        <Typography variant="subtitle2">Validations</Typography>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <FormControlLabel control={<Checkbox checked={!!field.validations.notEmpty || field.required} onChange={(e) => update({ validations: { ...field.validations, notEmpty: e.target.checked } })} />} label="Not empty" />
          <FormControlLabel control={<Checkbox checked={!!field.validations.email} onChange={(e) => update({ validations: { ...field.validations, email: e.target.checked } })} />} label="Email format" />
          <FormControlLabel control={<Checkbox checked={!!field.validations.password} onChange={(e) => update({ validations: { ...field.validations, password: e.target.checked } })} />} label="Password rule" />
          <TextField type="number" label="Min length" value={field.validations.minLength ?? ""} onChange={(e) => update({ validations: { ...field.validations, minLength: e.target.value ? Number(e.target.value) : undefined } })} />
          <TextField type="number" label="Max length" value={field.validations.maxLength ?? ""} onChange={(e) => update({ validations: { ...field.validations, maxLength: e.target.value ? Number(e.target.value) : undefined } })} />
        </div>
      </div>

      {/* Derived field configuration */}
      <div className="mt-4 space-y-2">
        <Typography variant="subtitle2">Derived Field</Typography>
        <FormControlLabel control={<Checkbox checked={!!field.derived?.enabled} onChange={(e) => update({ derived: { enabled: e.target.checked, parents: field.derived?.parents ?? [], formula: field.derived?.formula ?? "" } })} />} label="Mark as derived" />
        {field.derived?.enabled && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Select
              multiple
              value={field.derived.parents}
              onChange={(e) => update({ derived: { ...field.derived!, parents: (e.target.value as string[]) } })}
              displayEmpty
            >
              {parentCandidates.map((p) => (
                <MenuItem key={p.id} value={p.name}>{p.label} ({p.name})</MenuItem>
              ))}
            </Select>
            <TextField
              label="Formula (e.g., age(dob) or first_name + ' ' + last_name)"
              value={field.derived.formula}
              onChange={(e) => update({ derived: { ...field.derived!, formula: e.target.value } })}
              fullWidth
            />
          </div>
        )}
      </div>
    </div>
  );
}