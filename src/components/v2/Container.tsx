import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  accentColor?: string; // Hex color from 0x000000 to 0xFFFFFF
}

const Container = ({ children, accentColor }: ContainerProps) => {
  const accentRgb = accentColor ? 
    `rgb(${parseInt(accentColor.slice(0, 2), 16)}, ${parseInt(accentColor.slice(2, 4), 16)}, ${parseInt(accentColor.slice(4, 6), 16)})` 
    : undefined;

  return (
    <div 
      className={`bg-neutral p-3 rounded-lg border border-border flex flex-col space-y-1 text-left w-full max-w-2xl relative overflow-hidden ${accentColor ? "border-l-5" : ""}`}
      style={{ borderLeftColor: accentRgb }}
    >
      {children}
    </div>
  )
}

export default Container;