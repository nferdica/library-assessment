<template>
  <div class="p-4">
    <h1 class="text-2xl font-semibold mb-4">
      Autor: {{ autor.name }}
    </h1>
    <p><strong>ID:</strong> {{ autor.id }}</p>

    <h2 class="text-xl mt-6 mb-2">Livros do Autor</h2>
    <ul class="list-disc list-inside">
      <li v-for="l in livrosDoAutor" :key="l.id">
        <router-link
          class="text-blue-600 hover:underline"
          :to="`/livros/${l.id}`"
        >
          {{ l.titulo }} ({{ l.ano }})
        </router-link>
      </li>
      <li v-if="livrosDoAutor.length === 0" class="text-gray-500">
        Nenhum livro cadastrado para este autor.
      </li>
    </ul>

    <Button
      label="Editar Autor"
      icon="pi pi-pencil"
      class="mt-6"
      @click="editarAutor"
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
const { autores, livros } = useStore()

const id = computed(() => Number(route.params.id))
const autor = computed(() => {
  return autores.value.find(a => a.id === id.value) || { id: id.value, name: '' }
})

const livrosDoAutor = computed(() =>
  livros.value.filter(l => l.autor.id === id.value)
)

function editarAutor() {
  router.push(`/autores/${id.value}/editar`)
}
</script>
