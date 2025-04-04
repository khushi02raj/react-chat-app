import { create } from "zustand";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const useUserStore = create((set) => ({
  currentUser: null,   
  fetchUserInfo: async (uid) => {
    if(!uid)
    {
        set({currentUser:null});
        return;
    }
    try{
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            set({currentUser:docSnap.data()});
        } else {
            console.log("No such document!");
        }
    }
    catch(err){
        console.log(err);
    }       
    }
}));
export default useUserStore;