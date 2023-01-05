import create from 'zustand';
import firestore, { addDoc, collection, serverTimestamp, deleteDoc, doc, updateDoc, query, where, getDocs, writeBatch, getDoc } from 'firebase/firestore';

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
            const relatedTransactionsRef = collection(db, "transactions");
            const relatedQuery = query(relatedTransactionsRef, where("category_id", "==", documentId));
            const relatedTransactions = await getDocs(relatedQuery);

            const batch = writeBatch(db);

            const accountUpdates = [];

            relatedTransactions.forEach((doc) => {
                const currentTransaction = doc.data();
                const currentUpdate = {
                    account_id: currentTransaction.target_account,
                    income: 0,
                    expense: 0
                };

                // RETURN THE SUBTRACTED AMOUNT
                if (currentTransaction.type === "expense") {
                    currentUpdate.expense = currentUpdate.expense + currentTransaction.amount;
                } else {
                    currentUpdate.income = currentUpdate.income + currentTransaction.amount;
                }

                accountUpdates.push(currentUpdate);
                batch.delete(doc.ref);
            });

            // console.log(accountUpdates);

            // UPDATE THE ACCOUNTS
            for (const update of accountUpdates) {
                const accountRef = doc(db, "accounts", update.account_id);
                const currentAccountResponse = await getDoc(accountRef);
                const currentAccount = currentAccountResponse.data();

                await updateDoc(accountRef, {
                    account_amount: currentAccount.account_amount - update.income + update.expense
                });
            }

            await batch.commit();

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