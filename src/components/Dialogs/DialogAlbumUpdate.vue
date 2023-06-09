<template>
  <v-dialog v-model="openDialog" persistent width="500">
    <template v-slot:activator="{ props }">
      <template v-if="album">
        <v-btn color="primary" v-bind="props" size="small" variant="text">
          Редактировать
        </v-btn>
        <v-btn color="error" @click="removeAlbum" size="small" variant="text">
          Удалить
        </v-btn>
      </template>
    </template>

    <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Изменение Альбома</v-toolbar-title>
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

          <v-divider/>

          <v-card class="elevation-12 px-5 py-5">
            <v-file-input
                label="Изображения альбома"
                @change="onAlbumImagesChange"
                :rules="[rules.required]"
                multiple
                counter
                show-size
                required
            ></v-file-input>

            <v-btn color="primary" @click="submitAlbumFiles" :disabled="albumFilesInput.length === 0">Загрузить Изображения</v-btn>
          </v-card>

          <v-card class="elevation-12 px-5 py-5 mt-3">
            <v-card-title>
              Загруженные изображения:
            </v-card-title>

            <v-row v-if="album && album.files" dense>
              <v-col v-for="albumFile in album.files" :key="albumFile.id" cols="6">
                <v-card>
                  <v-img
                      :src="albumFile.url"
                      class="align-end"
                      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                      height="200px"
                      cover
                  >
                    <v-card-title class="text-white" v-text="albumFile.filename"></v-card-title>
                  </v-img>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn size="small" @click="removeAlbumFile(albumFile)" color="surface-variant" variant="text" icon="mdi-delete"></v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" type="submit" :disabled="!valid">Обновить</v-btn>
          <v-btn color="error" @click="openDialog = false">Отмена</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {onBeforeMount, onMounted, ref, watch} from 'vue';

import { useMutation, useQuery, useQueryClient } from 'vue-query';
import {fetchAllAlbums, fetchByIdAlbum, updateAlbum, deleteAlbum, deleteAlbumFile, uploadAlbumFile} from '@/api/albums.js';
import { createToast } from 'mosha-vue-toastify';

import { useAuthStore } from '@/stores/auth.js';
import rules from "@/plugins/rules.js";
import {useAlbumsStore} from "@/stores/albums.js";
import {onErrorAlert, onSuccessAlert} from "@/utils/errorsAlertUtils.js";
import {loadImageData, loadImagesData} from "@/utils/fileUtils.js";

const openDialog = ref(false)

const buttonNameInput = ref(null)
const titleInput = ref(null)
const descriptionInput = ref(null)

const coverFileInput = ref(null)
const albumFilesInput = ref([])

const album = ref(null)
const valid = ref(true)

const albumsStore = useAlbumsStore();

useQuery('fetchAlbums',
    () => fetchAllAlbums(),
    {
      onSuccess: (data) => albumsStore.fetch(data),
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
        queryClient.refetchQueries('updateAlbum');
        openDialog.value = false;
      })
    }
);

const mutationUploadFile = useMutation(
    (data) => uploadAlbumFile(album.value.id, {
      fileName: data.name, fileType: data.type, fileBytes: data.bytes,
      width: data.width, height: data.height,
    }),
    {
      onError: (error) => onErrorAlert(error),
      onSuccess: (data) => onSuccessAlert("загрузили файлы", () => {
        queryClient.refetchQueries('updateAlbum');
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

function submitAlbumFiles() {
  for (const file of albumFilesInput.value) {
    mutationUploadFile.mutate(file)
  }
}

function removeAlbum() {
  deleteAlbum(album.value.id)

  queryClient.refetchQueries('updateAlbum');
}

function removeAlbumFile(file) {
  deleteAlbumFile(album.value.id, file.id)
  album.value.files = album.value.files.filter(item => item.id !== file.id)
  albumsStore.update(album.value)

  queryClient.refetchQueries('updateAlbum');
}

async function onCoverImageChange(event){
  coverFileInput.value = await loadImageData(event.target.files[0]);
}

async function onAlbumImagesChange(event) {
  albumFilesInput.value = await loadImagesData(event.target.files);
}

watch(() => albumsStore.currentAlbum, () => {
  album.value = albumsStore.currentAlbum;
  if (album.value) {
    buttonNameInput.value = album.value.buttonName
    titleInput.value = album.value.title
    descriptionInput.value = album.value.description
  }
})
</script>

<style scoped>

</style>