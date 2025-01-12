import React from 'react';

const Button = ({
    children,
    type = "button",
    bgColor = "",
    textColor = "bg-blue-600",
    className = "text-white",
    ...props
}) => {
    return (
        <button
        className={`${children} ${bgColor} ${textColor} px-4 py-2 rounded-lg`}
        {...props} >
            {children}
        </button>
    );
};

export default Button;