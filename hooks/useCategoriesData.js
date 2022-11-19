import create from 'zustand';
import { addDoc, collection, serverTimestamp, deleteDoc, doc, updateDoc } from 'firebase/firestore';

import { db } from 'fitra/firebase.config.js';


const useCategorieData = create(set => ({
    Categories: [],
    setCategories: (data) => set({ Categories: data }),
    addCategorie: async (newCategorie) => {
        try {
            // console.log(newCategorie);
            await addDoc(collection(db, "Categories"), { ...newCategorie, timestamp: serverTimestamp() });
            console.log("NEW DOCUMENT CREATED");
        }
        catch (err) {
            console.log("addCategorieError:", err);
        }
    },
    deleteCategorie: async (documentId, fileReference) => {
        // CREATE A REFERENCE FOR THE DOCUMENT AND THE FILE
        const docRef = doc(db, "Categories", documentId);
        try {
            // DELETE THE DOCUMENT AND OBJECT 
            await deleteDoc(docRef);
            // ALERT A MESSAGE
        } catch (err) {
            console.log("deleteCategorieError:", err);
        }

    },
    updateCategorie: async (documentId, updatedCategorie) => {
        try {
            let docRef;
            // CREATE A REFERENCE TO THE DOCUMENT AND THE FILE
            docRef = doc(db, "Categories", documentId);
            await updateDoc(docRef, updatedCategorie);
        } catch (err) {
            console.log("updateCategorieError:", err);
        }

    }
}));


export default useCategorieData;