import create from 'zustand';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { auth, db } from '../firebase.config';

const useAuthentication = create(set => ({
    user:{},
    setUser: (data) => set({user: data}),
    addUser: async (newUser) => {
        try {
            console.log(newUser);
            const res = await createUserWithEmailAndPassword(auth, newUser.email, newUser.password);
            await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                firstName: newUser.firstName, 
                lastName: newUser.lastName, 
                email: newUser.email});
            console.log("A NEW USER CREATED");
        }
        catch (err) {
            console.log(err);
        }
    },
    verifyUser: async (currentUser) => {
        try {
            console.log(currentUser);
            await signInWithEmailAndPassword(auth, currentUser.email, currentUser.password);
            navigate("/")
            console.log("USER IS PRESENT");
        }
        catch (err) {
            console.log(err);
        }
    },
}));

export function googleSignIn() {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider)
    getRedirectResult(auth)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });
};

export default useAuthentication;