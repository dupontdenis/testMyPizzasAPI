/**
 * Pizza API Module
 * Fetches data from https://mypizzasapi.onrender.com/
 */

const BASE_URL = "https://mypizzasapi.onrender.com/API";

/**
 * Fetches all pizzas from the API
 * @returns {Promise<Array>} Array of pizza objects
 */
export async function getAllPizzas() {
  try {
    const response = await fetch(`${BASE_URL}/pizzas`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching all pizzas:", error);
    throw error;
  }
}

/**
 * Fetches a single pizza by ID
 * @param {number} id - The pizza ID
 * @returns {Promise<Object>} Pizza object
 */
export async function getPizzaById(id) {
  try {
    const response = await fetch(`${BASE_URL}/pizzas/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error(`Error fetching pizza with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Fetches all pizzas with their prices
 * @returns {Promise<Array>} Array of pizza objects with prices
 */
export async function getPizzasWithPrices() {
  try {
    const response = await fetch(`${BASE_URL}/pizzasWithPrices`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching pizzas with prices:", error);
    throw error;
  }
}

/**
 * Fetches ingredient prices
 * @returns {Promise<Object>} Object with ingredient prices
 */
export async function getIngredientPrices() {
  try {
    const response = await fetch(`${BASE_URL}/ingredientPrices`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching ingredient prices:", error);
    throw error;
  }
}

/**
 * Searches pizzas by ingredients
 * @param {Array<string>} ingredients - Array of ingredient emojis (e.g., ['🍅', '🍄'])
 * @returns {Promise<Array>} Array of matching pizza objects
 */
export async function searchPizzasByIngredients(ingredients) {
  try {
    const params = ingredients
      .map((ing) => `ingredient=${encodeURIComponent(ing)}`)
      .join("&");
    const response = await fetch(`${BASE_URL}/pizzas/search?${params}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error searching pizzas by ingredients:", error);
    throw error;
  }
}

/**
 * Fetches the price of a single pizza by ID
 * @param {number} id - The pizza ID
 * @returns {Promise<Object>} Price information
 */
export async function getPizzaPrice(id) {
  try {
    const response = await fetch(`${BASE_URL}/pizzasWithPrices/${id}/price`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error(`Error fetching price for pizza ${id}:`, error);
    throw error;
  }
}

/**
 * Computes the price of a custom pizza based on ingredients
 * @param {Array<string>} ingredients - Array of ingredient emojis
 * @returns {Promise<Object>} Price calculation result
 */
export async function computeCustomPizzaPrice(ingredients) {
  try {
    const response = await fetch(`${BASE_URL}/pizzasWithPrices/compute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error computing custom pizza price:", error);
    throw error;
  }
}

// Export all functions as a default object as well
export default {
  getAllPizzas,
  getPizzaById,
  getPizzasWithPrices,
  getIngredientPrices,
  searchPizzasByIngredients,
  getPizzaPrice,
  computeCustomPizzaPrice,
};
