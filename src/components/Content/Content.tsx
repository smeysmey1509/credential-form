import React from "react";
import "./Content.css";
import Authentication from "../../pages/Authentication";

const Content = () => {
  return (
    <div className="w-full h-screen flex flex-col gap-4 p-6">
      <div className="w-full flex items-center justify-between max-h-1/2">
        <div>
          <ol className="breadcrumb flex list-none p-0 items-center gap-2 text-sm font-bold">
            <li className="cursor-pointer">Apps</li>
            <li className="cursor-pointer">Task</li>
            <li className="cursor-pointer">Test</li>
          </ol>
          <h2 className="text-xl font-bold">Hello</h2>
        </div>
        <div>B</div>
      </div>
      <Authentication />
    </div>
  );
};

export default Content;
