import React from "react";

type Props = {

};

const Header = (props: Props) => {
  return (
    <header>
      <h1 className="text-center text-4xl font-bold text-slate-800 dark:text-slate-200">
        JavaScript Calculator
      </h1>
      <p className="text-center text-sm text-slate-800 dark:text-slate-300 mt-1">
        This was made using React, Redux, TypeScript, Tailwind, etc.
      </p>
    </header>
  );
};

export default Header;

