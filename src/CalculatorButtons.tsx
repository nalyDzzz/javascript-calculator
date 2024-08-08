import { useAppDispatch } from "./app/hooks";
import {
  handleNumInput,
  handleOperatorInput,
  clearUi,
  evaluate,
  handleDecimal,
} from "./features/CalculatorSlice";


type Buttons = {
  name: string;
  function: (() => void);
  class: string;
  id: string;
};

const CalculatorButtons = () => {

  const dispatch = useAppDispatch();
  


  const calculator: Buttons[] = [
    {
      name: "AC",
      function: () => dispatch(clearUi()),
      class: "col-start-1 col-span-2 row-span-4",
      id: "clear",
    },
    {
      name: "/",
      function: function() { dispatch(handleOperatorInput(this.name)); },
      class: "col-start-3 row-span-4",
      id: "divide",
    },
    {
      name: "x",
      function: function() { dispatch(handleOperatorInput(this.name)); },
      class: "col-start-4 row-span-4",
      id: "multiply",
    },
    {
      name: "7",
      function: function() {dispatch(handleNumInput(this.name))},
      class: "col-start 1 row-span-4",
      id: "seven",
    },
    {
      name: "8",
      function: function() {dispatch(handleNumInput(this.name))},
      class: "col-start-2 row-span-4",
      id: "eight",
    },
    {
      name: "9",
      function: function() {dispatch(handleNumInput(this.name))},
      class: "col-start 3 row-span-4",
      id: "nine",
    },
    {
      name: "-",
      function: function() { dispatch(handleOperatorInput(this.name)); },
      class: "col-start-4 row-span-4",
      id: "subtract",
    },
    {
      name: "4",
      function: function() {dispatch(handleNumInput(this.name))},
      class: "col-start 1 row-span-4",
      id: "four",
    },
    {
      name: "5",
      function: function() {dispatch(handleNumInput(this.name))},
      class: "col-start-2 row-span-4",
      id: "five",
    },
    {
      name: "6",
      function: function() {dispatch(handleNumInput(this.name))},
      class: "col-start 3 row-span-4",
      id: "six",
    },
    {
      name: "+",
      function: function() { dispatch(handleOperatorInput(this.name)); },
      class: "col-start-4 row-span-4",
      id: "add",
    },
    {
      name: "1",
      function: function() {dispatch(handleNumInput(this.name))},
      class: "col-start 1 row-span-4",
      id: "one",
    },
    {
      name: "2",
      function: function() {dispatch(handleNumInput(this.name))},
      class: "col-start-2 row-span-4",
      id: "two",
    },
    {
      name: "3",
      function: function() {dispatch(handleNumInput(this.name))},
      class: "col-start-3 row-span-4",
      id: "three",
    },
    {
      name: "=",
      function: function() {dispatch(evaluate())},
      class: "col-start-4 row-span-8",
      id: "equals",
    },
    {
      name: "0",
      function: function() {dispatch(handleNumInput(this.name))},
      class: "col-start-1 col-span-2 row-span-4",
      id: "zero",
    },
    {
      name: ".",
      function: function() {dispatch(handleDecimal())},
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
      onClick={() => item.function()}
    >
      {item.name}
    </button>
  ));
};

export default CalculatorButtons;
