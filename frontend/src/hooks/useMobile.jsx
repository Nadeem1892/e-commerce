import { useEffect, useState } from "react";

// Define the return type of the hook: [boolean]
const useMobile = (breakpoint = 768) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

    const handleResize = () => {
        const checkpoint = window.innerWidth < breakpoint;
        setIsMobile(checkpoint);
    };

    useEffect(() => {
        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return [isMobile]; // Return the state in an array
};

export default useMobile;
