import { createRouter, createWebHistory } from 'vue-router'
import ListaLivros  from '../pages/Livros/LivrosList.vue'
import FormLivro    from '../pages/Livros/LivroForm.vue'
import Home         from '../pages/Home.vue'
import AutorPage    from '../pages/Autores/AutorPage.vue'
import AutorForm    from '../pages/Autores/AutorForm.vue'
import EditoraPage  from '../pages/Editoras/EditoraPage.vue'
import EditoraForm  from '../pages/Editoras/EditoraForm.vue'
import AutorsList from '../pages/Autores/AutorsList.vue'
import EditorasList from '../pages/Editoras/EditorasList.vue'

const routes = [
  { path: '/',                       component: Home },
  { path: '/livros',                 component: ListaLivros },
  { path: '/livros/:id(novo|\\d+)',  component: FormLivro,    props: true },
  { path: '/autores',                 component: AutorsList,    props: true },
  { path: '/autores/novo',           component: AutorForm,    props: true },
  { path: '/autores/:id(\\d+)/editar', component: AutorForm,   props: true },
  { path: '/autores/:id(\\d+)',      component: AutorPage,    props: true },
  { path: '/editoras',                component: EditorasList,    props: true },
  { path: '/editoras/novo',           component: EditoraForm,   props: true },
  { path: '/editoras/:id(\\d+)/editar', component: EditoraForm,  props: true },
  { path: '/editoras/:id(\\d+)',      component: EditoraPage,   props: true },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
