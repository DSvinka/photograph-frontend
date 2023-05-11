<template>
  <v-app-bar style="height: 64px; position: absolute; top: 0; right: 0; z-index: 9999 !important; background-color: transparent !important;">
    <v-btn icon rounded size="x-large" color="primary" @click="menu = !menu">
      <v-icon>mdi-menu</v-icon>
      <v-tooltip activator="parent" location="bottom">Меню</v-tooltip>
    </v-btn>

    <EditableText element="span" string-key="header_title" class="text-center text-grey-darken-3 text-h6 font-weight-bold mx-auto" model-value="Сайт фотографа"/>
  </v-app-bar>

  <v-dialog
      v-model="menu"
      fullscreen
      transition="dialog-bottom-transition"
      :scrim="false"
      z-index="90"
  >
    <v-card class="d-flex">
      <v-list @click:select="menu=false" density="comfortable" class="justify-center align-self-center text-center mt-16">
        <v-list-item prepend-icon="mdi-view-dashboard" title="Главная" to="/" value="home"/>
        <v-list-item prepend-icon="mdi-forum" title="Портфолио" to="portfolio" value="portfolio"/>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';

import EditableText from "@/components/EditableText.vue";
import {computed, ref} from "vue";

let menu = ref(false);

const authStore = useAuthStore();
const user = computed(() => authStore.user);

const handleLogout = () => {
  authStore.setAuthUser(null);
  document.location.href = '/login';
};
</script>

<style scoped>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform .2s ease-in-out;
}
</style>