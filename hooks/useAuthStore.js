import { create } from 'zustand';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';
import { doc, setDoc, getDoc, documentId, updateDoc } from 'firebase/firestore';
import Toast from "react-native-toast-message";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    updateEmail,
    updatePassword,
    signOut,
    deleteUser,
} from "firebase/auth";
import { Alert } from "react-native";

import { auth, db } from "../firebase.config";

const authStore = (set) => ({
    user: {
        email: "",
        name: "",
        user_id: "",
        profile_img: "",
    },
    setUser: (data) => set({ user: data }),
    addUser: async (newUser) => {
        try {
            const createdUserResponse = await createUserWithEmailAndPassword(
                auth,
                newUser.email,
                newUser.password
            ); //creates user
            await updateProfile(auth.currentUser, {
                displayName: newUser.firstName + " " + newUser.lastName, //updates displayName
                photoURL: newUser.profile_img, //updates photoURL
            });
            await setDoc(doc(db, "users", createdUserResponse.user.uid), {
                //sets document of user
                uid: createdUserResponse.user.uid, //generated uid
                first_name: newUser.firstName, //fetched data from firstName (RegisterScreen) will be stored here
                last_name: newUser.lastName, //fetched data from lastName (RegisterScreen) will be stored here
                email: newUser.email, //fetched data from email (RegisterScreen) will be stored here
                profile_img_ref: newUser.profile_img_ref, //fetched data from profile_img (RegisterScreen) will be stored here
                profile_img: newUser.profile_img, //fetched data from profile_img (RegisterScreen) will be stored here
            });
            const createdUser = {
                //sets user credentials
                email: createdUserResponse.user.email,
                name: createdUserResponse.user.displayName,
                user_id: createdUserResponse.user.uid,
                profile_img: createdUserResponse.user.photoURL,
            };
            set({
                user: createdUser,
                isLoggedIn: true,
            });
            Toast.show({
                type: "success",
                text1: "User Created",
                text2: "Sign In Successful",
            });
            // Alert.alert("Status", "User created. Sign in success.");
        } catch (err) {
            Toast.show({
                type: "error",
                text1: "Sign In failed",
                text2: "Failed to create user. Try again.",
            });
            // Alert.alert("Status", "Failed to create user. Sign in failed.");
            console.log(err);
        }
    },
    verifyUser: async (login_user) => {
        try {
            const verifiedResponse = await signInWithEmailAndPassword(
                auth,
                login_user.email,
                login_user.password
            ); //checks if user is registered, email and password correct
            const verifiedUser = verifiedResponse.user;
            // console.log(verifiedResponse);
            const userProfile = {
                user: {
                    //sets user credentials
                    email: verifiedUser.email,
                    name: verifiedUser.displayName,
                    user_id: verifiedUser.uid,
                    profile_img: verifiedUser.photoURL,
                },
            };
            // console.log(userProfile);
            set(userProfile);
            Toast.show({
                type: "success",
                text1: "Status",
                text2: "Login successfully",
            });
            // Alert.alert('Status', 'Email and password correct. Login success.');
        } catch (err) {
            Toast.show({
                type: "error",
                text1: "Status",
                text2: "Login Failed. Email or password incorrect.",
            });
            // Alert.alert("Status", "Email and password incorrect. Login failed.");
            console.log(err.message);
        }
    },
    logoutUser: async () => {
        try {
            await signOut(auth); // signs out current user
            // Alert.alert("Status", "User is logged out.");
            Toast.show({
                type: "info",
                text1: "Status",
                text2: "Logged out successfully.",
            });
            set({
                user: {
                    //sets credentials to empty string
                    email: "",
                    name: "",
                    user_id: "",
                    profile_img: "",
                },
            });
        } catch (err) {
            Toast.show({
                type: "error",
                text1: "Status",
                text2: "Failed to logout.",
            });
            // Alert.alert("Status", "Failed to log out.");
            console.log(err);
        }
    },
    getCurrentDocument: async (editUser) => {
        const docRef = doc(db, "users", editUser);
        const document = await getDoc(docRef);

        if (document.exists()) {
            return document.data();
        }
    },
    updateProfileName: async (editUser) => {
        await updateProfile(auth.currentUser, {
            displayName: editUser.new_displayName, //updates displayName
            photoURL: editUser.new_image, //updates photoURL
        });
    },
    updateProfileEmail: async (editUser) => {
        await updateEmail(auth.currentUser, editUser.new_email); //updates email
    },
    updateProfilePassword: async (editUser) => {
        await updatePassword(auth.currentUser, editUser.new_password); //updates password
    },
    updateDocument: async (documentId, updatedDocument) => {
        try {
            const docRef = doc(db, "users", documentId);
            await updateDoc(docRef, updatedDocument);
        } catch (err) {
            console.log("updateDocumentError:", err);
        }
    },
    deleteUser: async () => {
        await deleteUser(auth.currentUser); //delete user
    },
});

const useAuthStore = create(
    devtools(
        persist(
            authStore,
            {
                name: "user",
                storage: createJSONStorage(() => sessionStorage)
            }
        )
    )
);

export default useAuthStore;


