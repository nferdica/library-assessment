<template>
  <div class="flex flex-col min-h-screen">
    <nav class="bg-white shadow-md sticky top-0 z-50">
      <div class="container mx-auto px-4 py-6 flex items-center justify-between">
        <router-link to="/" class="text-2xl font-extrabold text-gray-800 hover:text-[#059669] transition-colors">
          Biblioteca Virtual
        </router-link>
        <ul class="flex space-x-6">
          <li class="group">
            <router-link
              to="/"
              class="relative text-gray-600 hover:text-[#059669] transition-colors"
            >
              Início
              <span
                class="absolute left-0 -bottom-1 h-0.5 bg-[#059669] transition-all duration-300 group-hover:w-full"
                :class="{ 'w-full': $route.path === '/' }"
              />
            </router-link>
          </li>
          <li class="group">
            <router-link
              to="/livros"
              class="relative text-gray-600 hover:text-[#059669] transition-colors"
            >
              Livros
              <span
                class="absolute left-0 -bottom-1 h-0.5 bg-[#059669] transition-all duration-300 group-hover:w-full"
                :class="{ 'w-full': $route.path.startsWith('/livros') }"
              />
            </router-link>
          </li>
          <li class="group">
            <router-link
              to="/autores"
              class="relative text-gray-600 hover:text-[#059669] transition-colors"
            >
              Autores
              <span
                class="absolute left-0 -bottom-1 h-0.5 bg-[#059669] transition-all duration-300 group-hover:w-full"
                :class="{ 'w-full': $route.path.startsWith('/autores') }"
              />
            </router-link>
          </li>
          <li class="group">
            <router-link
              to="/editoras"
              class="relative text-gray-600 hover:text-[#059669] transition-colors"
            >
              Editoras
              <span
                class="absolute left-0 -bottom-1 h-0.5 bg-[#059669] transition-all duration-300 group-hover:w-full"
                :class="{ 'w-full': $route.path.startsWith('/editoras') }"
              />
            </router-link>
          </li>
        </ul>
      </div>
    </nav>

    <main class="flex-grow container mx-auto px-4 py-6">
      <slot />
    </main>

    <footer class="bg-white border-t">
      <div class="container mx-auto px-4 py-4 text-center text-gray-500 text-sm">
        © 2025 Todos os direitos reservados. Nathan Ferdinando.
      </div>
    </footer>
  </div>
</template>
