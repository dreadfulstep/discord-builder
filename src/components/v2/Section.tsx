import React, { ReactNode } from "react";

const Section = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-between items-center">
      {React.Children.map(children, (child, index) => (
        <div key={index} className="flex items-center h-auto">
          {child}
        </div>
      ))}
    </div>
  );
};

export default Section;