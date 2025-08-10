import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormSchema } from "@/types/form";
import { loadForms, saveForms } from "@/utils/storage";

// Defines the shape of the state for managing saved forms.
export interface FormsState {
  forms: FormSchema[];
}

// The initial state, populated by loading forms from local storage.
const initialState: FormsState = {
  forms: loadForms(),
};

// A Redux slice for managing the collection of saved forms.
const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    // Adds a new form to the beginning of the list and persists the change.
    addForm: (state, action: PayloadAction<FormSchema>) => {
      state.forms.unshift(action.payload);
      saveForms(state.forms);
    },

    // Deletes a form by its ID and persists the change.
    deleteForm: (state, action: PayloadAction<string>) => {
      state.forms = state.forms.filter((f) => f.id !== action.payload);
      saveForms(state.forms);
    },
  },
});

// Exports the action creators for use in components.
export const { addForm, deleteForm } = formsSlice.actions;

// Exports the reducer to be included in the Redux store.
export default formsSlice.reducer;