# 🍕 Pizza API Tester - Learning Project

An educational project demonstrating **modern JavaScript ES6 modules** and **asynchronous programming** by interacting with a Pizza API.

## 📚 Learning Goals

This project teaches:

- ✅ **ES6 Modules** (`import`/`export`)
- ✅ **Async/Await** patterns
- ✅ **Fetch API** for HTTP requests
- ✅ **Separation of Concerns** (modular architecture)
- ✅ **Event Listeners** (no inline onclick)
- ✅ **Vanilla CSS** (no frameworks)
- ✅ **DOM Manipulation**
- ✅ **Error Handling**

---

## 📁 Project Structure

```
testMyPizzasAPI/
├── index.html          # Main UI
├── styles-blog.css     # Clean blog-style CSS (default)
├── styles.css          # Alternative gradient style
├── app.mjs             # Application initialization (entry point)
├── pizzaAPI.mjs        # API communication layer
├── handlers.mjs        # Event handlers (business logic)
├── renderer.mjs        # HTML rendering functions
└── ui.mjs              # DOM manipulation utilities
```

---

## 🏗️ Architecture Overview

### **Layered Architecture**

```
┌─────────────────────────────────────────┐
│           index.html (UI)               │
│         (Vanilla CSS/JS)                │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│            app.mjs (Init)               │
│      Event Listeners Setup              │
└────┬────────────────────────────────┬───┘
     │                                │
┌────▼─────────────┐       ┌──────────▼────┐
│  handlers.mjs    │       │   ui.mjs       │
│  (Business Logic)│       │   (DOM Utils)  │
└────┬─────────┬───┘       └────────────────┘
     │         │
┌────▼────┐ ┌──▼─────────┐
│renderer │ │ pizzaAPI   │
│  .mjs   │ │   .mjs     │
│(Render) │ │  (API)     │
└─────────┘ └────────────┘
```

---

## 📖 Module Descriptions

### **1. pizzaAPI.mjs** - API Communication Layer

**Purpose:** Handles all HTTP requests to the Pizza API.

**Exports 7 functions:**

```javascript
export async function getAllPizzas()
export async function getPizzaById(id)
export async function getPizzasWithPrices()
export async function getIngredientPrices()
export async function searchPizzasByIngredients(ingredients)
export async function getPizzaPrice(id)
export async function computeCustomPizzaPrice(ingredients)
```

**Key Concepts:**

- ✅ `async/await` for asynchronous operations
- ✅ `fetch()` API for HTTP requests
- ✅ Error handling with try/catch
- ✅ JSON parsing with `response.json()`

**Example:**

```javascript
// Import the function
import { getAllPizzas } from "./pizzaAPI.mjs";

// Use it
const pizzas = await getAllPizzas();
console.log(pizzas);
```

---

### **2. ui.mjs** - DOM Manipulation Utilities

**Purpose:** Provides reusable functions for updating the UI.

**Exports 5 functions:**

```javascript
export function displayResults(title, content)
export function showLoading()
export function showError(error)
export function showInput(type)
export function getInputValue(fieldId)
```

**Key Concepts:**

- ✅ Direct DOM manipulation with `getElementById`
- ✅ Template literals for HTML generation
- ✅ Custom CSS classes for styling
- ✅ Separation of UI logic from business logic

**Example:**

```javascript
import { showLoading, displayResults } from "./ui.mjs";

// Show loading spinner
showLoading();

// Display results after API call
displayResults("Pizza List", "<div>HTML content here</div>");
```

---

### **3. renderer.mjs** - HTML Rendering Functions

**Purpose:** Converts data into HTML markup.

**Exports 4 functions:**

```javascript
export function renderPizzaGrid(pizzas, showPrice = false)
export function renderIngredientPrices(prices)
export function renderPizzaPrice(priceData, priceId)
export function renderCustomPizzaPrice(ingredients, result)
```

**Key Concepts:**

- ✅ Pure functions (no side effects)
- ✅ Template literals for HTML generation
- ✅ `Array.map()` for transforming data
- ✅ Responsive grid with CSS Grid
- ✅ Helper functions (not exported) for internal use

**Example:**

```javascript
import { renderPizzaGrid } from "./renderer.mjs";

const pizzas = [{ name: "Margherita", id: "123", ingredients: ["🍅", "🧀"] }];
const html = renderPizzaGrid(pizzas, true);
// Returns HTML string with custom card styling
```

---

### **4. handlers.mjs** - Event Handlers

**Purpose:** Contains business logic for button clicks and form submissions.

**Exports 7 handlers:**

```javascript
export async function handleGetAllPizzas()
export async function handleGetPizzaById()
export async function handleGetPizzasWithPrices()
export async function handleGetIngredientPrices()
export async function handleSearchPizzas()
export async function handleGetPizzaPrice()
export async function handleComputeCustomPrice()
```

**Key Concepts:**

- ✅ Coordinates between API, UI, and rendering layers
- ✅ Input validation before API calls
- ✅ Error handling with try/catch
- ✅ Async functions for API calls

**Example:**

```javascript
export async function handleGetAllPizzas() {
  showLoading(); // Step 1: Show loading
  try {
    const pizzas = await getAllPizzas(); // Step 2: Fetch data
    const html = renderPizzaGrid(pizzas); // Step 3: Render HTML
    displayResults("All Pizzas", html); // Step 4: Display
  } catch (error) {
    showError(error); // Step 5: Handle errors
  }
}
```

---

### **5. app.mjs** - Application Initialization

**Purpose:** Entry point that sets up event listeners.

**Exports 1 function:**

```javascript
export function initApp()
```

**Key Concepts:**

- ✅ Event listeners with `addEventListener` (no inline `onclick`)
- ✅ DOMContentLoaded event for initialization
- ✅ Clean separation from global scope (no `window` pollution)

**Example:**

```javascript
document
  .getElementById("btnGetAll")
  .addEventListener("click", handleGetAllPizzas);
```

**Why not `window.functionName`?**

❌ **Old Way (Bad):**

```javascript
window.testGetAllPizzas = function() { ... }
// Pollutes global scope, hard to maintain
```

✅ **New Way (Good):**

```javascript
import { handleGetAllPizzas } from "./handlers.mjs";
document
  .getElementById("btnGetAll")
  .addEventListener("click", handleGetAllPizzas);
// Clean, modular, testable
```

---

## 🚀 How to Run

1. **Open `index.html` in a browser**

   - ⚠️ Must use a web server (not `file://`) for ES6 modules
   - Use VS Code Live Server extension, or:

2. **Using Python:**

   ```bash
   python -m http.server 8000
   # Visit http://localhost:8000
   ```

3. **Using Node.js:**
   ```bash
   npx http-server
   # Visit http://localhost:8080
   ```

---

## 🎯 API Endpoints

Base URL: `https://mypizzasapi.onrender.com/API`

| Endpoint             | Method | Description                  |
| -------------------- | ------ | ---------------------------- |
| `/pizzas`            | GET    | Get all pizzas               |
| `/pizzas/:id`        | GET    | Get pizza by UUID            |
| `/pizzasWithPrices`  | GET    | Get pizzas with prices       |
| `/ingredient-prices` | GET    | Get all ingredient prices    |
| `/search`            | POST   | Search pizzas by ingredients |
| `/pizzas/:id/price`  | GET    | Get price for specific pizza |
| `/custom-price`      | POST   | Calculate custom pizza price |

---

## 🧪 Testing the API

### **Example 1: Get All Pizzas**

1. Click **"Get All Pizzas"** button
2. See grid of pizza cards
3. Each card shows: name, ID, ingredients

### **Example 2: Get Pizza By ID**

1. Click **"Get Pizza By ID"** button
2. Enter UUID: `b3b9d1f2-5c3e-45d7-8b27-2f1a6b2e5c22`
3. Press Enter or click button again
4. See single pizza details

### **Example 3: Search Pizzas**

1. Click **"Search Pizzas"** button
2. Enter ingredients: `🍅,🧀`
3. Press Enter
4. See pizzas containing tomato and cheese

---

## 💡 Key Learning Points

### **1. ES6 Modules**

**Export:**

```javascript
// pizzaAPI.mjs
export async function getAllPizzas() { ... }
```

**Import:**

```javascript
// handlers.mjs
import { getAllPizzas } from "./pizzaAPI.mjs";
```

### **2. Async/Await**

```javascript
// Wait for API response
const response = await fetch(url);
const data = await response.json();
return data;
```

### **3. Event Listeners**

```javascript
// Attach event listener
button.addEventListener("click", handlerFunction);

// NOT: <button onclick="handlerFunction()">
```

### **4. Separation of Concerns**

- **pizzaAPI.mjs** → Talks to API
- **ui.mjs** → Updates DOM
- **renderer.mjs** → Creates HTML
- **handlers.mjs** → Coordinates logic
- **app.mjs** → Sets up events

Each module has **one responsibility**!

---

## 🐛 Common Issues

### **Problem: "Failed to load module script"**

**Solution:** Must use a web server (not `file://`)

```bash
python -m http.server 8000
```

### **Problem: "CORS error"**

**Solution:** API must support CORS (this one does!)

### **Problem: UUID input doesn't work**

**Solution:** Use `type="text"` not `type="number"` for UUID inputs

---

## 🎓 Next Steps for Learning

1. **Add more validation** (create `validation.mjs`)
2. **Add constants** (create `constants.mjs`)
3. **Add utility functions** (create `utils.mjs`)
4. **Add localStorage** (save favorite pizzas)
5. **Add filtering** (filter by price range)
6. **Add sorting** (sort by name, price)
7. **Add tests** (unit tests with Jest)

---

## 📝 Code Style Guide

### **Function Naming**

- `handle*` → Event handlers (handlers.mjs)
- `render*` → HTML generators (renderer.mjs)
- `get*` → API calls (pizzaAPI.mjs)
- `show*` / `display*` → UI updates (ui.mjs)

### **File Naming**

- `.mjs` → ES6 module files
- Lowercase with camelCase

### **Comments**

- JSDoc for all exported functions
- Explain **why**, not **what**

---

## 🔗 Resources

- [MDN: JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [MDN: Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MDN: Async/Await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await)
- [MDN: CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)

---

## 👨‍🏫 For Instructors

This project demonstrates:

- Modern JavaScript (ES6+)
- Modular architecture
- Async programming
- RESTful API consumption
- Event-driven programming
- Responsive design with CSS Grid

**Perfect for teaching:**

- Web Development courses
- JavaScript courses
- API Integration
- Frontend Architecture

---

## 📄 License

Educational use only. Pizza API provided by [mypizzasapi.onrender.com](https://mypizzasapi.onrender.com/)

---

**Made with 🍕 for learning JavaScript modules!**
