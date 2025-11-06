/**
 * Simple Example: Get All Pizzas
 * This is a simplified version showing the core functionality
 * without error handling - perfect for learning the basics!
 */

// Step 1: Import functions from modules
import { getAllPizzas } from "./pizzaAPI.mjs"; // API communication
import { displayResults, showLoading, fetchWithMinDelay } from "./ui.mjs"; // UI utilities
import { renderPizzaGrid } from "./renderer.mjs"; // HTML rendering

// Step 2: Show loading spinner while fetching
showLoading();

// Step 3: Fetch pizzas (with minimum delay handled by UI)
const pizzas = await fetchWithMinDelay(getAllPizzas);

// Step 4: Render pizzas as HTML and display in the page
displayResults("📋 All Pizzas", renderPizzaGrid(pizzas));
