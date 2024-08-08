import { createSlice, PayloadAction } from '@reduxjs/toolkit';



interface CalculatorState {
    value: string;
    concatenatedValue: string;
}

const initialState: CalculatorState = {
    value: '0',
    concatenatedValue: '',
}

export const calculatorSlice = createSlice({
  name: 'calculatorScreen',
  initialState,
  reducers: {
    updateCalculator: (state, action: PayloadAction<string>) => {
        state.value = action.payload
    },
    concatenateCal: (state, action: PayloadAction<string>) => {
      state.concatenatedValue += action.payload
    },
    clearBoth: (state) => {
      state.value = '0';
      state.concatenatedValue = "";
    }
  }
});

export const { updateCalculator, concatenateCal, clearBoth } = calculatorSlice.actions;


export default calculatorSlice.reducer