import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormField } from "@/types/form";

// Defines the shape of the form builder's state.
export interface BuilderState {
  fields: FormField[];
}

// The initial state for the form builder, starting with no fields.
const initialState: BuilderState = {
  fields: [],
};

const builderSlice = createSlice({
  name: "builder",
  initialState,
  reducers: {
    // Clears all fields from the builder, resetting it to the initial state.
    resetBuilder: (state) => {
      state.fields = [];
    },
    // Replaces all fields in the builder with a new set of fields.
    setFields: (state, action: PayloadAction<FormField[]>) => {
      state.fields = action.payload;
    },
    // Adds a new field to the end of the form.
    addField: (state, action: PayloadAction<FormField>) => {
      state.fields.push(action.payload);
    },
    // Updates a specific field by its ID with partial changes.
    updateField: (
      state,
      action: PayloadAction<{ id: string; changes: Partial<FormField> }>
    ) => {
      const idx = state.fields.findIndex((f) => f.id === action.payload.id);
      if (idx >= 0) state.fields[idx] = { ...state.fields[idx], ...action.payload.changes } as FormField;
    },
    // Removes a field from the form by its ID.
    removeField: (state, action: PayloadAction<string>) => {
      state.fields = state.fields.filter((f) => f.id !== action.payload);
    },
    // Moves a field one position up in the list.
    moveFieldUp: (state, action: PayloadAction<string>) => {
      const idx = state.fields.findIndex((f) => f.id === action.payload);
      if (idx > 0) {
        const tmp = state.fields[idx - 1];
        state.fields[idx - 1] = state.fields[idx];
        state.fields[idx] = tmp;
      }
    },
    // Moves a field one position down in the list.
    moveFieldDown: (state, action: PayloadAction<string>) => {
      const idx = state.fields.findIndex((f) => f.id === action.payload);
      if (idx >= 0 && idx < state.fields.length - 1) {
        const tmp = state.fields[idx + 1];
        state.fields[idx + 1] = state.fields[idx];
        state.fields[idx] = tmp;
      }
    },
  },
});

export const {
  resetBuilder,
  setFields,
  addField,
  updateField,
  removeField,
  moveFieldUp,
  moveFieldDown,
} = builderSlice.actions;

export default builderSlice.reducer;
