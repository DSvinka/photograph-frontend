import { defineStore, acceptHMRUpdate } from 'pinia'
import {useAuthStore} from "@/stores/auth";

export const useAlbumsStore = defineStore({
    id: 'albumsStore',
    state: () => ({
        items: [],
        currentAlbum: {}
    }),
    actions: {
        async getById(id) {
            const index = this.items.findIndex((obj) => obj.id === id);
            return this.items[index];
        },
        async update(model) {
            const index = this.items.findIndex((obj) => obj.id === model.id);
            this.items[index] = model;
        },
        async add(model) {
            this.items.push(model);
        },
        async remove(model) {
            this.items = this.items.filter(item => item.id !== model.id)
        },
        async fetch(albums) {
            this.items = albums;
        },
        async setCurrentAlbum(albumId) {
            const index = this.items.findIndex((obj) => obj.id === albumId);
            this.currentAlbum = this.items[index]
        }
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAlbumsStore, import.meta.hot))
}
