import { createContext, useContext } from "react";

import colors from "assets/themes/colors";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const value = { colors };
    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
};

const useTheme = () => {
    const context = useContext(ThemeContext);

    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }

    return context;
};

export { ThemeProvider, useTheme };
