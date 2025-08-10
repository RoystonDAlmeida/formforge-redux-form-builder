import { FormSchema } from "@/types/form";

// Storage key for form data
const STORAGE_KEY = "dynamic_forms";

// Load forms using STORAGE_KEY
export function loadForms(): FormSchema[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as FormSchema[];
  } catch {
    return [];
  }
}

// Save forms using STORAGE_KEY
export function saveForms(forms: FormSchema[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(forms));
  } catch {}
}