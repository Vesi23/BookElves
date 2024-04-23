

import React from "react";

interface ButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
    color?: string;
    id?: string;
    className?: string;
}


const Button: React.FC<ButtonProps> = ({ children = null, onClick = () => { }, color = "", id = '', className = '' }) => {

    return (
        <>
            <button
                id={id} className={className}
                style={color ? { border: `2px solid ${color}` } : undefined}
                onClick={onClick}>{children}
            </button>
        </>
    );
};

export default Button;
