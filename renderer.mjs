/**
 * Renderer Module - Handles rendering of pizza data into HTML
 */

/**
 * Render pizzas in a card grid
 * @param {Array} pizzas - Array of pizza objects
 * @param {boolean} showPrice - Whether to display prices
 * @returns {string} - HTML string for pizza grid
 */
export function renderPizzaGrid(pizzas, showPrice = false) {
  return `
        <div class="row">
            ${pizzas.map((pizza) => renderPizzaCard(pizza, showPrice)).join("")}
        </div>
        <div class="alert alert-info">
            ℹ️ Total: <strong>${pizzas.length}</strong> pizza(s)
        </div>
    `;
}

/**
 * Render a single pizza card
 * @param {Object} pizza - Pizza object
 * @param {boolean} showPrice - Whether to display price
 * @returns {string} - HTML string for pizza card
 */
function renderPizzaCard(pizza, showPrice) {
  return `
        <div class="card">
            <div class="card-body">
                <h5>${pizza.name || "Unnamed Pizza"}</h5>
                <p class="muted">
                    🆔 ID: ${pizza.id}
                </p>
                <div class="pizza-ingredients">
                    ${
                      pizza.ingredients
                        ? pizza.ingredients.join(" ")
                        : "No ingredients"
                    }
                </div>
                ${showPrice && pizza.price ? renderPrice(pizza.price) : ""}
            </div>
        </div>
    `;
}

/**
 * Render price display
 * @param {number} price - Price value
 * @returns {string} - HTML string for price
 */
function renderPrice(price) {
  return `<div style="color: #28a745; font-size: 1.5rem; font-weight: bold;">
            💵 $${price}
        </div>`;
}

/**
 * Render ingredient prices grid
 * @param {Object} prices - Object with ingredient:price pairs
 * @returns {string} - HTML string for ingredient prices
 */
export function renderIngredientPrices(prices) {
  return `
        <div class="row">
            ${Object.entries(prices)
              .map(([ingredient, price]) =>
                renderIngredientCard(ingredient, price)
              )
              .join("")}
        </div>
        <div class="alert alert-info">
            ℹ️ Total: <strong>${
              Object.keys(prices).length
            }</strong> ingredient(s)
        </div>
    `;
}

/**
 * Render a single ingredient card
 * @param {string} ingredient - Ingredient emoji
 * @param {number} price - Ingredient price
 * @returns {string} - HTML string for ingredient card
 */
function renderIngredientCard(ingredient, price) {
  return `
        <div class="card">
            <div class="card-body" style="text-align: center;">
                <div class="pizza-ingredients">${ingredient}</div>
                <div style="color: #28a745; font-size: 1.8rem; font-weight: bold;">
                    💵 $${price}
                </div>
            </div>
        </div>
    `;
}

/**
 * Render single pizza price detail
 * @param {Object} priceData - Pizza price data
 * @param {string} priceId - Pizza ID
 * @returns {string} - HTML string for price detail
 */
export function renderPizzaPrice(priceData, priceId) {
  return `
        <div class="card" style="max-width: 600px; margin: 0 auto;">
            <div class="card-body" style="text-align: center; padding: 2rem;">
                <h4>${priceData.name || "Pizza"}</h4>
                <p class="muted">🆔 ID: ${priceId}</p>
                ${
                  priceData.ingredients
                    ? `<div class="pizza-ingredients">${priceData.ingredients.join(
                        " "
                      )}</div>`
                    : ""
                }
                <div style="color: #28a745; font-size: 2.5rem; font-weight: bold; margin-top: 1rem;">
                    💵 $${priceData.price}
                </div>
            </div>
        </div>
    `;
}

/**
 * Render custom pizza price with raw JSON accordion
 * @param {Array} ingredients - Array of ingredients
 * @param {Object} result - API result object
 * @returns {string} - HTML string for custom pizza price
 */
export function renderCustomPizzaPrice(ingredients, result) {
  return `
        <div class="card" style="max-width: 600px; margin: 0 auto;">
            <div class="card-body" style="text-align: center; padding: 2rem;">
                <h4 style="color: #d1242f;">Custom Pizza</h4>
                <div class="pizza-ingredients">${ingredients.join(" ")}</div>
                )}</div>
                <div style="color: #28a745; font-size: 2.5rem; font-weight: bold; margin-top: 1rem;">
                    💵 $${result.price || result.total || "N/A"}
                </div>
                <div class="alert alert-info" style="margin-top: 1rem;">
                    ℹ️ <strong>Ingredients:</strong> ${
                      result.ingredients
                        ? result.ingredients.join(", ")
                        : ingredients.join(", ")
                    }
                </div>
            </div>
        </div>
        <div class="accordion" id="rawResponse">
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseRaw">
                        💻 View Raw Response
                    </button>
                </h2>
                <div id="collapseRaw" class="accordion-collapse collapse" data-bs-parent="#rawResponse">
                    <div class="accordion-body">
                        <pre>${JSON.stringify(result, null, 2)}</pre>
                    </div>
                </div>
            </div>
        </div>
    `;
}
