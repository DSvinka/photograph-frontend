<template>
  <v-container>
    <v-card-title class="d-flex justify-center mt-10">Отзывы</v-card-title>
    <v-card-actions class="justify-center">
      <dialog-review-create/>
      <dialog-review-update/>
    </v-card-actions>

    <v-row>
      <v-col v-for="n in 30" :key="n" class="d-flex child-flex">
        <v-card variant="outlined" min-width="400" min-height="200">
          <v-card-item>
            <v-card-title>Александр Смирнов</v-card-title>
            <v-card-subtitle>19.02.2006, 19:00</v-card-subtitle>
          </v-card-item>

          <v-card-text>Классный фотограф! Классный фотограф!Классный фотограф!Классный фотограф!Классный фотограф!Классный фотограф!Классный фотограф!Классный фотограф!Классный фотограф!Классный фотограф!Классный фотограф!Классный фотограф!Классный фотограф!Классный фотограф!Классный фотограф!Классный фотограф!Классный фотограф!Классный фотограф!Классный фотограф!Классный фотограф!Классный фотограф!Классный фотограф!Классный фотограф!Классный фотограф!Классный фотограф!Классный фотограф!Классный фотограф!Классный фотограф!Классный фотограф!</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import DialogReviewCreate from "@/components/Dialogs/DialogReviewCreate.vue";
import DialogReviewUpdate from "@/components/Dialogs/DialogReviewUpdate.vue";
</script>

<style scoped>

</style>