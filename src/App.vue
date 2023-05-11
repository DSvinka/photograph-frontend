<template>
  <v-layout style="font-family: 'JetBrains Mono',serif !important;">
    <site-header/>

    <v-main class="mx-0" style="margin-top: -64px;">
      <div style="min-height: 100vh;">
        <router-view></router-view>
      </div>
      <site-footer/>
    </v-main>
  </v-layout>
</template>

<script setup>
import SiteFooter from "@/components/SiteFooter.vue";
import SiteHeader from "@/components/SiteHeader.vue";
import {useMutation} from "vue-query";
import {fetchAllStrings} from "@/api/strings";
import {createToast} from "mosha-vue-toastify";
import {useStringsStore} from "@/stores/strings.js";
import {onBeforeMount} from "vue";
import {useAuthStore} from "@/stores/auth.js";
import {getMe} from "@/api/auth.js";

const stringsStore = useStringsStore();
const authStore = useAuthStore();

const mutateStrings = useMutation(
    (data) => fetchAllStrings(),
    {
      onSuccess: (data) => {
        stringsStore.fetch(data);
      },
    }
);

const mutateAuth = useMutation(
    (data) => getMe(),
    {
      onSuccess: (data) => {
        authStore.setAuthTokens(localStorage.getItem('access_token'), localStorage.getItem('refresh_token'))
        authStore.setAuthUser(data, true)
      }
    }
);

onBeforeMount(() => {
  mutateAuth.mutate();
  mutateStrings.mutate();
})
</script>

<style scoped lang="scss">
body {
  overflow: hidden !important;
}

body::-webkit-scrollbar {
  display: none; /* for Chrome, Safari, and Opera */
}

.left-top-fade {
  background: linear-gradient(270deg, rgba(0,0,0,0) 0%, rgb(255, 255, 255) 100%), linear-gradient(0deg, rgba(0,0,0,0) 0%, rgb(255, 255, 255) 100%);
}
</style>
