<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="text-center mb-10">
      <h1 class="text-4xl sm:text-5xl font-extrabold text-[#059669] mb-2">
        Biblioteca Virtual
      </h1>
      <p class="text-lg sm:text-xl text-gray-700">
        Gerencie seus livros, autores e editoras de maneira simples e eficiente.
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
      <div
        @click="go('/livros')"
        class="cursor-pointer bg-white rounded-lg shadow hover:shadow-md transition p-6 flex flex-col items-center"
      >
        <i class="pi pi-book text-4xl text-indigo-500 mb-3"></i>
        <div class="text-3xl font-bold mb-1">{{ livrosCount }}</div>
        <div class="text-gray-600">Livros cadastrados</div>
      </div>

      <div
        @click="go('/autores')"
        class="cursor-pointer bg-white rounded-lg shadow hover:shadow-md transition p-6 flex flex-col items-center"
      >
        <i class="pi pi-user text-4xl text-green-500 mb-3"></i>
        <div class="text-3xl font-bold mb-1">{{ autoresCount }}</div>
        <div class="text-gray-600">Autores cadastrados</div>
      </div>

      <div
        @click="go('/editoras')"
        class="cursor-pointer bg-white rounded-lg shadow hover:shadow-md transition p-6 flex flex-col items-center"
      >
        <i class="pi pi-building text-4xl text-yellow-500 mb-3"></i>
        <div class="text-3xl font-bold mb-1">{{ editorasCount }}</div>
        <div class="text-gray-600">Editoras cadastradas</div>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div
        @click="go('/livros')"
        class="cursor-pointer bg-white rounded-lg shadow hover:shadow-lg transition p-6 flex flex-col items-center"
      >
        <i class="pi pi-book text-5xl text-indigo-500 mb-4"></i>
        <h2 class="text-xl font-semibold mb-2">Livros</h2>
        <p class="text-gray-600 text-center">
          Veja a lista de livros, filtre, ordene e cadastre novos títulos.
        </p>
      </div>

      <div
        @click="go('/autores')"
        class="cursor-pointer bg-white rounded-lg shadow hover:shadow-lg transition p-6 flex flex-col items-center"
      >
        <i class="pi pi-user text-5xl text-green-500 mb-4"></i>
        <h2 class="text-xl font-semibold mb-2">Autores</h2>
        <p class="text-gray-600 text-center">
          Cadastre novos autores e veja todos os seus livros.
        </p>
      </div>

      <div
        @click="go('/editoras')"
        class="cursor-pointer bg-white rounded-lg shadow hover:shadow-lg transition p-6 flex flex-col items-center"
      >
        <i class="pi pi-building text-5xl text-yellow-500 mb-4"></i>
        <h2 class="text-xl font-semibold mb-2">Editoras</h2>
        <p class="text-gray-600 text-center">
          Cadastre editoras e confira quais livros publicaram.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../utils/store'

const router = useRouter()
function go(path) {
  router.push(path)
}

const { livros, autores, editoras } = useStore()

const livrosCount   = computed(() => livros.value.length)
const autoresCount  = computed(() => autores.value.length)
const editorasCount = computed(() => editoras.value.length)
</script>
