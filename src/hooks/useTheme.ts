import {useEffect, useState} from "react";

export function useTheme() {
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        if (typeof window !== 'undefined') {
            const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
            if (storedTheme) {
                return storedTheme;
            }
            if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
                return 'dark';
            }
            return 'light';
        }
        return 'light';
    });

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    return {theme, toggleTheme};
}
