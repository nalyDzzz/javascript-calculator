import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CalculatorState {
  currVal: string;
  fullValueDisplay: string;
  prevVal: string | number;
  isEvaluated: boolean;
}

const initialState: CalculatorState = {
  currVal: "0",
  fullValueDisplay: "",
  prevVal: "0",
  isEvaluated: false,
};

const operatorRegex = /[x/+-]/;
const endsWithOperator = /[x+-/]$/;
const endsWithNegative = /\d[x/+-]{1}-$/;

export const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    handleNumInput: (state, action: PayloadAction<string>) => {
      console.log(action.payload);
      if (!state.currVal.includes("Limit")) {
        state.isEvaluated = false;
        if (state.currVal.length > 21) {
          calculatorSlice.actions.maxDigitWarning();
        } else if (state.isEvaluated) {
          state.currVal = action.payload;
          state.fullValueDisplay = action.payload !== "0" ? action.payload : "";
        } else {
          state.currVal =
            state.currVal === "0" || operatorRegex.test(state.currVal)
              ? action.payload
              : state.currVal + action.payload;
          state.fullValueDisplay =
            state.currVal === "0" && action.payload === "0"
              ? state.fullValueDisplay === ""
                ? action.payload
                : state.fullValueDisplay
              : /([^.0-9]0|^0)$/.test(state.fullValueDisplay)
              ? state.fullValueDisplay.slice(0, -1) + action.payload
              : state.fullValueDisplay + action.payload;
        }
      }
    },
    handleOperatorInput: (state, action: PayloadAction<string>) => {
      const operator = action.payload;

      if (state.isEvaluated) {
        state.fullValueDisplay = state.prevVal + operator;
        state.currVal = operator;
        state.isEvaluated = false;
      } else if (endsWithOperator.test(state.fullValueDisplay)) {
        if (endsWithNegative.test(state.fullValueDisplay)) {
          if (operator !== "-") {
            state.fullValueDisplay = state.prevVal + operator;
            state.currVal = operator;
          }
        } else {
          state.fullValueDisplay =
            (endsWithNegative.test(state.fullValueDisplay + operator)
              ? state.fullValueDisplay
              : state.prevVal) + operator;
          state.currVal = operator;
        }
      } else {
        state.prevVal = state.fullValueDisplay;
        state.fullValueDisplay += operator;
        state.currVal = operator;
      }
    },
    clearUi: (state) => {
      state.currVal = "0";
      state.fullValueDisplay = "";
      state.prevVal = "0";
      state.isEvaluated = false;
    },
    evaluate: (state) => {
      if (!state.currVal.includes("Limit")) {
        let expression = state.fullValueDisplay;

        for (; endsWithOperator.test(expression); )
          expression = expression.slice(0, -1);

        expression = expression
          .replace(/x/g, "*")
          .replace(/-/g, "-")
          .replace("--", "-");

        let answer = Math.round(1e12 * eval(expression)) / 1e12;

        state.currVal = answer.toString();
        state.fullValueDisplay =
          expression
            .replace(/\*/g, "⋅") // Replace '*' with '⋅' for display
            .replace(/-/g, "-")
            .replace(/(x|\/|\+)-/, "$1-")
            .replace(/^-/, "-") +
          "=" +
          answer;
        state.prevVal = answer;
        state.isEvaluated = true;
      }
    },
    handleDecimal: (state) => {
      if (state.isEvaluated === true) {
        state.currVal = "0.";
        state.fullValueDisplay = "0.";
        state.isEvaluated = false;
      } else if (
        !state.currVal.includes(".") &&
        !state.currVal.includes("Limit")
      ) {
        state.isEvaluated = false;

        if (state.currVal.length > 21) {
          calculatorSlice.actions.maxDigitWarning();
        } else if (
          endsWithOperator.test(state.fullValueDisplay) ||
          (state.currVal === "0" && state.fullValueDisplay === "")
        ) {
          state.currVal = "0.";
          state.fullValueDisplay = state.fullValueDisplay + "0.";
        } else {
          const match = state.fullValueDisplay.match(/(-?\d+\.?\d*)$/);
          state.currVal = match ? match[0] + "." : "";
          state.fullValueDisplay = state.fullValueDisplay + ".";
        }
      }
    },
    maxDigitWarning: (state) => {
      state.currVal = "Digit Limit!";
      state.prevVal = state.currVal;
    },
  },
});

export const {
  handleNumInput,
  handleOperatorInput,
  clearUi,
  evaluate,
  handleDecimal,
  maxDigitWarning,
} = calculatorSlice.actions;

export default calculatorSlice.reducer;
