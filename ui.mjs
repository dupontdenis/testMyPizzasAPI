/**
 * UI Module - Handles all DOM manipulation and display
 */

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
