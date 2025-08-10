import { FormField } from "@/types/form";

// Validates a form field based on its configuration.
export function validateField(field: FormField, value: any): string | null {
  const v = field.validations || {};
  const str = value == null ? "" : String(value);

  if (field.required || v.notEmpty) {
    if (str.trim().length === 0) return `${field.label} is required`;
  }

  if (v.minLength != null && str.length < v.minLength)
    return `${field.label} must be at least ${v.minLength} characters`;

  if (v.maxLength != null && str.length > v.maxLength)
    return `${field.label} must be at most ${v.maxLength} characters`;

  if (v.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (str && !emailRegex.test(str)) return `Invalid email format`;
  }

  if (v.password) {
    if (str.length < 8 || !/[0-9]/.test(str))
      return `Password must be 8+ chars and include a number`;
  }

  return null;
}