/**
 * Main Application Entry Point
 * This file connects all modules and sets up event listeners
 * NO window object needed - we use proper event listeners instead!
 */

import { showInput } from "./ui.mjs";
import {
  handleGetAllPizzas,
  handleGetPizzaById,
  handleGetPizzasWithPrices,
  handleGetIngredientPrices,
  handleSearchPizzas,
  handleGetPizzaPrice,
  handleComputeCustomPrice,
} from "./handlers.mjs";

/**
 * Initialize the application
 * Sets up all event listeners when the page loads
 */
function initApp() {
  // Accordion toggle functionality (for custom price raw response)
  document.addEventListener("click", (e) => {
    if (e.target.matches(".accordion-button")) {
      const target = e.target.getAttribute("data-bs-target");
      if (target) {
        const collapse = document.querySelector(target);
        if (collapse) {
          collapse.classList.toggle("show");
        }
      }
    }
  });

  // Main action buttons
  document
    .getElementById("btn-get-all-pizzas")
    .addEventListener("click", handleGetAllPizzas);
  document
    .getElementById("btn-get-pizza-by-id")
    .addEventListener("click", () => showInput("byId"));
  document
    .getElementById("btn-get-pizzas-with-prices")
    .addEventListener("click", handleGetPizzasWithPrices);
  document
    .getElementById("btn-get-ingredient-prices")
    .addEventListener("click", handleGetIngredientPrices);
  document
    .getElementById("btn-search-by-ingredients")
    .addEventListener("click", () => showInput("search"));
  document
    .getElementById("btn-get-pizza-price")
    .addEventListener("click", () => showInput("price"));
  document
    .getElementById("btn-compute-custom-price")
    .addEventListener("click", () => showInput("custom"));

  // Submit buttons in input sections
  document
    .getElementById("submit-pizza-by-id")
    .addEventListener("click", handleGetPizzaById);
  document
    .getElementById("submit-search-pizzas")
    .addEventListener("click", handleSearchPizzas);
  document
    .getElementById("submit-pizza-price")
    .addEventListener("click", handleGetPizzaPrice);
  document
    .getElementById("submit-custom-price")
    .addEventListener("click", handleComputeCustomPrice);

  // Allow Enter key to submit forms
  document.getElementById("pizzaId").addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleGetPizzaById();
  });
  document
    .getElementById("searchIngredients")
    .addEventListener("keypress", (e) => {
      if (e.key === "Enter") handleSearchPizzas();
    });
  document.getElementById("priceId").addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleGetPizzaPrice();
  });
  document
    .getElementById("customIngredients")
    .addEventListener("keypress", (e) => {
      if (e.key === "Enter") handleComputeCustomPrice();
    });

  console.log("🍕 Pizza API Tester loaded successfully!");
  console.log("📦 Modules:");
  console.log("  - pizzaAPI.mjs: API communication");
  console.log("  - ui.mjs: User interface controls");
  console.log("  - renderer.mjs: HTML rendering");
  console.log("  - handlers.mjs: Event handlers");
  console.log("  - app.mjs: Application entry point");
  console.log("✅ Event listeners attached - NO window object pollution!");
}

// Wait for DOM to be ready, then initialize
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
