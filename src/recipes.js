import { renderIngredients } from './views.js'

import uuidv4 from 'uuid/v4'
import moment from 'moment'

let recipes = []

// Read existing recipes from localStorage
const loadRecipes = () => {
  const recipesJSON = localStorage.getItem('recipes')
  try {
    return recipesJSON ? JSON.parse(recipesJSON) : []
  } catch (e) {
    return []
  }
}

// Save the recipes to localStorage
const saveRecipes = () => {
  localStorage.setItem('recipes', JSON.stringify(recipes))
}

// Expose recipes from module
const getRecipes = () => recipes

const createRecipe = () => {
  const id = uuidv4()
  const now = moment().valueOf()
  recipes.push({
    id,
    name: '',
    instructions: '',
    createdAt: now,
    updatedAt: now,
    ingredients: []
  })
  saveRecipes()
  return id
}

// Remove a recipe from the list
const removeRecipe = (id) => {
  const recipeIndex = recipes.findIndex((recipe) => recipe.id === id)
  if (recipeIndex > -1) {
    recipes.splice(recipeIndex, 1)
    saveRecipes()
  }
}

// Sort your recipes by one of three ways
const sortRecipes = (sortBy) => {
  if (sortBy === 'byEdited') {
    return recipes.sort((a, b) => {
      if (a.updatedAt > b.updatedAt) {
        return -1
      } else if (a.updatedAt < b.updatedAt) {
        return 1
      } else {
        return 0
      }
    })
  } else if (sortBy === 'byCreated') {
    return recipes.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return -1
      } else if (a.createdAt < b.createdAt) {
        return 1
      } else {
        return 0
      }
    })
  } else if (sortBy === 'alphabetical') {
    return recipes.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1
      } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1
      } else {
        return 0
      }
    })
  } else {
    return recipes
  }
}

const updateRecipe = (id, updates) => {
  const recipe = recipes.find((recipe) => recipe.id === id)
  if (!recipe) {
    return
  }
  if (typeof updates.name === 'string') {
    recipe.name = updates.name
    recipe.updatedAt = moment().valueOf()
  }
  if (typeof updates.instructions === 'string') {
    recipe.instructions = updates.instructions
    recipe.updatedAt = moment().valueOf()
  }
  saveRecipes()
  return recipe
}

const addIngredient = (id, ingredientName) => {
  const recipe = recipes.find((recipe) => recipe.id === id)
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

recipes = loadRecipes()

export { getRecipes, createRecipe, removeRecipe, sortRecipes, updateRecipe, addIngredient }
