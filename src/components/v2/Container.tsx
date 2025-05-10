import { ReactNode } from "react";

const Container = ({ children } : { children: ReactNode }) => {
    return (
        <div className="bg-neutral p-2 bg-clip-border rounded-lg bg-origin-padding flex flex-col text-left border-border border-[1px]">
            {children}
        </div>
    )
}

export default Container;