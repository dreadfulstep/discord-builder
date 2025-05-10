import { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
    return (
        <div className="bg-neutral p-3 rounded-lg border border-border flex flex-col text-left w-full max-w-2xl">
            {children}
        </div>
    )
}

export default Container;