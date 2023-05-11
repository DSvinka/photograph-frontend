<template>
  <portfolio-filter/>

  <v-container>
    <v-card-title class="d-flex justify-center" v-if="album">
      {{album.title}}
    </v-card-title>

    <v-card-actions class="justify-center">
      <dialog-create-album/>
      <dialog-update-album/>
    </v-card-actions>

    <masonry-wall v-if="album" id="gallery" :items="album.files" :column-width="300" :gap="16" style="width: 100%">
      <template v-slot="{ item, index }">
        <v-hover v-slot="{ isHovering, props }">
          <div class="photoswipe-item fade-in appear">
            <a
                class="my-2"
                :href="item.src"
                :data-pswp-width="item.width"
                :data-pswp-height="item.height"
                itemprop="contentUrl"
                target="_blank"
                rel="noreferrer"
                data-cropped="true"
                v-bind="props"
            >
              <v-img class="d-flex" :src="item.src" alt="" loading="lazy">
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
import {fetchAllStrings} from "@/api/strings.js";
import {getMe} from "@/api/auth.js";
import {useAlbumsStore} from "@/stores/albums.js";
import {fetchAllAlbums} from "@/api/albums.js";
import DialogCreateAlbum from "@/components/Dialogs/DialogCreateAlbum.vue";
import DialogUpdateAlbum from "@/components/Dialogs/DialogUpdateAlbum.vue";

const albumsStore = useAlbumsStore();
let album = ref(null)
let lightbox = ref(null);

const mutateAlbums = useMutation(
    (data) => fetchAllAlbums(),
    {
      onSuccess: (data) => {
        albumsStore.fetch(data);
      },
    }
);

onBeforeMount(() => {
  mutateAlbums.mutate();
})

watch(() => albumsStore.currentAlbum, () => {
  album.value = albumsStore.currentAlbum;
})

onMounted(() => {
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