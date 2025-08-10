// Defines the available types for a form field.
export type FieldType = // prettier-ignore
  | "text"
  | "number"
  | "textarea"
  | "select"
  | "radio"
  | "checkbox"
  | "date";

// Defines the validation rules that can be applied to a form field.
export interface ValidationRules {
  notEmpty?: boolean;
  minLength?: number;
  maxLength?: number;
  email?: boolean;
  password?: boolean;
}

// Configuration for a field whose value is derived from other fields.
export interface DerivedConfig {
  enabled: boolean;
  parents: string[];
  formula: string;
}

// Represents the base properties common to all form fields.
export interface FormFieldBase {
  id: string;
  name: string;
  type: FieldType;
  label: string;
  required: boolean;
  defaultValue?: any;
  validations: ValidationRules;
  derived?: DerivedConfig;
}

// Represents a form field that includes a list of options, such as a select, radio, or checkbox group.
export interface OptionField extends FormFieldBase {
  options?: string[];
}

// A union type representing any possible form field.
export type FormField = FormFieldBase | OptionField;

// Defines the structure of a complete form schema, including its metadata and fields.
export interface FormSchema {
  id: string;
  name: string;
  createdAt: string;
  fields: FormField[];
}
