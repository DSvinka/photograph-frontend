<template>
  <v-dialog v-model="openDialog" width="500">
    <template v-slot:activator="{ props }">
      <template v-if="!authStore.user.loggedIn">
        <v-btn prepend-icon="mdi-account-plus" color="primary" v-bind="props" variant="text" block>
          Регистрация
        </v-btn>
      </template>
    </template>

    <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Регистрация</v-toolbar-title>
      </v-toolbar>
      <v-form validate-on="input" @submit.prevent="submitRegister">
        <v-card-text>
          <v-text-field
              type="given-name"
              autocomplete="given-name"
              v-model="firstNameInput"
              :rules="[rules.required, rules.length_256]"
              label="Имя"
              required
          ></v-text-field>

          <v-text-field
              type="family-name"
              autocomplete="family-name"
              placeholder="Не обязательное поле"
              v-model="familyNameInput"
              :rules="[rules.required, rules.length_256]"
              label="Фамилия"
              required
          ></v-text-field>

          <v-text-field
              type="username"
              autocomplete="username"
              v-model="emailInput"
              :rules="[rules.required, rules.email, rules.length_256]"
              label="Email"
              required
          ></v-text-field>

          <v-text-field
              type="password"
              autocomplete="new-password"
              v-model="passwordInput"
              :rules="[rules.required]"
              label="Пароль"
              required
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" type="submit" :disabled="!valid">Зарегестрироваться</v-btn>
          <v-btn color="danger" @click="openDialog = false">Отмена</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {onBeforeUpdate, ref} from 'vue';

import { useMutation, useQuery, useQueryClient } from 'vue-query';
import {getMe, loginUser, registerUser} from '@/api/auth.js';

import { useAuthStore } from '@/stores/auth.js';
import rules from "@/plugins/rules.js";
import {onErrorAlert, onSuccessAlert} from "@/utils/errorsAlertUtils.js";
import {createToast} from "mosha-vue-toastify";

const openDialog = ref(false)

const firstNameInput = ref(null)
const familyNameInput = ref(null)
const emailInput = ref(null)
const passwordInput = ref(null)

const valid = ref(true)

const authStore = useAuthStore();

const mutationRegister = useMutation(
    (data) => registerUser(data),
    {
      onError: (error) => onErrorAlert(error),
      onSuccess: (data) => onSuccessAlert("зарегестрировались", () => {
        createToast(`Теперь авторизируйтесь.`, {
          position: 'top-right',
          type: 'success',
        });
        openDialog.value = false;
      })
    }
);

async function submitRegister(event) {
  const results = await event

  if (!results.valid) return;

  mutationRegister.mutate({
    firstName: firstNameInput.value,
    familyName: familyNameInput.value,
    email: emailInput.value,
    password: passwordInput.value
  });
}
</script>

<style scoped>

</style>