<template>
  <div class="p-4 max-w-4xl mx-auto">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-3 sm:space-y-0">
      <h1 class="text-xl sm:text-2xl font-bold">Listagem de Autores</h1>
      <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-2 w-full sm:w-auto">
        <InputText
          v-model="filtro"
          placeholder="Filtrar por nome"
          class="w-full sm:w-48"
        />
        <Button
          label="Novo Autor"
          icon="pi pi-plus"
          class="w-full sm:w-auto mt-2 sm:mt-0 sm:ml-auto"
          @click="novoAutor"
        />
      </div>
    </div>

    <div class="overflow-x-auto rounded-lg shadow">
      <DataTable
        :value="autoresFiltrados"
        emptyMessage="Nenhum autor encontrado"
        responsiveLayout="scroll"
        paginator
        :rows="rows"
        :rowsPerPageOptions="[5,10,20]"
        class="min-w-full"
      >
        <Column field="id" header="ID" sortable class="w-1" />
        <Column field="name" header="Nome" sortable class="w-6" />

        <Column header="Ações" class="w-3">
          <template #body="{ data }">
            <div class="flex space-x-1">
              <Button
                icon="pi pi-eye"
                class="p-button-text p-button-sm"
                @click.stop="verAutor(data)"
                title="Ver autor"
              />
              <Button
                icon="pi pi-pencil"
                class="p-button-text p-button-sm"
                @click.stop="editarAutor(data)"
                title="Editar autor"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { useStore } from '../../utils/store'

const { autores } = useStore()
const router = useRouter()

const filtro = ref('')
const rows   = ref(10)

function novoAutor() {
  router.push('/autores/novo')
}

function verAutor(a) {
  router.push(`/autores/${a.id}`)
}

function editarAutor(a) {
  router.push(`/autores/${a.id}/editar`)
}

const autoresFiltrados = computed(() => {
  const term = filtro.value.trim().toLowerCase()
  if (!term) return autores.value
  return autores.value.filter(a =>
    a.name.toLowerCase().includes(term)
  )
})
</script>
