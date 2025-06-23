'use client';
import React from "react";
import { useTheme } from "next-themes";

interface LogoProps {
    height?: number | string;
    width?: number | string;
}

const Logo: React.FC<LogoProps> = ({ height = 24, width = 24 }) => {
    const { theme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const isDark = theme === "dark";
    const logoSrc = isDark ? "/Dark_Logo.png" : "/Light_Logo.png";

    return (
        <img
            src={logoSrc}
            alt="Ezenda Logo"
            height={height}
            width={width}
            className="flex items-center justify-center"
            style={{ height, width }}
        />
    );
};

export default Logo;