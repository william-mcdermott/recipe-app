import { getFilters } from './filters'
import { getRecipes, toggleRecipe, removeRecipe } from './recipes'


// renderRecipes
// Arguments: none
// Return value: none
const renderRecipes = () => {
  const { searchText, hideCompleted } = getFilters()
  const recipes = getRecipes()
  const recipeEl = document.querySelector('#recipes')
  const recipesFilteredForSearch = recipes
  const thingsRecipe = recipesFilteredForSearch.filter((recipe) => !recipe.completed)
  recipeEl.innerHTML = ''
  recipeEl.appendChild(generateSummaryDOM(thingsRecipe))
  if (recipesFilteredForSearch.length > 0) {
    recipesFilteredForSearch.forEach((recipe) => {
      recipeEl.appendChild(generateRecipeDOM(recipe))
    })
  } else {
    const emptyMessage = document.createElement('p')
    emptyMessage.classList.add('empty-message')
    emptyMessage.innerText = 'There are no to-dos to show'
    recipeEl.appendChild(emptyMessage)
  }
}

const renderIngredients = (recipe) => {
  const ingredients = recipe.ingredients
  const ingredientEl = document.querySelector('#ingredient-list')
  if (ingredients.length > 0) {
    ingredients.forEach((ingredient) => {
      ingredientEl.appendChild(generateIngredientDOM(ingredient))
    })
  } else {
    const emptyMessage = document.createElement('p')
    emptyMessage.classList.add('empty-message')
    emptyMessage.innerText = 'There are no ingredients to show'
    recipeEl.appendChild(emptyMessage)
  }
}

// generateRecipeDOM
// Arguments: recipe
// Return value: the recipe element
const generateRecipeDOM = (recipe) => {
  const renderRecipe = document.createElement('label')
  const containerEl = document.createElement('div')
  const p = document.createElement('span')
  const ingredients = document.createElement('p')
  ingredients.textContent = doIHaveIngredients(recipe)
  p.textContent = recipe.name
  containerEl.appendChild(p)
  containerEl.appendChild(ingredients)
  renderRecipe.classList.add('list-item')
  containerEl.classList.add('list-item__container')
  renderRecipe.appendChild(containerEl)
  return renderRecipe
}

const generateIngredientDOM = (ingredient) => {
  const containerEl = document.createElement('li')
  const checkbox = document.createElement('input')
  const ingredName = document.createElement('span')
  const remove = document.createElement('span')
  checkbox.setAttribute('type', 'checkbox')
  checkbox.checked = ingredient.haveIngredient
  ingredName.textContent = ingredient.ingredientName
  remove.innerText = 'Remove'
  containerEl.appendChild(checkbox)
  containerEl.appendChild(ingredName)
  containerEl.appendChild(remove)
  containerEl.classList.add('list-item__container')
  return containerEl
}

// generateSummaryDOM
// Arguments: incompletedRecipes
// Return value: the summary element
const generateSummaryDOM = (thingsRecipe) => {
  const summary = document.createElement('h2')
  summary.textContent = `You have ${thingsRecipe.length} ${thingsRecipe.length === 1 ? 'recipe' : 'recipes'} left`
  summary.classList.add('list-title')
  return summary
}

// Generate statement of how many ingredients you need
const doIHaveIngredients = (recipe) => {
  const missingIngredients = recipe.ingredients.filter((ingredient) => {
    return !ingredient.haveIngredient
  })
  if (missingIngredients.length === 0) {
    return 'You have all of the ingredients'
  } else if (missingIngredients.length === recipe.ingredients.length) {
    return 'You have none of the ingredients'
  } else {
    return 'You have some of the ingredients'
  }
}

const initializeEditPage = (recipeId) => {
  const titleElement = document.querySelector('#recipe-title')
  const bodyElement = document.querySelector('#recipe-body')
  const recipes = getRecipes()
  const recipe = recipes.find((recipe) => recipe.id === recipeId)
  if (!recipe) {
    location.assign('/index.html')
  }

  titleElement.value = recipe.name
  bodyElement.value = recipe.instructions
  renderIngredients(recipe)
  // updateTimestamp(recipe)
}


// Make sure to set up the exports
export { renderRecipes, generateRecipeDOM, generateSummaryDOM, initializeEditPage }
