import React from "react";
import cn from "classnames";

const Button_Component = ({
  type = "button",
  buttonText = "",
  buttonClass = "",
  onClick = null,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "bg-slate-800 hover:bg-slate-900 text-white rounded-md px-5 py-2",
        {
          [buttonClass]: !!buttonClass,
        }
      )}
      type={type}
    >
      {buttonText}
    </button>
  );
};

export default Button_Component;
