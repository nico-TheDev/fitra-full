import { createContext, useContext } from "react";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    const value = {};
    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
};

const useGlobal = () => {
    const context = useContext(GlobalContext);

    if (context === undefined) {
        throw new Error("useGlobal must be used within a GlobalProvider");
    }
};

export { GlobalProvider, useGlobal };
