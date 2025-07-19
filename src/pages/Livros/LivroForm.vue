<template>
  <div class="p-4 max-w-xl mx-auto">
    <h1 class="text-2xl font-semibold mb-4">
      {{ isNew ? 'Novo Livro' : 'Editar Livro' }}
    </h1>

    <Form
      :key="formKey"
      :validation-schema="schema"
      :initial-values="formValues"
      enableReinitialize
      @submit="onSubmit"
    >
      <div class="mb-4">
        <label for="titulo" class="block font-medium mb-1">Título</label>
        <Field
          name="titulo"
          id="titulo"
          placeholder="Digite o título"
          class="w-full border rounded px-3 py-2"
        />
        <ErrorMessage name="titulo" v-slot="{ message }">
          <span class="text-red-600 text-sm">{{ message }}</span>
        </ErrorMessage>
      </div>

      <div class="mb-4">
        <label for="ano" class="block font-medium mb-1">Ano de Publicação</label>
        <Field
          name="ano"
          id="ano"
          type="number"
          placeholder="2023"
          class="w-full border rounded px-3 py-2"
        />
        <ErrorMessage name="ano" v-slot="{ message }">
          <span class="text-red-600 text-sm">{{ message }}</span>
        </ErrorMessage>
      </div>

      <div class="mb-4">
        <label for="capa" class="block font-medium mb-1">URL da Capa</label>
        <Field
          name="capa"
          id="capa"
          placeholder="https://..."
          class="w-full border rounded px-3 py-2"
        />
        <ErrorMessage name="capa" v-slot="{ message }">
          <span class="text-red-600 text-sm">{{ message }}</span>
        </ErrorMessage>
      </div>

      <div class="mb-4">
        <label for="autorId" class="block font-medium mb-1">Autor</label>
        <Field
          as="select"
          name="autorId"
          id="autorId"
          class="w-full border rounded px-3 py-2"
        >
          <option value="" disabled>Selecione o autor</option>
          <option v-for="a in autores" :key="a.id" :value="a.id">
            {{ a.name }}
          </option>
        </Field>
        <ErrorMessage name="autorId" v-slot="{ message }">
          <span class="text-red-600 text-sm">{{ message }}</span>
        </ErrorMessage>
      </div>

      <div class="mb-4">
        <label for="editoraId" class="block font-medium mb-1">Editora</label>
        <Field
          as="select"
          name="editoraId"
          id="editoraId"
          class="w-full border rounded px-3 py-2"
        >
          <option value="" disabled>Selecione a editora</option>
          <option v-for="e in editoras" :key="e.id" :value="e.id">
            {{ e.name }}
          </option>
        </Field>
        <ErrorMessage name="editoraId" v-slot="{ message }">
          <span class="text-red-600 text-sm">{{ message }}</span>
        </ErrorMessage>
      </div>

      <div class="mb-4">
        <label for="sinopse" class="block font-medium mb-1">Sinopse</label>
        <Field
          as="textarea"
          name="sinopse"
          id="sinopse"
          placeholder="Escreva a sinopse"
          class="w-full border rounded px-3 py-2 h-24"
        />
        <ErrorMessage name="sinopse" v-slot="{ message }">
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

const { livros, autores, editoras, addLivro, updateLivro } = useStore()
const route = useRoute()
const router = useRouter()

const isNew     = computed(() => route.params.id === 'novo')
const currentId = computed(() => Number(route.params.id))
const formKey   = computed(() => (isNew.value ? 'new' : `edit-${currentId.value}`))

const formValues = reactive({
  titulo:    '',
  ano:       '',
  capa:      '',
  autorId:   '',
  editoraId: '',
  sinopse:   '',
})

watch(
  () => route.params.id,
  id => {
    if (id === 'novo') {
      // limpa
      formValues.titulo    = ''
      formValues.ano       = ''
      formValues.capa      = ''
      formValues.autorId   = ''
      formValues.editoraId = ''
      formValues.sinopse   = ''
    } else {
      const livro = livros.value.find(l => l.id === Number(id))
      if (livro) {
        formValues.titulo    = livro.titulo
        formValues.ano       = livro.ano
        formValues.capa      = livro.capa
        formValues.autorId   = String(livro.autor.id)
        formValues.editoraId = String(livro.editora.id)
        formValues.sinopse   = livro.sinopse
      }
    }
  },
  { immediate: true }
)

const schema = yup.object({
  titulo:    yup.string().required('Título é obrigatório'),
  ano:       yup.number().typeError('Deve ser um número').required('Ano é obrigatório'),
  capa:      yup.string().url('Deve ser uma URL válida').required('URL da capa é obrigatória'),
  autorId:   yup.string().required('Autor é obrigatório'),
  editoraId: yup.string().required('Editora é obrigatória'),
  sinopse:   yup.string().required('Sinopse é obrigatória'),
})

function onSubmit(values) {
  const payload = {
    titulo: values.titulo,
    ano:     Number(values.ano),
    capa:    values.capa,
    autorId:   Number(values.autorId),
    editoraId: Number(values.editoraId),
    sinopse: values.sinopse,
  }

  if (isNew.value) {
    addLivro(payload)
  } else {
    payload.id = currentId.value
    updateLivro(payload)
  }
  router.push('/livros')
}

function cancelar() {
  router.back()
}
</script>
