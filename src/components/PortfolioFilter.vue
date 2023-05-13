<template>
  <section class="filter">
    <div class="wrap">
      <ul class="tags">
        <li v-for="album in albumsStore.items" :key="album.id">
          <v-btn variant="text" class="animatelink active" @click="albumsStore.setCurrentAlbumById(album.id)">
            {{album.buttonName}}
          </v-btn>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import {useAlbumsStore} from "@/stores/albums.js";
import {onBeforeMount, ref, watch} from "vue";
import {useMutation} from "vue-query";
import {fetchAllAlbums} from "@/api/albums.js";

const albumsStore = useAlbumsStore();

</script>

<style scoped>

</style>