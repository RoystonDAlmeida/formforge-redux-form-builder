import { Parser } from "expr-eval";
import { FormField } from "@/types/form";

// Initialize the expression parser, disabling member access for security.
const parser = new Parser({ allowMemberAccess: false });

// Safely calculates the age in years from a given date string or Date object.
function safeAge(dateVal: string | Date): number {
  const d = typeof dateVal === "string" ? new Date(dateVal) : dateVal;
  // Return 0 for invalid dates.
  if (isNaN(d.getTime())) return 0;
  const diff = Date.now() - d.getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

// Computes the value of a derived field based on its formula and other form values.
export function computeDerived(
  field: FormField,
  values: Record<string, any>
): any {
  // Return early if the field is not a derived field or has no formula.
  if (!field.derived?.enabled || !field.derived.formula) return undefined;

  try {
    // Parse the formula string into an executable expression.
    const expr = parser.parse(field.derived.formula);

    // Evaluate the expression, providing current form values and custom functions.
    const result = expr.evaluate({ ...values, age: (...args: any[]) => safeAge(args[0] as any) });
    return result;
  } catch {
    // Return undefined if the formula is invalid or causes an error during evaluation.
    return undefined;
  }
}