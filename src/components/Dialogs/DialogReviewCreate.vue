<template>
  <v-dialog v-model="openDialog" persistent width="500">
    <template v-slot:activator="{ props }">
      <v-btn v-if="authStore.user.loggedIn && !authStore.user.review" color="primary" v-bind="props" variant="outlined">
        Написать Отзыв
      </v-btn>
    </template>

    <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Написать Отзыв</v-toolbar-title>
      </v-toolbar>

      <v-form validate-on="input" @submit.prevent="submitReview">
        <v-card-text>
          <v-text-field
              label="Текст отзыва"
              v-model="textInput"
              :rules="[rules.required, rules.length_1024]"
              :counter="1024"
              required
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" type="submit" :disabled="!valid">Создать</v-btn>
          <v-btn color="error" @click="openDialog = false">Отмена</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {ref} from 'vue';

import { useMutation, useQuery, useQueryClient } from 'vue-query';
import {fetchAllReviews, addReview} from '@/api/reviews.js';

import rules from "@/plugins/rules.js";
import {onErrorAlert, onSuccessAlert} from "@/utils/errorsAlertUtils.js";
import {useReviewsStore} from "@/stores/reviews.js";
import {useAuthStore} from "@/stores/auth.js";
import {getMe} from "@/api/auth.js";

const authStore = useAuthStore()

const valid = ref(true)
const openDialog = ref(false)

const textInput = ref(null)

const reviewsStore = useReviewsStore();

useQuery('fetchReviews',
    () => fetchAllReviews(),
    {
      onSuccess: (data) => reviewsStore.fetch(data),
      onError: (error) => onErrorAlert(error),
      enabled: false, retry: 5,
    }
);

useQuery('fetchUser',
    () => getMe(),
    {
      onSuccess: (data) => authStore.setAuthUser(data, true),
      onError: (error) => onErrorAlert(error),
      enabled: false, retry: 5,
    }
);

const queryClient = useQueryClient();

const mutationCreate = useMutation(
    (data) => addReview({
      text: data.text
    }),
    {
      onError: (error) => onErrorAlert(error),
      onSuccess: (data) => onSuccessAlert("отправили отзыв", () => {
        queryClient.refetchQueries('fetchReviews');
        openDialog.value = false;
      })
    }
);

async function submitReview(event) {
  const results = await event

  if (!results.valid)
    return;

  mutationCreate.mutate({
    text: textInput.value,
  });
}
</script>

<style scoped>

</style>