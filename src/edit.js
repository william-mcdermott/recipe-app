import { initializeEditPage, generateLastEdited, updateTimestamp } from './views'
import { updateRecipe, removeRecipe } from './recipes'

const titleElement = document.querySelector('#recipe-title')
const bodyElement = document.querySelector('#recipe-body')
const removeElement = document.querySelector('#remove-recipe')
const recipeId = location.hash.substring(1)

initializeEditPage(recipeId)

titleElement.addEventListener('input', (e) => {
  const recipe = updateRecipe(recipeId, {
    title: e.target.value
  })
  updateTimestamp(recipe)
})

bodyElement.addEventListener('input', (e) => {
  const recipe = updateRecipe(recipeId, {
    body: e.target.value
  })
  updateTimestamp(recipe)
})

removeElement.addEventListener('click', () => {
  removeRecipe(recipeId)
  location.assign('/index.html')
})

window.addEventListener('storage', (e) => {
  if (e.key === 'recipes') {
    initializeEditPage(recipeId)
  }
})
