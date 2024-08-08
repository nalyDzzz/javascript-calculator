import React, { useState } from "react";
import { useAppDispatch } from "./app/hooks";
import {
  updateCalculator,
  concatenateCal,
  clearBoth,
} from "./features/CalculatorSlice";
import { useAppSelector } from "./app/hooks";

type Buttons = {
  name: string;
  function: (() => null) | null;
  class: string;
  id: string;
};

const CalculatorButtons = () => {

  const dispatch = useAppDispatch();
  const concatenatedValue = useAppSelector(
    (state) => state.calculator.concatenatedValue
  );
  const calculatorValue = useAppSelector((state) => state.calculator.value);

  const [currentValue, setCurrentValue] = useState("");
  const [previousValue, setPreviousValue] = useState("");
  const [operator, setOperator] = useState("");

  const dispatchToBothScreens = (sign: string) => {
    dispatch(updateCalculator(sign));
    dispatch(concatenateCal(sign));
  };

  const handleClick = (e: string) => {

    dispatchToBothScreens(e);

    console.log(e)
    const numberRegex = /\d+(\.\d+)?/;
    const operatorRegex = /[x/+\-]/;

    if (e === "AC") {
      dispatch(clearBoth());
      setCurrentValue("");
      setPreviousValue("");
      setOperator("");
    } else if (e === "=") {
      if (currentValue && previousValue && operator) {
        const result = evaluate();
        setCurrentValue(result);
        setPreviousValue("");
        setOperator("");
        dispatchToBothScreens(result);
        //dispatch(updateCalculator(result));
      }
    } else if (operatorRegex.test(e)) {
      setOperator(e);
      setPreviousValue(currentValue);
      setCurrentValue("");
    } else if (numberRegex.test(e) || e === ".") {
      if (e === "." && currentValue.includes(".")) {
        return; // Prevent multiple decimal points
      }
      setCurrentValue(currentValue + e);
    }
  };

  const evaluate = () => {
    const num1 = parseFloat(previousValue);
    const num2 = parseFloat(currentValue);
    let result = 0;

    switch (operator) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "x":
        result = num1 * num2;
        break;
      case "/":
        result = num1 / num2;
        break;
      default:
        break;
    }

    return result.toString();
  };

  const calculator: Buttons[] = [
    {
      name: "AC",
      function: null,
      class: "col-start-1 col-span-2 row-span-4",
      id: "clear",
    },
    {
      name: "/",
      function: null,
      class: "col-start-3 row-span-4",
      id: "divide",
    },
    {
      name: "x",
      function: null,
      class: "col-start-4 row-span-4",
      id: "multiply",
    },
    {
      name: "7",
      function: null,
      class: "col-start 1 row-span-4",
      id: "seven",
    },
    {
      name: "8",
      function: null,
      class: "col-start-2 row-span-4",
      id: "eight",
    },
    {
      name: "9",
      function: null,
      class: "col-start 3 row-span-4",
      id: "nine",
    },
    {
      name: "-",
      function: null,
      class: "col-start-4 row-span-4",
      id: "subtract",
    },
    {
      name: "4",
      function: null,
      class: "col-start 1 row-span-4",
      id: "four",
    },
    {
      name: "5",
      function: null,
      class: "col-start-2 row-span-4",
      id: "five",
    },
    {
      name: "6",
      function: null,
      class: "col-start 3 row-span-4",
      id: "six",
    },
    {
      name: "+",
      function: null,
      class: "col-start-4 row-span-4",
      id: "add",
    },
    {
      name: "1",
      function: null,
      class: "col-start 1 row-span-4",
      id: "one",
    },
    {
      name: "2",
      function: null,
      class: "col-start-2 row-span-4",
      id: "two",
    },
    {
      name: "3",
      function: null,
      class: "col-start-3 row-span-4",
      id: "three",
    },
    {
      name: "=",
      function: null,
      class: "col-start-4 row-span-8",
      id: "equals",
    },
    {
      name: "0",
      function: null,
      class: "col-start-1 col-span-2 row-span-4",
      id: "zero",
    },
    {
      name: ".",
      function: null,
      class: "col-start-3 row-span-4",
      id: "decimal",
    },
  ];

  return calculator.map((item) => (
    <button
      type="button"
      className={
        "btn rounded text-2xl text-white font-semibold bg-emerald-600 " +
        item.class
      }
      id={item.id}
      key={item.name}
      onClick={() => handleClick(item.name)}
    >
      {item.name}
    </button>
  ));
};

export default CalculatorButtons;
