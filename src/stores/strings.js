import { defineStore, acceptHMRUpdate } from 'pinia'
import {useAuthStore} from "@/stores/auth";

export const useStringsStore = defineStore({
    id: 'stringsStore',
    state: () => ({
        items: {},
    }),
    actions: {
        async update(key, value) {
            this.items[key] = value;
        },
        async fetch(strings) {
            for (const [key, value] of Object.entries(strings.strings)) {
                this.items[key] = value;
            }
        }
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStringsStore, import.meta.hot))
}
