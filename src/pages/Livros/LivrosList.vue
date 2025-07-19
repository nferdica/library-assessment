<template>
  <div class="p-4 max-w-7xl mx-auto">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-3 sm:space-y-0">
      <h1 class="text-xl sm:text-2xl font-bold">Listagem de Livros</h1>

      <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-2 w-full sm:w-auto">
        <InputText
          v-model="filtroTitulo"
          placeholder="Filtrar por título"
          class="w-full sm:w-48"
        />
        <InputText
          v-model="filtroAutor"
          placeholder="Filtrar por autor"
          class="w-full sm:w-48"
        />
        <InputText
          v-model="filtroEditora"
          placeholder="Filtrar por editora"
          class="w-full sm:w-48"
        />
        <Button
          label="Novo Livro"
          icon="pi pi-plus"
          class="w-full sm:w-auto mt-2 sm:mt-0 sm:ml-auto"
          @click="novoLivro"
        />
      </div>
    </div>

    <div class="overflow-x-auto rounded-lg shadow">
      <DataTable
        :value="livrosFiltrados"
        emptyMessage="Nenhum livro encontrado"
        @row-click="onRowClick"
        responsiveLayout="scroll"
        paginator
        :rows="rows"
        :rowsPerPageOptions="[5,10,20]"
        class="min-w-full"
      >
        <Column field="id" header="ID" sortable class="w-1" />
        <Column header="Capa" class="w-2">
          <template #body="{ data }">
            <img
              :src="data.capa"
              alt="Capa"
              class="w-10 h-14 object-cover rounded"
            />
          </template>
        </Column>
        <Column field="titulo" header="Título" sortable class="w-3" />
        <Column field="ano" header="Ano" sortable class="w-2" />
        <Column field="autor.nome" header="Autor" sortable class="w-3" />
        <Column field="editora.nome" header="Editora" sortable class="w-3" />
        <Column header="Ações" class="w-4">
          <template #body="{ data }">
            <div class="flex space-x-1">
              <Button
                icon="pi pi-eye"
                class="p-button-text p-button-sm"
                @click.stop="visualizar(data)"
                title="Ver detalhes"
              />
              <Button
                icon="pi pi-pencil"
                class="p-button-text p-button-sm"
                @click.stop="editarLivro(data)"
                title="Editar livro"
              />
              <Button
                icon="pi pi-user"
                class="p-button-text p-button-sm"
                @click.stop="irAutor(data)"
                title="Página do autor"
              />
              <Button
                icon="pi pi-building"
                class="p-button-text p-button-sm"
                @click.stop="irEditora(data)"
                title="Página da editora"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog
      v-model:visible="showModal"
      header="Detalhes do Livro"
      modal
      class="w-full max-w-lg"
    >
      <div v-if="livroSelecionado" class="space-y-4">
        <img
          :src="livroSelecionado.capa"
          alt="Capa"
          class="w-full h-auto object-cover rounded"
        />
        <h2 class="text-lg font-bold">{{ livroSelecionado.titulo }}</h2>
        <p><strong>Autor:</strong> {{ livroSelecionado.autor.nome }}</p>
        <p><strong>Editora:</strong> {{ livroSelecionado.editora.nome }}</p>
        <p><strong>Ano:</strong> {{ livroSelecionado.ano }}</p>
        <p><strong>Sinopse:</strong> {{ livroSelecionado.sinopse }}</p>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { useStore } from '../../utils/store'

const { livros } = useStore()
const router = useRouter()

const filtroTitulo = ref('')
const filtroAutor   = ref('')
const filtroEditora = ref('')
const rows          = ref(10)

const showModal        = ref(false)
const livroSelecionado = ref(null)

function novoLivro() {
  router.push('/livros/novo')
}
function onRowClick(evt) {
  visualizar(evt.data)
}
function visualizar(data) {
  livroSelecionado.value = data
  showModal.value = true
}
function editarLivro(data) {
  router.push(`/livros/${data.id}`)
}
function irAutor(data) {
  router.push(`/autores/${data.autor.id}`)
}
function irEditora(data) {
  router.push(`/editoras/${data.editora.id}`)
}

const livrosFiltrados = computed(() => {
  const ft = filtroTitulo.value.toLowerCase()
  const fa = filtroAutor.value.toLowerCase()
  const fe = filtroEditora.value.toLowerCase()

  return livros.value.filter(l => {
    const okTitulo  = !ft || l.titulo.toLowerCase().includes(ft)
    const okAutor   = !fa || l.autor.nome.toLowerCase().includes(fa)
    const okEditora = !fe || l.editora.nome.toLowerCase().includes(fe)
    return okTitulo && okAutor && okEditora
  })
})
</script>
