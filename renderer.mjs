/**
 * Renderer Module - Handles rendering of pizza data into HTML
 */

/**
 * Render pizzas in a Bootstrap card grid
 * @param {Array} pizzas - Array of pizza objects
 * @param {boolean} showPrice - Whether to display prices
 * @returns {string} - HTML string for pizza grid
 */
export function renderPizzaGrid(pizzas, showPrice = false) {
  return `
        <div class="row g-4">
            ${pizzas.map((pizza) => renderPizzaCard(pizza, showPrice)).join("")}
        </div>
        <div class="alert alert-info mt-4 mb-0">
            <i class="bi bi-info-circle-fill"></i> Total: <strong>${
              pizzas.length
            }</strong> pizza(s)
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
        <div class="col-md-6 col-lg-4">
            <div class="card h-100 shadow-sm border-0">
                <div class="card-body">
                    <h5 class="card-title fw-bold text-primary">${
                      pizza.name || "Unnamed Pizza"
                    }</h5>
                    <p class="card-text text-muted small">
                        <i class="bi bi-hash"></i> ID: ${pizza.id}
                    </p>
                    <div class="pizza-ingredients my-3">
                        ${
                          pizza.ingredients
                            ? pizza.ingredients.join(" ")
                            : "No ingredients"
                        }
                    </div>
                    ${showPrice && pizza.price ? renderPrice(pizza.price) : ""}
                </div>
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
  return `<div class="text-success fs-4 fw-bold">
            <i class="bi bi-currency-dollar"></i>${price}
        </div>`;
}

/**
 * Render ingredient prices grid
 * @param {Object} prices - Object with ingredient:price pairs
 * @returns {string} - HTML string for ingredient prices
 */
export function renderIngredientPrices(prices) {
  return `
        <div class="row g-4">
            ${Object.entries(prices)
              .map(([ingredient, price]) =>
                renderIngredientCard(ingredient, price)
              )
              .join("")}
        </div>
        <div class="alert alert-info mt-4 mb-0">
            <i class="bi bi-info-circle-fill"></i> Total: <strong>${
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
        <div class="col-md-6 col-lg-3">
            <div class="card text-center shadow-sm border-0">
                <div class="card-body">
                    <div class="pizza-ingredients mb-2">${ingredient}</div>
                    <div class="text-success fs-3 fw-bold">
                        <i class="bi bi-currency-dollar"></i>${price}
                    </div>
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
        <div class="row justify-content-center">
            <div class="col-md-8 col-lg-6">
                <div class="card shadow border-0">
                    <div class="card-body text-center p-4">
                        <h4 class="card-title text-primary fw-bold">${
                          priceData.name || "Pizza"
                        }</h4>
                        <p class="text-muted"><i class="bi bi-hash"></i> ID: ${priceId}</p>
                        ${
                          priceData.ingredients
                            ? `<div class="pizza-ingredients my-3">${priceData.ingredients.join(
                                " "
                              )}</div>`
                            : ""
                        }
                        <div class="display-4 text-success fw-bold mt-3">
                            <i class="bi bi-currency-dollar"></i>${
                              priceData.price
                            }
                        </div>
                    </div>
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
        <div class="row justify-content-center">
            <div class="col-md-8 col-lg-6">
                <div class="card shadow border-0">
                    <div class="card-body text-center p-4">
                        <h4 class="card-title text-danger fw-bold">Custom Pizza</h4>
                        <div class="pizza-ingredients my-3">${ingredients.join(
                          " "
                        )}</div>
                        <div class="display-4 text-success fw-bold mt-3">
                            <i class="bi bi-currency-dollar"></i>${
                              result.price || result.total || "N/A"
                            }
                        </div>
                        <div class="alert alert-info mt-4 mb-0">
                            <i class="bi bi-info-circle-fill"></i> 
                            <strong>Ingredients:</strong> ${
                              result.ingredients
                                ? result.ingredients.join(", ")
                                : ingredients.join(", ")
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="accordion mt-4" id="rawResponse">
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseRaw">
                        <i class="bi bi-code-square"></i> View Raw Response
                    </button>
                </h2>
                <div id="collapseRaw" class="accordion-collapse collapse" data-bs-parent="#rawResponse">
                    <div class="accordion-body">
                        <pre class="mb-0">${JSON.stringify(
                          result,
                          null,
                          2
                        )}</pre>
                    </div>
                </div>
            </div>
        </div>
    `;
}
