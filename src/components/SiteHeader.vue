<template>
  <v-bottom-navigation color="teal" grow>
    <v-btn to="/" value="home" size="x-small">
      <v-icon>mdi-view-dashboard</v-icon>
      Главная
    </v-btn>
    <v-btn to="portfolio" value="portfolio" size="x-small">
      <v-icon>mdi-forum</v-icon>
      Портфолио
    </v-btn>
    <v-btn to="reviews" value="reviews" size="x-small">
      <v-icon>mdi-message-draw</v-icon>
      Отзывы
    </v-btn>

    <dialog-login/>
  </v-bottom-navigation>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';

import EditableText from "@/components/EditableText.vue";
import {computed, ref} from "vue";
import DialogLogin from "@/components/Dialogs/DialogLogin.vue";
import DialogRegister from "@/components/Dialogs/DialogRegister.vue";

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