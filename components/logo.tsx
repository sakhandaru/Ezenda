'use client';
import React from "react";

interface LogoProps {
    height?: number | string;
    width?: number | string;
}

const Logo: React.FC<LogoProps> = ({ height = 24, width = 24 }) => (
    <img
        src="/Dark_Logo.png"
        alt="Ezenda Logo"
        height={height}
        width={width}
        className="flex items-center justify-center"
        style={{ height, width }}
    />
);

export default Logo;