import { createContext, useContext, useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";
import {auth} from "fitra/firebase.config.js"

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const value = { isLoggedIn, setIsLoggedIn };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("useAuth must be used within a AuthProvider");
    }

    return context;
};

export { AuthProvider, useAuth };
