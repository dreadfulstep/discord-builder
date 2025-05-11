import React, { ReactNode, isValidElement } from "react";

interface ActionRowProps {
  children: ReactNode;
}

const ActionRow = ({ children }: ActionRowProps) => {
  const childArray = React.Children.toArray(children).filter(isValidElement);
  const childCount = childArray.length;
  const hasSelectMenu = childArray.some(
    child => child.type === 'select'
  );

  if (hasSelectMenu && childCount > 1) {
    console.warn('ActionRow can only contain 1 select menu component');
    return null;
  }

  if (!hasSelectMenu && childCount > 5) {
    console.warn('ActionRow can contain maximum 5 interactive components');
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {React.Children.map(children, (child, index) => {
        if (!isValidElement(child)) return null;
        
        if (child.type === 'button') {
          return React.cloneElement(child, {
            key: index
          });
        }
        
        if (child.type === 'select') {
          return React.cloneElement(child, {
            key: index
          });
        }

        return React.cloneElement(child, { key: index });
      })}
    </div>
  );
};

export default ActionRow;