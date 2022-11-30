import create from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { auth, db } from '../firebase.config';

const authStore = (set) => ({
    user: {
        email: "",
        name: "",
        user_id: "",
        profile_img: ""
    },
    setUser: (data) => set({ user: data }),
    addUser: async (newUser) => {
        try {
            const createdUserResponse = await createUserWithEmailAndPassword(auth, newUser.email, newUser.password);   //creates user
            await updateProfile(auth.currentUser, {
                displayName: newUser.firstName + " " + newUser.lastName,    //updates displayName
                photoURL: newUser.profile_img,                             //updates photoURL
            });
            await setDoc(doc(db, "users", createdUserResponse.user.uid), {      //sets document of user
                uid: createdUserResponse.user.uid,                              //generated uid
                first_Name: newUser.firstName,                  //fetched data from firstName (RegisterScreen) will be stored here
                last_Name: newUser.lastName,                    //fetched data from lastName (RegisterScreen) will be stored here
                email: newUser.email,                           //fetched data from email (RegisterScreen) will be stored here
                profile_img_ref: newUser.profile_img_ref,       //fetched data from profile_img (RegisterScreen) will be stored here
                profile_img: newUser.profile_img                //fetched data from profile_img (RegisterScreen) will be stored here
            });
            const createdUser = {     //sets user credentials
                email: createdUserResponse.user.email,
                name: createdUserResponse.user.displayName,
                user_id: createdUserResponse.user.uid,
                profile_img: createdUserResponse.user.photoURL
            };
            console.log(createdUserResponse);
            console.log(createdUser);
            set({
                user: createdUser, isLoggedIn: true
            });
            Alert.alert('Status', 'User created. Sign in success.');

        }
        catch (err) {
            Alert.alert('Status', 'Failed to create user. Sign in failed.');
            console.log(err);
        }
    },
    verifyUser: async (login_user) => {
        try {
            const verifiedResponse = await signInWithEmailAndPassword(auth, login_user.email, login_user.password);     //checks if user is registered, email and password correct
            const verifiedUser = verifiedResponse.user;
            console.log(verifiedResponse);
            const userProfile = {
                user: {     //sets user credentials
                    email: verifiedUser.email,
                    name: verifiedUser.displayName,
                    user_id: verifiedUser.uid,
                    profile_img: verifiedUser.photoURL
                },
            };
            console.log(userProfile);
            set(userProfile);
            Alert.alert('Status', 'Email and password correct. Login success.');
        }
        catch (err) {
            Alert.alert('Status', 'Email and password incorrect. Login failed.');
            console.log(err);
        }
    },
    logoutUser: async () => {
        try {
            await signOut(auth);    // signs out current user
            Alert.alert('Status', 'User is logged out.');
            set({
                user: {       //sets credentials to empty string
                    email: '',
                    name: '',
                    user_id: '',
                    profile_img: ''
                }
            });
        }
        catch (err) {
            Alert.alert('Status', 'Failed to log out.');
            console.log(err);
        }
    }
});

const useAuthStore = create(
    devtools(
        persist(
            authStore,
            {
                name: "user",
                getStorage: () => AsyncStorage
            }
        )
    )
);

export default useAuthStore;


