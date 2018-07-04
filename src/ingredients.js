import uuidv4 from 'uuid/v4'

import { saveRecipes, getRecipes } from './recipes.js'

const addIngredient = (id, ingredientName) => {
  const recipe = getRecipes().find((recipe) => recipe.id === id)
  if (!recipe) {
    return
  }
  const ingredientId = uuidv4()
  recipe.ingredients.push({
    ingredientId,
    ingredientName,
    haveIngredient: false
  })
  saveRecipes()
  renderIngredients(recipe)
  return recipe
}

const removeIngredient = (id) => {
  const recipe = getRecipes().find((recipe) => recipe.id === location.hash.substring(1))
  const ingredients = recipe.ingredients
  const indexToRemove = ingredients.findIndex((ingredient) => ingredient.ingredientId === id)
  ingredients.splice(indexToRemove, 1)
  saveRecipes()
  renderIngredients(recipe)
}

const toggleIngredient = (ingredient) => {
  ingredient.haveIngredient = !ingredient.haveIngredient
  saveRecipes()
}

const renderIngredients = (recipe) => {
  const ingredients = recipe.ingredients
  const ingredientEl = document.querySelector('#ingredient-list')
  ingredientEl.innerHTML = ''
  if (ingredients.length > 0) {
    ingredients.forEach((ingredient) => {
      ingredientEl.appendChild(generateIngredientDOM(ingredient))
    })
  } else {
    const emptyMessage = document.createElement('p')
    emptyMessage.classList.add('empty-message')
    emptyMessage.innerText = 'There are no ingredients to show'
    ingredientEl.appendChild(emptyMessage)
  }
}

const generateIngredientDOM = (ingredient) => {
  const containerEl = document.createElement('li')
  const checkbox = document.createElement('input')
  const ingredName = document.createElement('span')
  const remove = document.createElement('span')
  checkbox.setAttribute('type', 'checkbox')
  checkbox.checked = ingredient.haveIngredient
  checkbox.addEventListener('click', () => {
    toggleIngredient(ingredient)
  })
  ingredName.textContent = ingredient.ingredientName
  remove.innerText = 'Remove'
  remove.addEventListener('click', () => {
    removeIngredient(ingredient.ingredientId)
  })
  containerEl.appendChild(checkbox)
  containerEl.appendChild(ingredName)
  containerEl.appendChild(remove)
  containerEl.classList.add('list-item__container')
  return containerEl
}

export { renderIngredients, addIngredient, toggleIngredient }
