import { ReactNode } from "react";

const Button = ({children}: {children: ReactNode}) => {
    return (
        <button className="bg-primary-500 sm:w-80 sm:h-9 w-60 rounded-lg uppercase border border-primary-500 hover:bg-background-500 text-background-500 hover:text-primary-500 text-xl">{children}</button>
    )
}

export default Button;