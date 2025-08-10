import { useEffect, useMemo, useState } from "react";
import { TextField, Select, MenuItem, Checkbox, FormControlLabel, RadioGroup, Radio } from "@mui/material";
import { FormField } from "@/types/form";
import { validateField } from "@/utils/validation";
import { computeDerived } from "@/utils/derived";

interface Props {
  schema: FormField[];
}

// Renders a form based on a given schema, handling user input, validation, and derived values.
export default function FormRenderer({ schema }: Props) {
  // State to hold the current values of all form fields, initialized from the schema.
  const [values, setValues] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    schema.forEach((f) => {
      initial[f.name] = f.defaultValue ?? (f.type === "checkbox" ? false : "");
    });
    return initial;
  });

  // State to hold validation error messages for each field.
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  // Memoized mapping of field names to field definitions for efficient lookups.
  const fieldsByName = useMemo(() => Object.fromEntries(schema.map((f) => [f.name, f])), [schema]);

  // Effect to re-calculate derived fields whenever input values change.
  useEffect(() => {
    const next = { ...values };
    let changed = false;

    // Iterates through the schema to find and compute derived fields.
    schema.forEach((f) => {
      if (f.derived?.enabled) {
        const v = computeDerived(f, values);
        
        // Updates the value if the derived result is different.
        if (v !== undefined && v !== next[f.name]) {
          next[f.name] = v;
          changed = true;
        }
      }
    });
    // Applies the changes to the state if any derived value was updated.
    if (changed) setValues(next);

    // Note: Using JSON.stringify as a dependency is a simple way to deep-compare, but can be inefficient for large objects.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(values), schema.length]);

  // Updates the value for a specific field in the state.
  const setValue = (name: string, v: any) => {
    setValues((prev) => ({ ...prev, [name]: v }));
  };

  // Validates a field when it loses focus (onBlur event).
  const onBlurValidate = (f: FormField) => {
    const err = validateField(f, values[f.name]);
    setErrors((e) => ({ ...e, [f.name]: err }));
  };

  return (
    <div className="space-y-4">
      {/* Maps over the schema to render each form field. */}
      {schema.map((f) => (
        <div key={f.id} className="rounded-lg border p-4">
          <label className="block text-sm font-medium mb-2">{f.label}</label>
          {/* Conditionally renders the appropriate input component based on the field type. */}
          {f.type === "text" && (
            <TextField fullWidth value={values[f.name] ?? ""} onChange={(e) => setValue(f.name, e.target.value)} onBlur={() => onBlurValidate(f)} disabled={!!f.derived?.enabled} />
          )}
          {f.type === "number" && (
            <TextField fullWidth type="number" value={values[f.name] ?? ""} onChange={(e) => setValue(f.name, e.target.value)} onBlur={() => onBlurValidate(f)} disabled={!!f.derived?.enabled} />
          )}
          {f.type === "textarea" && (
            <TextField fullWidth multiline minRows={3} value={values[f.name] ?? ""} onChange={(e) => setValue(f.name, e.target.value)} onBlur={() => onBlurValidate(f)} disabled={!!f.derived?.enabled} />
          )}
          {f.type === "date" && (
            <TextField fullWidth type="date" value={values[f.name] ?? ""} onChange={(e) => setValue(f.name, e.target.value)} onBlur={() => onBlurValidate(f)} disabled={!!f.derived?.enabled} />
          )}
          {f.type === "select" && (
            <Select fullWidth value={values[f.name] ?? ""} onChange={(e) => setValue(f.name, e.target.value)} onBlur={() => onBlurValidate(f)} disabled={!!f.derived?.enabled}>
              {/* Type assertion is used here to access the 'options' property which only exists on certain field types. */}
              {(f as any).options?.map((opt: string) => (
                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
              ))}
            </Select>
          )}
          {f.type === "radio" && (
            <RadioGroup value={values[f.name] ?? ""} onChange={(e) => setValue(f.name, (e.target as HTMLInputElement).value)}>
              {(f as any).options?.map((opt: string) => (
                <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
              ))}
            </RadioGroup>
          )}
          {f.type === "checkbox" && (
            <FormControlLabel control={<Checkbox checked={!!values[f.name]} onChange={(e) => setValue(f.name, e.target.checked)} />} label={f.label} />
          )}
          {/* Displays a validation error message if one exists for the field. */}
          {errors[f.name] && <p className="mt-2 text-sm text-destructive">{errors[f.name]}</p>}
        </div>
      ))}
    </div>
  );
}