import create from 'zustand';
import { addDoc, collection, serverTimestamp, deleteDoc, doc, updateDoc } from 'firebase/firestore';

import { db } from 'fitra/firebase.config.js';

const categoriesStore = (set, get) => ({
    categories: [],
    reset: () => set({ categories: [] }),
    setCategories: (data) => set({ categories: data }),
    addCategory: async (newCategory) => {
        try {
            await addDoc(collection(db, "categories"), { ...newCategory, created_at: serverTimestamp() });
            console.log("NEW DOCUMENT CREATED");
        }
        catch (err) {
            console.log("addCategoryError:", err);
        }
    },
    deleteCategory: async (documentId) => {
        // CREATE A REFERENCE FOR THE DOCUMENT AND THE FILE
        const docRef = doc(db, "categories", documentId);
        try {
            // DELETE THE DOCUMENT AND OBJECT 
            await deleteDoc(docRef);
        } catch (err) {
            console.log("deleteCategoryError:", err);
        }

    },
    updateCategory: async (documentId, updatedCategory) => {
        try {
            let docRef;
            // CREATE A REFERENCE TO THE DOCUMENT AND THE FILE
            docRef = doc(db, "categories", documentId);
            await updateDoc(docRef, updatedCategory);
        } catch (err) {
            console.log("updateCategoryError:", err);
        }

    },
    incomeList: (userID) => {
        return get().categories.filter(category => category.category_type === "income");
    },
    expenseList: (userID) => {
        return get().categories.filter(category => category.category_type === "expense");
    },
});


const useCategoriesStore = create(categoriesStore);


export default useCategoriesStore;