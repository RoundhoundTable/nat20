import { ReactNode } from "react";

const Button = ({children}: {children: ReactNode}) => {
    return (
        <button className="bg-[#F6E3B9] sm:w-80 sm:h-9 w-60 rounded-lg uppercase border border-[#F6E3B9] hover:bg-[#343642] hover:text-[#F6E3B9] text-[#404040] text-xl">{children}</button>
    )
}

export default Button;