<template>
  <v-container>
    <v-card-title class="d-flex justify-center mt-10">Отзывы</v-card-title>
    <v-card-actions class="justify-center">
      <dialog-review-create/>
      <dialog-review-update/>
    </v-card-actions>

    <v-row>
      <v-col v-for="item in reviewsStore.items" :key="item.id" class="d-flex child-flex">
        <v-card variant="outlined" min-width="400" min-height="200">
          <v-card-item>
            <v-card-title>{{item.user.firstName}} {{item.user.familyName}}</v-card-title>
            <v-card-subtitle>{{getLocalDateString(item.lastUpdated)}}</v-card-subtitle>
          </v-card-item>

          <v-card-text>{{item.text}}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import DialogReviewCreate from "@/components/Dialogs/DialogReviewCreate.vue";
import DialogReviewUpdate from "@/components/Dialogs/DialogReviewUpdate.vue";
import {useReviewsStore} from "@/stores/reviews";
import {onMounted, ref, watch} from "vue";
import {useMutation} from "vue-query";
import {fetchAllReviews} from "@/api/reviews";

const reviewsStore = useReviewsStore();

const mutateAlbums = useMutation(
    (data) => fetchAllReviews(),
    {
      onSuccess: (data) => {
        reviewsStore.fetch(data);
      },
    }
);

function getLocalDateString(utcStr) {
  const date = new Date(utcStr);
  return date.getFullYear()
      + '-' + String(date.getMonth() + 1).padStart(2, '0')
      + '-' + String(date.getDate()).padStart(2, '0')
      + ' ' + String(date.getHours()).padStart(2, '0')
      + ':' + String(date.getMinutes()).padStart(2, '0');
}

onMounted(() => {
  mutateAlbums.mutate();
})
</script>

<style scoped>

</style>