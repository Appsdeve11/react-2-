
// Backend API endpoints (not real API's)
const API_ENDPOINTS = {
  snacks: "https://api.com/snacks",
  drinks: "https://api.com/drinks",
  add: "https://api.com/add"
};

// Generic component for displaying a list of items
class ItemList {
  constructor(endpoint) {
    this.endpoint = endpoint;
    this.items = [];
  }

  async fetchItems() {
    try {
      const response = await fetch(this.endpoint);
      this.items = await response.json();
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  }

  render() {
    const itemListElement = document.createElement("ul");
    this.items.forEach(item => {
      const itemElement = document.createElement("li");
      const linkElement = document.createElement("a");
      linkElement.href = `/${item.type}/${item.id}`;
      linkElement.textContent = item.name;
      itemElement.appendChild(linkElement);
      itemListElement.appendChild(itemElement);
    });
    return itemListElement;
  }
}

// the home page
class HomePage {
  constructor() {
    this.snacksList = new ItemList(API_ENDPOINTS.snacks);
    this.drinksList = new ItemList(API_ENDPOINTS.drinks);
  }

  async render() {
    await Promise.all([this.snacksList.fetchItems(), this.drinksList.fetchItems()]);
    const rootElement = document.getElementById("root");
    const snacksCountElement = document.createElement("p");
    snacksCountElement.textContent = `Snacks: ${this.snacksList.items.length}`;
    const drinksCountElement = document.createElement("p");
    drinksCountElement.textContent = `Drinks: ${this.drinksList.items.length}`;
    rootElement.appendChild(snacksCountElement);
    rootElement.appendChild(drinksCountElement);
  }
}

// item's details
class ItemDetails {
  constructor(endpoint) {
    this.endpoint = endpoint;
    this.item = null;
  }

  async fetchItem() {
    try {
      const response = await fetch(this.endpoint);
      this.item = await response.json();
    } catch (error) {
      console.error("Error fetching item details:", error);
    }
  }

  render() {
    const rootElement = document.getElementById("root");
    if (this.item) {
      const itemElement = document.createElement("div");
      const nameLabel = document.createElement("strong");
      nameLabel.textContent = "Name: ";
      const nameValue = document.createElement("span");
      nameValue.textContent = this.item.name;
      itemElement.appendChild(nameLabel);
      itemElement.appendChild(nameValue);
      rootElement.appendChild(itemElement);
    } else {
      const notFoundElement = document.createElement("h2");
      notFoundElement.textContent = "Item not found";
      rootElement.appendChild(notFoundElement);
    }
  }
}

// adding a new item
class AddItem {
  constructor() {
    this.form = document.createElement("form");
    const nameLabel = document.createElement("label");
    nameLabel.textContent = "Name:";
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameLabel.appendChild(nameInput);
    const typeLabel = document.createElement("label");
    typeLabel.textContent = "Type:";
    const typeSelect = document.createElement("select");
    const snackOption = document.createElement("option");
    snackOption.value = "snacks";
    snackOption.textContent = "Snack";
    const drinkOption = document.createElement("option");
    drinkOption.value = "drinks";
    drinkOption.textContent = "Drink";
    typeSelect.appendChild(snackOption);
    typeSelect.appendChild(drinkOption);
    typeLabel.appendChild(typeSelect);
    const addButton = document.createElement("button");
    addButton.type = "submit";
    addButton.textContent = "Add";
    addButton.addEventListener("click", this.handleSubmit.bind(this));
    this.form.appendChild(nameLabel);
    this.form.appendChild(typeLabel);
    this.form.appendChild(addButton);
  }

  handleSubmit(event) {
    event.preventDefault();
    const nameInput = this.form.querySelector("input");
    const typeSelect = this.form.querySelector("select");
    const name = nameInput.value;
    const type = typeSelect.value;
    if (name && type) {
      this.addItem(name, type);
      nameInput.value = "";
    }
  }

  addItem(name, type) {
    // Send a POST request to the add endpoint with the name and type
    // Handle the response or any errors
    console.log("Adding item:", name, type);
  }

  render() {
    const rootElement = document.getElementById("root");
    rootElement.appendChild(this.form);
  }
}

// Router to handle page navigation
class Router {
  constructor() {
    this.routes = {
      "/": new HomePage(),
      "/snacks": new ItemList(API_ENDPOINTS.snacks),
      "/drinks": new ItemList(API_ENDPOINTS.drinks),
      "/add": new AddItem()
    };
  }

  navigate(path) {
    const route = this.routes[path];
    if (route) {
      const rootElement = document.getElementById("root");
      rootElement.innerHTML = "";
      route.render();
    } else {
      this.navigateToNotFound();
    }
  }

  navigateToNotFound() {
    const rootElement = document.getElementById("root");
    rootElement.innerHTML = "<h2>Page not found</h2>";
  }
}

// Initialize the router and handle navigation
const router = new Router();
const handleNavigation = (event) => {
  event.preventDefault();
  const path = event.target.getAttribute("href");
  router.navigate(path);
};
const navLinks = document.querySelectorAll("nav a");
navLinks.forEach(link => link.addEventListener("click", handleNavigation));
router.navigate(window.location.pathname);
