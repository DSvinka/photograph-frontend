<template>
  <v-dialog v-model="openDialog" persistent width="500">
    <template v-slot:activator="{ props }">
      <v-btn color="primary" v-bind="props" size="small" variant="text">
        Создать Альбом
      </v-btn>
    </template>

    <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Создание Альбома</v-toolbar-title>
      </v-toolbar>

      <v-form validate-on="input" @submit.prevent="submit">
        <v-card-text>
          <v-text-field
              label="Наименование кнопки"
              v-model="buttonNameInput"
              :rules="[rules.required]"
              required
          ></v-text-field>

          <v-text-field
              label="Название альбома"
              v-model="titleInput"
              :rules="[rules.required]"
              required
          ></v-text-field>

          <v-text-field
              label="Описание альбома"
              v-model="descriptionInput"
              :rules="[rules.required]"
              required
          ></v-text-field>

          <v-file-input
              label="Обложка альбома"
              @change="onCoverFileChange"
              :rules="[rules.required]"
              show-size
              required
          ></v-file-input>
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
import {onBeforeUpdate, ref} from 'vue';

import { useMutation, useQuery, useQueryClient } from 'vue-query';
import { fetchAllAlbums, addAlbum } from '@/api/albums.js';
import { createToast } from 'mosha-vue-toastify';

import { useAuthStore } from '@/stores/auth.js';
import rules from "@/plugins/rules.js";
import {useAlbumsStore} from "@/stores/albums.js";

const openDialog = ref(false)
const buttonNameInput = ref(null)
const titleInput = ref(null)
const descriptionInput = ref(null)
const coverFileInput = ref(null)
const coverFileData = ref(null)

const valid = ref(true)

const albumsStore = useAlbumsStore();

const resultAlbums = useQuery('addAlbum', () => {
  let data = fetchAllAlbums();
  albumsStore.fetch(data);
}, {
  enabled: false,
  retry: 5,
});

const queryClient = useQueryClient();

const mutation = useMutation(
    (data) => addAlbum({
      buttonName: buttonNameInput.value,
      title: titleInput.value, description: descriptionInput.value,
      coverFileName: coverFileData.value.coverFileName, coverFileType: coverFileData.value.coverFileType,
      coverFileWidth: coverFileData.value.coverFileWidth, coverFileHeight: coverFileData.value.coverFileHeight, coverFileBytes: coverFileInput.value
    }),
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
        createToast('Альбом успешно создан!', {
          position: 'top-right',
        });

        queryClient.refetchQueries('addAlbum');

        openDialog.value = false;
      },
    }
);

async function submit(event) {
  const results = await event

  if (!results.valid) return;

  mutation.mutate();
}



async function onCoverFileChange(event){
  let fileData = event.target.files[0];
  coverFileData.value = {
    coverFileName: fileData.name,
    coverFileType: fileData.name.split('.').at(-1),
  }

  const reader = new FileReader();
  reader.readAsDataURL(fileData);
  reader.onload = () => {
    let image = new Image();
    image.src = reader.result;
    image.onload = function () {
      coverFileInput.value = reader.result.split(',')[1];

      coverFileData.value.coverFileWidth = image.width;
      coverFileData.value.coverFileHeight = image.height;
    }
  };
}
</script>

<style scoped>

</style>