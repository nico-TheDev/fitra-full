import create from 'zustand';
import { addDoc, collection, serverTimestamp, deleteDoc, doc, updateDoc } from 'firebase/firestore';

import { db } from 'fitra/firebase.config.js';


const useCategoriesData = create(set => ({
    Categories: [],
    setCategories: (data) => set({ Categories: data }),
    addCategory: async (newCategory) => {
        try {
            // console.log(newCategorie);
            await addDoc(collection(db, "Categories"), { ...newCategory, timestamp: serverTimestamp() });
            console.log("NEW DOCUMENT CREATED");
        }
        catch (err) {
            console.log("addCategoryError:", err);
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
            console.log("deleteCategoryError:", err);
        }

    },
    updateCategorie: async (documentId, updatedCategory) => {
        try {
            let docRef;
            // CREATE A REFERENCE TO THE DOCUMENT AND THE FILE
            docRef = doc(db, "Categories", documentId);
            await updateDoc(docRef, updatedCategory);
        } catch (err) {
            console.log("updateCategoryError:", err);
        }

    }
}));


export default useCategoriesData;