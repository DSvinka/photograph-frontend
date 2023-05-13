<template>
  <v-dialog v-model="openDialog" persistent width="500">
    <template v-slot:activator="{ props }">
      <template v-if="!authStore.user.loggedIn">
        <v-btn prepend-icon="mdi-login" color="primary" v-bind="props" variant="text" block>
          Авторизация
        </v-btn>
      </template>

      <template v-else>
        <v-btn prepend-icon="mdi-logout" color="error" @click="logout" variant="text" block>
          Выйти
        </v-btn>
      </template>

    </template>

    <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Авторизация</v-toolbar-title>
      </v-toolbar>
      <v-form validate-on="input" @submit.prevent="submitLogin">
        <v-card-text>
          <v-text-field
              type="username"
              autocomplete="username"
              v-model="emailInput"
              :rules="[rules.required]"
              label="Email"
              required
          ></v-text-field>

          <v-text-field
              type="password"
              autocomplete="current-password"
              v-model="passwordInput"
              :rules="[rules.required]"
              label="Пароль"
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
import {onErrorAlert, onSuccessAlert} from "@/utils/errorsAlertUtils.js";


const valid = ref(true)
const openDialog = ref(false)

const emailInput = ref(null)
const passwordInput = ref(null)

const authStore = useAuthStore();

useQuery('fetchUser',
    () => getMe(),
    {
      onSuccess: (data) => authStore.setAuthUser(data, true),
      onError: (error) => onErrorAlert(error),
      enabled: false, retry: 5,
    }
);

const queryClient = useQueryClient();

const mutationLogin = useMutation(
    (data) => loginUser(data.email, data.password),
    {
      onError: (error) => onErrorAlert(error),
      onSuccess: (data) => onSuccessAlert("авторизовались", () => {
        authStore.setAuthUser(data, true);
        authStore.setAuthTokens(data.accessToken, data.refreshToken)
        queryClient.refetchQueries('checkAuthUser');

        openDialog.value = false;
      })
    }
);

async function submitLogin(event) {
  const results = await event

  if (!results.valid) return;

  mutationLogin.mutate({
    email: emailInput.value,
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