import { initializeEditPage, generateLastEdited, updateTimestamp } from './views'
import { updateRecipe, removeRecipe, addIngredient } from './recipes'

const titleElement = document.querySelector('#recipe-name')
const bodyElement = document.querySelector('#recipe-instructions')
const removeElement = document.querySelector('#remove-recipe')
const addIngredientElement = document.querySelector('#add-ingredient')
const recipeId = location.hash.substring(1)

initializeEditPage(recipeId)

titleElement.addEventListener('input', (e) => {
  const recipe = updateRecipe(recipeId, {
    name: e.target.value
  })
})

bodyElement.addEventListener('input', (e) => {
  const recipe = updateRecipe(recipeId, {
    instructions: e.target.value
  })
})

removeElement.addEventListener('click', () => {
  removeRecipe(recipeId)
  location.assign('/index.html')
})

addIngredientElement.addEventListener('submit', (e) => {
  e.preventDefault()
  const { value } = e.target[0]
  addIngredient(recipeId, value)
  e.target[0].value = ''
})

window.addEventListener('storage', (e) => {
  if (e.key === 'recipes') {
    initializeEditPage(recipeId)
  }
})
