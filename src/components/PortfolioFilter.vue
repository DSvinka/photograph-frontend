<template>
  <section class="filter">
    <div class="wrap">
      <ul class="tags">
        <li v-for="album in albumsStore.items" :key="album.id">
          <v-btn variant="text" class="animatelink active" @click="albumsStore.setCurrentAlbum(album.id)">
            {{album.buttonName}}
          </v-btn>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import {useAlbumsStore} from "@/stores/albums.js";
import {onBeforeMount, ref} from "vue";
import {useMutation} from "vue-query";
import {fetchAllAlbums} from "@/api/albums.js";

const albumsStore = useAlbumsStore();

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

</script>

<style scoped>

</style>