import create from 'zustand';
import { addDoc, collection } from 'firebase/firestore';

import { db } from 'fitra/firebase.config.js';

const useAuthentication = create(set => ({
    user:[],
    setUser: (data) => set({user: data}),
    addUser: async (newUser) => {
        try {
            console.log(newUser);
            const res = await createUserWithEmailAndPassword(auth, newUser.email, newUser.password);
            await addDoc(collection(db, "users"), newUser);
            console.log("NEW DOCUMENT CREATED");
        }
        catch (err) {
            console.log(err);
        }
    }
}));