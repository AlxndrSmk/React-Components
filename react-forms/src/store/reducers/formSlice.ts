import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SubmitForm } from '../../types/types';

const initialState: { userForms: SubmitForm[] } = {
  userForms: [],
};

export const formSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    setFormData(state, action: PayloadAction<SubmitForm[]>) {
      state.userForms = action.payload;
    },
  },
});

export const { setFormData } = formSlice.actions;
export default formSlice.reducer;
