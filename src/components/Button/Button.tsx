import React from "react";
import "./Button.css";

const Button = () => {
  return (
    <div className="flex flex-col gap-5 items-center justify-center p-10">
      <button className="button--primary-sm-default">Button</button>
      <button className="button--primary-md-default">Button</button>
      
      <button className="button--primary-lg-default">Button</button>
    </div>
  );
};

export default Button;
