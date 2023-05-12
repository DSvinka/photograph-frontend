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

      <v-form validate-on="input" @submit.prevent="submitAlbum">
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
              @change="onCoverImageChange"
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
import {fetchAllAlbums, addAlbum, updateAlbum} from '@/api/albums.js';
import { createToast } from 'mosha-vue-toastify';

import { useAuthStore } from '@/stores/auth.js';
import rules from "@/plugins/rules.js";
import {useAlbumsStore} from "@/stores/albums.js";
import {onErrorAlert, onSuccessAlert} from "@/api/errorsAlertUtil.js";
import {loadImageData} from "@/utils/fileUtils.js";

const valid = ref(true)
const openDialog = ref(false)

const buttonNameInput = ref(null)
const titleInput = ref(null)
const descriptionInput = ref(null)

const coverFileInput = ref(null)

const albumsStore = useAlbumsStore();

useQuery('fetchAlbums', () => {
    let data = fetchAllAlbums();
    albumsStore.fetch(data);
  }, {
    onError: (error) => onErrorAlert(error),
    enabled: false, retry: 5,
  }
);

const queryClient = useQueryClient();

const mutationUpdate = useMutation(
    (data) => updateAlbum(album.value.id, {
      buttonName: data.buttonName,
      title: data.title, description: data.description,
      coverFileName: data.coverFile.name, coverFileType: data.coverFile.type, coverFileBytes: data.coverFile.bytes,
      coverFileWidth: data.coverFile.width, coverFileHeight: data.coverFile.height
    }),
    {
      onError: (error) => onErrorAlert(error),
      onSuccess: (data) => onSuccessAlert("обновили альбом", () => {
        queryClient.refetchQueries('fetchAlbums');
        openDialog.value = false;
      })
    }
);

async function submitAlbum(event) {
  const results = await event

  if (!results.valid)
    return;

  mutationUpdate.mutate({
    buttonName: buttonNameInput.value,
    title: titleInput.value, description: descriptionInput.value,
    coverFile: coverFileInput.value
  });
}

async function onCoverImageChange(event){
  coverFileInput.value = await loadImageData(event.target.files[0]);
}
</script>

<style scoped>

</style>