<template>
  <div class="p-4 max-w-md mx-auto">
    <h1 class="text-2xl font-semibold mb-4">
      {{ isNew ? 'Nova Editora' : 'Editar Editora' }}
    </h1>

    <Form
      :validation-schema="schema"
      :initial-values="formValues"
      :key="formKey"
      enableReinitialize
      @submit="onSubmit"
    >
      <div class="mb-4">
        <label for="name" class="block font-medium mb-1">
          Nome da Editora
        </label>
        <Field
          id="name"
          name="name"
          placeholder="Digite o nome da editora"
          class="w-full border rounded px-3 py-2"
        />
        <ErrorMessage name="name" v-slot="{ message }">
          <span class="text-red-600 text-sm">{{ message }}</span>
        </ErrorMessage>
      </div>

      <div class="flex space-x-2">
        <Button label="Salvar" icon="pi pi-check" type="submit" />
        <Button
          label="Cancelar"
          icon="pi pi-times"
          class="p-button-secondary"
          type="button"
          @click="cancelar"
        />
      </div>
    </Form>
  </div>
</template>

<script setup>
import { reactive, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import Button from 'primevue/button'
import { useStore } from '../../utils/store'

const { editoras, addEditora, updateEditora } = useStore()
const route = useRoute()
const router = useRouter()

const paramId = computed(() => route.params.id)
const isNew   = computed(() => !paramId.value)
const formKey = computed(() => isNew.value ? 'new' : `edit-${paramId.value}`)

const formValues = reactive({ name: '' })

watch(
  () => paramId.value,
  (id) => {
    if (!id) {
      formValues.name = ''
    } else {
      const e = editoras.value.find(x => x.id === Number(id))
      formValues.name = e?.name ?? ''
    }
  },
  { immediate: true }
)

const schema = yup.object({
  name: yup.string().required('Nome da editora é obrigatório'),
})

function onSubmit(values) {
  if (isNew.value) {
    addEditora({ nome: values.name })
    const newE = editoras.value[editoras.value.length - 1]
    router.push(`/editoras/${newE.id}`)
  } else {
    updateEditora({ id: Number(paramId.value), nome: values.name })
    router.push(`/editoras/${paramId.value}`)
  }
}

function cancelar() {
  router.back()
}
</script>
