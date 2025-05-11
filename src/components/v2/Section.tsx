import React, { ReactNode } from "react";

const Section = ({ children }: { children: ReactNode }) => {
    return (
      <div className="flex justify-between">
        {React.Children.map(children, (child, index) => (
          <div key={index} className="self-start">
            {child}
          </div>
        ))}
      </div>
    );
};

export default Section;