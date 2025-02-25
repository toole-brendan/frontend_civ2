import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PropertyState {
  properties: any[];
  loading: boolean;
  error: string | null;
}

const initialState: PropertyState = {
  properties: [],
  loading: false,
  error: null,
};

export const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    setProperties: (state, action: PayloadAction<any[]>) => {
      state.properties = action.payload;
    },
    addProperty: (state, action: PayloadAction<any>) => {
      state.properties.push(action.payload);
    },
    updateProperty: (state, action: PayloadAction<{ id: string; data: any }>) => {
      const { id, data } = action.payload;
      const index = state.properties.findIndex(prop => prop.id === id);
      if (index !== -1) {
        state.properties[index] = { ...state.properties[index], ...data };
      }
    },
    deleteProperty: (state, action: PayloadAction<string>) => {
      state.properties = state.properties.filter(prop => prop.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setProperties,
  addProperty,
  updateProperty,
  deleteProperty,
  setLoading,
  setError,
} = propertySlice.actions;

export default propertySlice.reducer; 