<template>
  <portfolio-filter/>

  <v-container>
    <v-card-title class="d-flex justify-center" v-if="albumsStore.currentAlbum">
      {{albumsStore.currentAlbum.title}}
    </v-card-title>

    <v-card-actions v-if="authStore.user.loggedIn && authStore.user.administrator" class="justify-center">
      <dialog-album-create/>
      <dialog-album-update/>
    </v-card-actions>

    <masonry-wall v-if="albumsStore.currentAlbum && albumsStore.currentAlbum.files" id="gallery" :items="albumsStore.currentAlbum.files" :column-width="300" :gap="16" style="width: 100%">
      <template v-slot="{ item, index }">
        <v-hover v-slot="{ isHovering, props }">
          <div class="photoswipe-item fade-in appear">
            <a
                class="my-2"
                :href="item.url"
                :data-pswp-width="item.width"
                :data-pswp-height="item.height"
                itemprop="contentUrl"
                target="_blank"
                rel="noreferrer"
                data-cropped="true"
                v-bind="props"
            >
              <v-img class="d-flex" :src="item.url" alt="" loading="lazy">
                <v-overlay absolute
                           :model-value="isHovering"
                           contained
                           scrim="#036358"
                           class="align-center justify-center"
                >
                  <div class="overlay" style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%">
                    <svg style="width: 50px; height: 50px;" xmlns="http://www.w3.org/2000/svg" viewBox="1 0 22 22">
                      <path d="M22,12a11.6,11.6,0,0,1-10,6A11.6,11.6,0,0,1,2,12,11.6,11.6,0,0,1,12,6,11.6,11.6,0,0,1,22,12Z" fill="none" stroke="#fff" stroke-width="1.5"></path><circle cx="12" cy="12" r="3" fill="none" stroke="#fff" stroke-width="1.5"></circle>
                    </svg>
                  </div>
                </v-overlay>
              </v-img>
            </a>
          </div>
        </v-hover>
      </template>
    </masonry-wall>
  </v-container>
</template>

<script setup>
import PortfolioFilter from "@/components/PortfolioFilter.vue";

import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

import {computed, onBeforeMount, onMounted, onUnmounted, ref, watch} from "vue";
import {useMutation} from "vue-query";
import {useAlbumsStore} from "@/stores/albums.js";
import {fetchAllAlbums} from "@/api/albums.js";
import DialogAlbumCreate from "@/components/Dialogs/DialogAlbumCreate.vue";
import DialogAlbumUpdate from "@/components/Dialogs/DialogAlbumUpdate.vue";
import {useAuthStore} from "@/stores/auth.js";

const albumsStore = useAlbumsStore();
const authStore = useAuthStore();

let lightbox = ref(null);

const mutateAlbums = useMutation(
    (data) => fetchAllAlbums(),
    {
      onSuccess: (data) => {
        albumsStore.fetch(data);
      },
    }
);

watch(() => albumsStore.items, () => {
  if (albumsStore.items && albumsStore.items.length !== 0) {
    albumsStore.setCurrentAlbumById(albumsStore.items[0].id)
  }
})

onMounted(() => {
  mutateAlbums.mutate();

  if (!lightbox.value) {
    lightbox.value = new PhotoSwipeLightbox({
      gallery: '#gallery',
      children: 'a',
      pswpModule: () => import('photoswipe'),
      showHideAnimationType: 'fade',
    });
    lightbox.value.init();
  }
})

onUnmounted(() => {
  if (lightbox.value) {
    lightbox.value.destroy();
    lightbox.value = null;
  }
})
</script>

<style>
@import "@/main.css";
</style>