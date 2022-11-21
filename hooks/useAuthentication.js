import create from 'zustand';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../firebase.config';

const useAuthentication = create(set => ({
    user:{},
    setUser: (data) => set({user: data}),
    addUser: async (newUser) => {
        try {
            console.log(newUser);
            const res = await createUserWithEmailAndPassword(auth, newUser.email, newUser.password);   //creates user
            await setDoc(doc(db, "users", res.user.uid), {      //sets document of user
                uid: res.user.uid,
                user_id: newUser.user_id,                  //generate unique id
                first_Name: newUser.firstName,      //fetched data from firstName (RegisterScreen) will be stored here
                last_Name: newUser.lastName,        //fetched data from lastName (RegisterScreen) will be stored here
                email: newUser.email,               //fetched data from email (RegisterScreen) will be stored here
                profile_img_ref: newUser.profile_img_ref,
                profile_img: newUser.profile_img
            });             
            console.log("A NEW USER CREATED");
        }
        catch (err) {
            console.log(err);
        }
    },
    verifyUser: async (currentUser) => {
        try {
            console.log(currentUser);
            const verifiedUser = await signInWithEmailAndPassword(auth, currentUser.email, currentUser.password);     //checks if user is registered, email and password correct
            console.log(verifiedUser);
            set({
                user: {
                    email: verifiedUser.email,
                    name: verifiedUser.displayName,
                    user_id: verifiedUser.localId,
                    profile_img: verifiedUser.photoURL
                }, isLoggedIn: true
            })
        }
        catch (err) {
            console.log(err);
        }
    },
}));

export default useAuthentication;