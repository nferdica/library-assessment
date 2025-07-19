<template>
  <div class="p-4">
    <h1 class="text-2xl font-semibold mb-4">
      Editora: {{ editora.name }}
    </h1>
    <p><strong>ID:</strong> {{ editora.id }}</p>

    <h2 class="text-xl mt-6 mb-2">Livros Publicados</h2>
    <ul class="list-disc list-inside">
      <li v-for="l in livrosDaEditora" :key="l.id">
        <router-link
          class="text-blue-600 hover:underline"
          :to="`/livros/${l.id}`"
        >
          {{ l.titulo }} ({{ l.ano }})
        </router-link>
      </li>
      <li v-if="livrosDaEditora.length === 0" class="text-gray-500">
        Nenhum livro cadastrado para esta editora.
      </li>
    </ul>

    <Button
      label="Editar Editora"
      icon="pi pi-pencil"
      class="mt-6"
      @click="editarEditora"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Button from 'primevue/button'
import { useStore } from '../../utils/store'

const route = useRoute()
const router = useRouter()
const { editoras, livros } = useStore()

const id = computed(() => Number(route.params.id))
const editora = computed(() => {
  return editoras.value.find(e => e.id === id.value) || { id: id.value, name: '' }
})
const livrosDaEditora = computed(() =>
  livros.value.filter(l => l.editora.id === id.value)
)

function editarEditora() {
  router.push(`/editoras/${id.value}/editar`)
}
</script>
