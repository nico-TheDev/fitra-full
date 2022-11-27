import create from 'zustand';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { auth, db } from '../firebase.config';
import { Alert } from 'react-native';

const useAuthentication = create(set => ({
    user:{},
    setUser: (data) => set({user: data}),
    addUser: async (newUser) => {
        try {
            console.log(newUser);
            const createdUser = await createUserWithEmailAndPassword(auth, newUser.email, newUser.password);   //creates user
            await updateProfile(auth.currentUser, {
                displayName: newUser.firstName + " " + newUser.lastName,    //updates displayName
                photoURL:  newUser.profile_img,                             //updates photoURL
            })
            await setDoc(doc(db, "users", createdUser.user.uid), {      //sets document of user
                uid: createdUser.user.uid,                              //generated uid
                first_Name: newUser.firstName,                  //fetched data from firstName (RegisterScreen) will be stored here
                last_Name: newUser.lastName,                    //fetched data from lastName (RegisterScreen) will be stored here
                email: newUser.email,                           //fetched data from email (RegisterScreen) will be stored here
                profile_img_ref: newUser.profile_img_ref,       //fetched data from profile_img (RegisterScreen) will be stored here
                profile_img: newUser.profile_img                //fetched data from profile_img (RegisterScreen) will be stored here
            });             
            Alert.alert('Status', 'User created. Sign in success.');
            console.log(createdUser);
            set({
                user: {     //sets user credentials
                    email: createdUser.email,
                    name: createdUser.displayName,
                    user_id: createdUser.uid,
                    profile_img: createdUser.photoURL
                }, isLoggedIn: true
            })
        }
        catch (err) {
            Alert.alert('Status', 'Failed to create user. Sign in failed.');
            console.log(err);
        }
    },
    verifyUser: async (login_user) => {
        try {
            console.log(login_user);
            const verifiedUser = await signInWithEmailAndPassword(auth, login_user.email, login_user.password);     //checks if user is registered, email and password correct
            Alert.alert('Status', 'Email and password correct. Login success.');
            console.log(verifiedUser);
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
            Alert.alert('Status', 'Email and password incorrect. Login failed.');
            console.log(err);
        }
    },
    logoutUser: async () => {
        try{
            await signOut(auth);    // signs out current user
            Alert.alert('Status', 'User is logged out.');
            set({
                user: {       //sets credentials to empty string
                    email: '',
                    name: '',
                    user_id: '',
                    profile_img: ''
                }, isLoggedIn: false, isOnboardRead: true
            })
        }
        catch(err){
            Alert.alert('Status', 'Failed to log out.');
            console.log(err);
        }
    }
}));

export default useAuthentication;