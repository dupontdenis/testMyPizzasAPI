/**
 * UI Module - Handles all DOM manipulation and display
 */

/**
 * Create a delay promise (useful for minimum spinner time)
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise} - Promise that resolves after delay
 */
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Display results in the results section
 * @param {string} title - Title of the results
 * @param {string} content - HTML content to display
 */
export function displayResults(title, content) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = `
        <h4 class="mb-3">${title}</h4>
        ${content}
    `;
}

/**
 * Show loading spinner
 */
export function showLoading() {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = `
        <div class="text-center" style="padding: 3rem 0;">
            <div class="spinner-border"></div>
            <p style="margin-top: 1rem; color: #586069;">🍕 Fetching data from API...</p>
        </div>
    `;
}

/**
 * Fetch data with minimum loading time (prevents spinner flicker)
 * @param {Function} fetchFunction - Async function that fetches data
 * @param {number} minDelay - Minimum delay in milliseconds (default 1000ms)
 * @returns {Promise} - Promise that resolves with the fetched data
 */
export async function fetchWithMinDelay(fetchFunction, minDelay = 800) {
  const [data] = await Promise.all([fetchFunction(), delay(minDelay)]);
  return data;
}

/**
 * Show error message
 * @param {Error} error - Error object to display
 */
export function showError(error) {
  displayResults(
    "❌ Error",
    `<div class="alert alert-danger">
            ⚠️ <strong>Error:</strong> ${error.message}
        </div>`
  );
}

/**
 * Show/hide input sections
 * @param {string} type - Type of input section to show
 */
export function showInput(type) {
  // Hide all input sections
  document.querySelectorAll(".input-section").forEach((section) => {
    section.classList.remove("active");
  });

  // Show the selected input section
  const inputSection = document.getElementById(`input-${type}`);
  if (inputSection) {
    inputSection.classList.add("active");
  }
}

/**
 * Get input value from a field
 * @param {string} fieldId - ID of the input field
 * @returns {string} - Value from the input field
 */
export function getInputValue(fieldId) {
  return document.getElementById(fieldId).value.trim();
}
