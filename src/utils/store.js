import { reactive, computed } from 'vue'
import raw from '../data.json'

const state = reactive({
  books:      Array.isArray(raw.books)      ? [...raw.books]      : [],
  authors:    Array.isArray(raw.authors)    ? [...raw.authors]    : [],
  publishers: Array.isArray(raw.publishers) ? [...raw.publishers] : [],
})

const nextId = list => Math.max(0, ...list.map(x => x.id)) + 1

function normalizeBooks() {
  return state.books.map(b => {
    const autor = state.authors.find(a => a.id === b.authorId) || { id: null, name: '' }
    const editora = state.publishers.find(p => p.id === b.publisherId) || { id: null, name: '' }
    return {
      id:      b.id,
      titulo:  b.title,
      ano:     b.year,
      capa:    b.cover,
      sinopse: b.sinopsis,
      autor:   { id: autor.id, nome: autor.name },
      editora: { id: editora.id, nome: editora.name },
    }
  })
}

export function useStore() {
  const livros     = computed(() => normalizeBooks())
  const autores    = computed(() => state.authors)
  const editoras   = computed(() => state.publishers)

  function addLivro({ titulo, ano, capa, sinopse, autorId, editoraId }) {
    state.books.push({
      id:          nextId(state.books),
      title:       titulo,
      year:        ano,
      cover:       capa,
      sinopsis:    sinopse,
      authorId:    autorId,
      publisherId: editoraId,
    })
  }

  function updateLivro({ id, titulo, ano, capa, sinopse, autorId, editoraId }) {
    const i = state.books.findIndex(x => x.id === id)
    if (i >= 0) {
      state.books[i] = {
        id,
        title:       titulo,
        year:        ano,
        cover:       capa,
        sinopsis:    sinopse,
        authorId:    autorId,
        publisherId: editoraId,
      }
    }
  }

  function addAutor({ nome }) {
    state.authors.push({
      id:   nextId(state.authors),
      name: nome,
    })
  }

  function updateAutor({ id, nome }) {
    const i = state.authors.findIndex(x => x.id === id)
    if (i >= 0) state.authors[i].name = nome
  }

  function addEditora({ nome }) {
    state.publishers.push({
      id:   nextId(state.publishers),
      name: nome,
    })
  }

  function updateEditora({ id, nome }) {
    const i = state.publishers.findIndex(x => x.id === id)
    if (i >= 0) state.publishers[i].name = nome
  }

  return {
    livros,
    autores,
    editoras,
    addLivro,
    updateLivro,
    addAutor,
    updateAutor,
    addEditora,
    updateEditora,
  }
}
