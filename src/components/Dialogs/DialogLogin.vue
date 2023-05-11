<template>
  <v-dialog v-model="openDialog" persistent width="500">
    <template v-slot:activator="{ props }">
      <template v-if="!authStore.user.loggedIn">
        <v-btn color="primary" v-bind="props" size="x-small" variant="text" block>
          Авторизация
        </v-btn>
      </template>

      <template v-else>
        <v-btn color="primary" @click="logout" size="x-small" variant="text" block>
          Выйти
        </v-btn>
      </template>

    </template>

    <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Авторизация</v-toolbar-title>
      </v-toolbar>
      <v-form validate-on="input" @submit.prevent="submit">
        <v-card-text>
          <v-text-field
              type="username"
              autocomplete="username"
              v-model="usernameInput"
              :rules="[rules.required]"
              label="Username"
              required
          ></v-text-field>

          <v-text-field
              type="password"
              autocomplete="current-password"
              v-model="passwordInput"
              :rules="[rules.required]"
              label="Password"
              required
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" type="submit" :disabled="!valid">Авторизироваться</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {onBeforeUpdate, ref} from 'vue';

import { useMutation, useQuery, useQueryClient } from 'vue-query';
import { getMe, loginUser } from '@/api/auth.js';
import { fetchAllStrings } from '@/api/strings.js';
import { createToast } from 'mosha-vue-toastify';

import { useAuthStore } from '@/stores/auth.js';
import rules from "@/plugins/rules.js";

const openDialog = ref(false)
const usernameInput = ref(null)
const passwordInput = ref(null)

const valid = ref(true)

const authStore = useAuthStore();

const authResultMe = useQuery('authUser', () => getMe(), {
  enabled: false,
  retry: 5,
});

const authResultStrings = useQuery('authUser', () => fetchAllStrings(), {
  enabled: false,
  retry: 5,
});

const queryClient = useQueryClient();

const { isLoading, mutate } = useMutation(
    (data) => loginUser(data.username, data.password),
    {
      onError: (error) => {
        if (Array.isArray(error.response.data.error)) {
          error.response.data.error.forEach((el) =>
              createToast(el.message, {
                position: 'top-right',
                type: 'warning',
              })
          );
        } else {
          createToast(error.response.data.message, {
            position: 'top-right',
            type: 'danger',
          });
        }
      },
      onSuccess: (data) => {
        createToast('Вы успешно авторизировались!', {
          position: 'top-right',
        });

        authStore.setAuthUser(data, true);
        authStore.setAuthTokens(data.accessToken, data.refreshToken)
        queryClient.refetchQueries('authUser');

        openDialog.value = false;
      },
    }
);

async function submit(event) {
  const results = await event

  if (!results.valid) return;

  mutate({
    username: usernameInput.value,
    password: passwordInput.value,
  });
}

async function logout() {
  authStore.setAuthUser({}, false);
  authStore.setAuthTokens(null, null)
}
</script>

<style scoped>

</style>