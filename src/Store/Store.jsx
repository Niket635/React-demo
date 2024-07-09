import { create } from 'zustand'
import { devtools } from "zustand/middleware";
import { produce } from "immer";

const Store = create(

    devtools((set, get) => ({
  
        data: '',
       
        auth: (payload) => {
            set(
                produce((draft) => {
                    draft.data = payload;
                })
            );
        },
        token: "",
        tokenFunction: (payload) => {
            set(
                produce((draft) => {
                    draft.token = payload;
                })
            );
        },
    }))

);

export default Store;