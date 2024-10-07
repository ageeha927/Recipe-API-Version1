const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { recipes, ingredients } = require('./db/data') // Assume you have these in a data file

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('<h1>Home page</h1><a href="/api/recipes">Recipes</a><br><a href="/api/ingredients">Ingredients</a>')
})

// Return all recipes
app.get('/api/recipes', (req, res) => {
    res.json(recipes)
})

// Return a specific recipe
app.get('/api/recipes/:recipeID', (req, res) => {
    const { recipeID } = req.params
    const singleRecipe = recipes.find(recipe => recipe.id === Number(recipeID))

    if (!singleRecipe) {
        return res.status(404).send('Recipe not found')
    }
    return res.json(singleRecipe)
})

// Return all ingredients
app.get('/api/ingredients', (req, res) => {
    res.json(ingredients)
})

// Return a specific ingredient
app.get('/api/ingredients/:ingredientID', (req, res) => {
    const { ingredientID } = req.params
    const singleIngredient = ingredients.find(ingredient => ingredient.id === Number(ingredientID))

    if (!singleIngredient) {
        return res.status(404).send('Ingredient not found')
    }
    return res.json(singleIngredient)
})

// Create a new recipe
app.post('/api/recipes', (req, res) => {
    const newRecipe = req.body
    newRecipe.id = recipes.length + 1 // Simple ID assignment
    recipes.push(newRecipe)
    res.status(201).json(newRecipe)
})

// Create a new ingredient
app.post('/api/ingredients', (req, res) => {
    const newIngredient = req.body
    newIngredient.id = ingredients.length + 1 // Simple ID assignment
    ingredients.push(newIngredient)
    res.status(201).json(newIngredient)
})

// Update a recipe
app.put('/api/recipes/:recipeID', (req, res) => {
    const { recipeID } = req.params
    const recipeIndex = recipes.findIndex(recipe => recipe.id === Number(recipeID))

    if (recipeIndex === -1) {
        return res.status(404).send('Recipe not found')
    }

    recipes[recipeIndex] = { id: Number(recipeID), ...req.body }
    res.json(recipes[recipeIndex])
})

// Update an ingredient
app.put('/api/ingredients/:ingredientID', (req, res) => {
    const { ingredientID } = req.params
    const ingredientIndex = ingredients.findIndex(ingredient => ingredient.id === Number(ingredientID))

    if (ingredientIndex === -1) {
        return res.status(404).send('Ingredient not found')
    }

    ingredients[ingredientIndex] = { id: Number(ingredientID), ...req.body }
    res.json(ingredients[ingredientIndex])
})

// Delete a recipe
app.delete('/api/recipes/:recipeID', (req, res) => {
    const { recipeID } = req.params
    const recipeIndex = recipes.findIndex(recipe => recipe.id === Number(recipeID))

    if (recipeIndex === -1) {
        return res.status(404).send('Recipe not found')
    }

    recipes.splice(recipeIndex, 1)
    res.status(204).send() // No content
})

// Delete an ingredient
app.delete('/api/ingredients/:ingredientID', (req, res) => {
    const { ingredientID } = req.params
    const ingredientIndex = ingredients.findIndex(ingredient => ingredient.id === Number(ingredientID))

    if (ingredientIndex === -1) {
        return res.status(404).send('Ingredient not found')
    }

    ingredients.splice(ingredientIndex, 1)
    res.status(204).send() // No content
})

// Set up a query to filter recipes
app.get('/api/v1/query', (req, res) => {
    const { search, limit } = req.query
    let sortedRecipes = [...recipes]

    if (search) {
        sortedRecipes = sortedRecipes.filter(recipe => {
            return recipe.title.toLowerCase().startsWith(search.toLowerCase())
        })
    }
    if (limit) {
        sortedRecipes = sortedRecipes.slice(0, Number(limit))
    }
    if (sortedRecipes.length < 1) {
        return res.status(200).json({ success: true, data: [] })
    }
    res.status(200).json(sortedRecipes)
})

// Start the server
app.listen(5000, () => {
    console.log('Server listening on port 5000...')
})