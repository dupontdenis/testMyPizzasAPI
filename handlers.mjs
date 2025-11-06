/**
 * Handlers Module - Contains all event handlers for user interactions
 */

import {
  getAllPizzas,
  getPizzaById,
  getPizzasWithPrices,
  getIngredientPrices,
  searchPizzasByIngredients,
  getPizzaPrice,
  computeCustomPizzaPrice,
} from "./pizzaAPI.mjs";

import {
  renderPizzaGrid,
  renderIngredientPrices,
  renderPizzaPrice,
  renderCustomPizzaPrice,
} from "./renderer.mjs";

import {
  displayResults,
  showLoading,
  showError,
  getInputValue,
} from "./ui.mjs";

/**
 * Handler: Get all pizzas
 */
export async function handleGetAllPizzas() {
  showLoading();
  try {
    const pizzas = await getAllPizzas();
    displayResults("📋 All Pizzas", renderPizzaGrid(pizzas));
  } catch (error) {
    showError(error);
  }
}

/**
 * Handler: Get pizza by ID
 */
export async function handleGetPizzaById() {
  const pizzaId = getInputValue("pizzaId");

  if (!pizzaId) {
    displayResults(
      "⚠️ Input Required",
      '<div class="alert alert-warning"><i class="bi bi-exclamation-triangle-fill"></i> Please enter a Pizza ID</div>'
    );
    return;
  }

  showLoading();
  try {
    const pizza = await getPizzaById(pizzaId);
    displayResults("🔍 Pizza Details", renderPizzaGrid([pizza]));
  } catch (error) {
    showError(error);
  }
}

/**
 * Handler: Get pizzas with prices
 */
export async function handleGetPizzasWithPrices() {
  showLoading();
  try {
    const pizzas = await getPizzasWithPrices();
    displayResults("💰 Pizzas With Prices", renderPizzaGrid(pizzas, true));
  } catch (error) {
    showError(error);
  }
}

/**
 * Handler: Get ingredient prices
 */
export async function handleGetIngredientPrices() {
  showLoading();
  try {
    const prices = await getIngredientPrices();
    displayResults("🧾 Ingredient Prices", renderIngredientPrices(prices));
  } catch (error) {
    showError(error);
  }
}

/**
 * Handler: Search pizzas by ingredients
 */
export async function handleSearchPizzas() {
  const ingredientsInput = getInputValue("searchIngredients");

  if (!ingredientsInput) {
    displayResults(
      "⚠️ Input Required",
      '<div class="alert alert-warning"><i class="bi bi-exclamation-triangle-fill"></i> Please enter ingredients (e.g., 🍅,🧀)</div>'
    );
    return;
  }

  showLoading();
  try {
    const ingredients = ingredientsInput.split(",").map((i) => i.trim());
    const pizzas = await searchPizzasByIngredients(ingredients);

    if (pizzas.length === 0) {
      displayResults(
        "🔎 Search Results",
        `<div class="alert alert-warning mb-0">
                <i class="bi bi-search"></i> No pizzas found with ingredients: <strong>${ingredients.join(
                  " "
                )}</strong>
            </div>`
      );
    } else {
      displayResults(
        `🔎 Search Results (${ingredients.join(" ")})`,
        renderPizzaGrid(pizzas)
      );
    }
  } catch (error) {
    showError(error);
  }
}

/**
 * Handler: Get pizza price
 */
export async function handleGetPizzaPrice() {
  const priceId = getInputValue("priceId");

  if (!priceId) {
    displayResults(
      "⚠️ Input Required",
      '<div class="alert alert-warning"><i class="bi bi-exclamation-triangle-fill"></i> Please enter a Pizza ID</div>'
    );
    return;
  }

  showLoading();
  try {
    const priceData = await getPizzaPrice(priceId);
    displayResults("💵 Pizza Price", renderPizzaPrice(priceData, priceId));
  } catch (error) {
    showError(error);
  }
}

/**
 * Handler: Compute custom pizza price
 */
export async function handleComputeCustomPrice() {
  const ingredientsInput = getInputValue("customIngredients");

  if (!ingredientsInput) {
    displayResults(
      "⚠️ Input Required",
      '<div class="alert alert-warning"><i class="bi bi-exclamation-triangle-fill"></i> Please enter ingredients (e.g., 🍅,🧀,🍄)</div>'
    );
    return;
  }

  showLoading();
  try {
    const ingredients = ingredientsInput.split(",").map((i) => i.trim());
    const result = await computeCustomPizzaPrice(ingredients);
    displayResults(
      "🎨 Custom Pizza Price",
      renderCustomPizzaPrice(ingredients, result)
    );
  } catch (error) {
    showError(error);
  }
}
