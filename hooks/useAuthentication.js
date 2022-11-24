import create from 'zustand';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from '../firebase.config';

const useAuthentication = create(set => ({
    user:{},
    setUser: (data) => set({user: data}),
    addUser: async (newUser) => {
        try {
            console.log(newUser);
            const res = await createUserWithEmailAndPassword(auth, newUser.email, newUser.password);   //creates user
            await updateProfile(auth.currentUser, {
                displayName: newUser.firstName + " " + newUser.lastName,    //updates displayName
                photoURL:  newUser.profile_img,                             //updates photoURL
            })
            await setDoc(doc(db, "users", res.user.uid), {      //sets document of user
                uid: res.user.uid,                              //generated uid
                first_Name: newUser.firstName,                  //fetched data from firstName (RegisterScreen) will be stored here
                last_Name: newUser.lastName,                    //fetched data from lastName (RegisterScreen) will be stored here
                email: newUser.email,                           //fetched data from email (RegisterScreen) will be stored here
                profile_img_ref: newUser.profile_img_ref,       //fetched data from profile_img (RegisterScreen) will be stored here
                profile_img: newUser.profile_img                //fetched data from profile_img (RegisterScreen) will be stored here
            });             
            console.log("A NEW USER CREATED");
        }
        catch (err) {
            console.log(err);
        }
    },
    verifyUser: async (login_user) => {
        try {
            console.log(login_user);
            const verifiedUser = await signInWithEmailAndPassword(auth, login_user.email, login_user.password);     //checks if user is registered, email and password correct
            set({
                user: {     //sets user credentials
                    email: verifiedUser.email,
                    name: verifiedUser.displayName,
                    user_id: verifiedUser.uid,
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