<script setup>
import { marked } from 'marked'
import {computed, onMounted, ref, watch} from 'vue'
import {useAuthStore} from "@/stores/auth.js";
import {useStringsStore} from "@/stores/strings.js";
import {useMutation} from "vue-query";
import {updateString} from "@/api/strings";
import {createToast} from "mosha-vue-toastify";
import {string} from "zod";
import {storeToRefs} from "pinia";

const authStore = useAuthStore();
const stringsStore = useStringsStore();

const props = defineProps(['modelValue', 'element', 'stringKey'])
const emit = defineEmits(['clicked'])

const textElement = ref(null)

const output = computed(() => marked(text.value))
let text = ref("")
let isEdit = ref(false)


const { isLoading, mutate } = useMutation(
    (data) => updateString(props.stringKey, text.value),
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
        isEdit.value = false;
      },
      onSuccess: (data) => {
        createToast('Строка успешно отредактирована!', {
          position: 'top-right',
        });

        stringsStore.update(props.stringKey, text.value);
        isEdit.value = false;
      },
    }
);

onMounted(() => {
  if (stringsStore.items[props.stringKey])
    text.value = stringsStore.items[props.stringKey];
  else
    text.value = props.modelValue;
})

function validate(event) {
  (event.target).blur()
  text.value = textElement.value.innerText.trim()

  mutate();
}

watch(stringsStore.items, () => {
  if (stringsStore.items[props.stringKey])
    text.value = stringsStore.items[props.stringKey];
  else
    text.value = props.modelValue;
})

function toEditMode(event) {
  isEdit.value = true;
}

defineExpose({ textElement })

</script>

<template>
  <template v-if="isEdit">
    <span class="position-relative">
      <v-card variant="outlined" color="black" density="compact">
        <component
            :is="props.element"
            ref="textElement"
            contenteditable spellcheck="false" v-text="text"
        />
      </v-card>

      <v-btn
          class="position-absolute text-subtitle-2 bg-green text-black"
          color="green" border
          style="right: -4vw; bottom: 50%; align-self: center;"
          @click.stop="validate"
          icon="mdi-content-save" size="40"
      />
    </span>
  </template>

  <template v-else>
    <span class="position-relative">
      <component
          :is="props.element"
          ref="textElement"
          v-bind="$attrs"
          spellcheck="false"
          v-html="output"
          @click.stop="emit('clicked')"/>
      <v-btn
          v-if="authStore.user.loggedIn && authStore.user.administrator"
          class="position-absolute text-subtitle-2 bg-yellow text-black"
          color="yellow" border
          style="right: -4vw; bottom: 50%; align-self: center;"
          @click.stop="toEditMode"
          icon="mdi-pen" size="40"
      />
    </span>
  </template>
</template>