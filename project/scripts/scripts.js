// =========================================
// HAMBURGER NAVIGATION - FIXED VERSION
// =========================================

function setupNavigation() {
  const menuBtn = document.querySelector('#menu');
  const nav = document.querySelector('#primary-nav');

  if (!menuBtn || !nav) return;

  menuBtn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');

    menuBtn.classList.toggle('open', isOpen);

    menuBtn.setAttribute('aria-expanded', String(isOpen));

    menuBtn.setAttribute(
      'aria-label',
      isOpen ? 'Close navigation menu' : 'Open navigation menu'
    );
  });

  // Close menu on desktop resize
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 992) {
      nav.classList.remove('open');
      menuBtn.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.setAttribute('aria-label', 'Open navigation menu');
    }
  });
}

// =========================================
// INITIALIZATION
// =========================================


// --- CONFIG & DATA ARCHITECTURE ---
const CONFIG = {
  CART_KEY: 'eshop-cart',
  LAST_CONTACT_KEY: 'eshop-last-contact',
  CURRENCY: 'RWF',
  VAT_RATE: 0.18,
  DELIVERY_FEE: 2000,
};

const PRODUCTS = [
  {
    id: 1,
    name: 'Fresh Hass Avocados',
    category: 'groceries',
    price: 2400,
    oldPrice: 3000,
    image: 'images/avocados-small.webp',
    badge: '🔥 Hot Deal',
  },
  {
    id: 2,
    name: 'Wireless Bluetooth Headphones',
    category: 'electronics',
    price: 38250,
    oldPrice: 45000,
    image: 'images/headphones-small.webp',
    badge: '⭐ Top Pick',
  },
  {
    id: 3,
    name: 'Premium Rwandan Coffee Beans',
    category: 'coffee',
    price: 10800,
    oldPrice: 12000,
    image: 'images/coffee-small.webp',
    badge: '🔥 Hot Deal',
  },
];

// --- UTILITIES ---
const formatCurrency = (amount) =>
  `${CONFIG.CURRENCY} ${Math.round(amount).toLocaleString()}`;

// --- CART STATE MANAGEMENT ---
const CartStore = {
  get() {
    try {
      return JSON.parse(localStorage.getItem(CONFIG.CART_KEY)) || [];
    } catch {
      return [];
    }
  },

  save(cart) {
    localStorage.setItem(CONFIG.CART_KEY, JSON.stringify(cart));
  },

  clear() {
    localStorage.removeItem(CONFIG.CART_KEY);
  },

  addItem(productId) {
    const product = PRODUCTS.find((item) => item.id === productId);
    if (!product) return false;

    const cart = this.get();
    const existing = cart.find((item) => item.id === productId);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      });
    }

    this.save(cart);
    return true;
  },

  updateQuantity(productId, delta) {
    const cart = this.get();
    const item = cart.find((entry) => entry.id === productId);

    if (!item) return;

    item.quantity += delta;
    const updatedCart = cart.filter((entry) => entry.quantity > 0);

    this.save(updatedCart);
  },

  getTotals() {
    const cart = this.get();

    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const delivery = subtotal > 0 ? CONFIG.DELIVERY_FEE : 0;
    const vat = subtotal * CONFIG.VAT_RATE;
    const grandTotal = subtotal + delivery + vat;

    return { count, subtotal, delivery, vat, grandTotal };
  },
};

// --- UI RENDERERS ---
function updateCartWidget() {
  const { count, subtotal } = CartStore.getTotals();

  const countEl = document.querySelector('#cart-count');
  const totalEl = document.querySelector('#cart-total');

  if (countEl) countEl.textContent = count;
  if (totalEl) totalEl.textContent = formatCurrency(subtotal);
}

function renderProducts(category = 'all') {
  const grid = document.querySelector('#product-grid');
  if (!grid) return;

  const filtered =
    category === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((product) => product.category === category);

  grid.innerHTML = filtered
    .map(
      (product) => `
    <article class="product-card">
      <div class="product-badges">
        <span class="badge badge-hot">${product.badge}</span>
      </div>

      <img src="${product.image}"
           alt="${product.name}"
           width="400"
           height="300"
           loading="lazy">

      <div class="product-info">
        <h3>${product.name}</h3>
        <p class="price">
          <span class="old-price">${formatCurrency(product.oldPrice)}</span>
          <span class="new-price">${formatCurrency(product.price)}</span>
        </p>

        <button class="add-to-cart" data-id="${product.id}">
          Add to Cart
        </button>
      </div>
    </article>
  `
    )
    .join('');
}

function renderCartPage() {
  const container = document.querySelector('#cart-items');
  if (!container) return;

  const cart = CartStore.get();

  if (cart.length === 0) {
    container.innerHTML = `<p class="empty-cart">Your cart is currently empty.</p>`;
  } else {
    container.innerHTML = cart
      .map(
        (item) => `
      <article class="cart-item">
        <div>
          <h3>${item.name}</h3>
          <p>${formatCurrency(item.price)} × ${item.quantity}</p>
        </div>

        <div class="cart-actions">
          <button class="qty-btn" data-action="decrease" data-id="${item.id}">−</button>
          <span>${item.quantity}</span>
          <button class="qty-btn" data-action="increase" data-id="${item.id}">+</button>
        </div>
      </article>
    `
      )
      .join('');
  }

  // Update Cart Summaries
  const { subtotal, delivery, vat, grandTotal } = CartStore.getTotals();

  const updateElementText = (selector, val) => {
    const el = document.querySelector(selector);
    if (el) el.textContent = formatCurrency(val);
  };

  updateElementText('#subtotal', subtotal);
  updateElementText('#delivery-fee', delivery);
  updateElementText('#vat-total', vat);
  updateElementText('#grand-total', grandTotal);
}

function refreshUI() {
  updateCartWidget();
  renderCartPage();
}

// --- EVENT HANDLERS (Delegated) ---
function setupGlobalEvents() {
  // Handle "Add to Cart" using Event Delegation
  document.addEventListener('click', (event) => {
    const addToCartBtn = event.target.closest('.add-to-cart');
    if (addToCartBtn) {
      const id = Number(addToCartBtn.dataset.id);
      if (id > 0 && CartStore.addItem(id)) {
        addToCartBtn.textContent = 'Added ✓';
        refreshUI();
      } else {
        addToCartBtn.textContent = 'Unavailable';
      }
      return;
    }

    // Handle Quantity Changes (+ / -) using Event Delegation
    const qtyBtn = event.target.closest('.qty-btn');
    if (qtyBtn) {
      const id = Number(qtyBtn.dataset.id);
      const action = qtyBtn.dataset.action;
      const delta = action === 'increase' ? 1 : -1;

      CartStore.updateQuantity(id, delta);
      refreshUI();
    }
  });

  // Handle Clear Cart Button
  const clearBtn = document.querySelector('#clear-cart-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      CartStore.clear();
      refreshUI();
    });
  }
}

function setupFilters() {
  const filterContainer = document.querySelector('.filters') || document.body;

  filterContainer.addEventListener('click', (event) => {
    const filterBtn = event.target.closest('.filter-btn');
    if (!filterBtn) return;

    document
      .querySelectorAll('.filter-btn')
      .forEach((btn) => btn.classList.remove('active'));
    filterBtn.classList.add('active');

    renderProducts(filterBtn.dataset.category);
  });
}


function setupContactForm() {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.querySelector('#fullname')?.value.trim();
    const email = document.querySelector('#email')?.value.trim();
    const message = document.querySelector('#message')?.value.trim();

    if (!name || !email || !message) {
      alert('Please complete all required fields.');
      return;
    }

    localStorage.setItem(
      CONFIG.LAST_CONTACT_KEY,
      JSON.stringify({ name, email, message })
    );

    alert(`Thank you, ${name}! Your message has been sent.`);
    form.reset();
  });
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  setupGlobalEvents();
  setupNavigation();
  setupFilters();
  setupContactForm();

  renderProducts();
  refreshUI();
});

let currentCategory = 'all';
let currentStock = 'all';

function renderProducts(category = 'all', stock = 'all', search = '') {
  const grid = document.querySelector('#product-grid');
  if (!grid) return;

  let filtered = PRODUCTS;

  // Category filter
  if (category !== 'all') {
    filtered = filtered.filter(
      (product) => product.category === category
    );
  }

  // Availability filter
  if (stock === 'in-stock') {
    filtered = filtered.filter((product) => product.available);
  } else if (stock === 'out-of-stock') {
    filtered = filtered.filter((product) => !product.available);
  }

  // Search filter
  if (search.trim() !== '') {
    const term = search.toLowerCase();

    filtered = filtered.filter((product) =>
      product.name.toLowerCase().includes(term)
    );
  }

  if (filtered.length === 0) {
    grid.innerHTML = '<p class="empty-results">No products found.</p>';
    return;
  }

  grid.innerHTML = filtered
    .map(
      (product) => `
      <article class="product-card">
        <div class="product-badges">
          <span class="badge badge-hot">${product.badge}</span>
          <span class="stock ${product.available ? 'in-stock' : 'out-of-stock'}">
            ${product.available ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        <img src="${product.image}"
             alt="${product.name}"
             width="400"
             height="300"
             loading="lazy">

        <div class="product-info">
          <h3>${product.name}</h3>

          <p class="price">
            <span class="old-price">${formatCurrency(product.oldPrice)}</span>
            <span class="new-price">${formatCurrency(product.price)}</span>
          </p>

          <button
            class="add-to-cart"
            data-id="${product.id}"
            ${!product.available ? 'disabled' : ''}>
            ${product.available ? 'Add to Cart' : 'Unavailable'}
          </button>
        </div>
      </article>
    `
    )
    .join('');
}

function setupFilters() {
  // Category buttons
  document.addEventListener('click', (event) => {
    const categoryBtn = event.target.closest('.filter-btn');

    if (categoryBtn) {
      document
        .querySelectorAll('.filter-btn')
        .forEach((btn) => btn.classList.remove('active'));

      categoryBtn.classList.add('active');
      currentCategory = categoryBtn.dataset.category;

      const search =
        document.querySelector('#product-search')?.value || '';

      renderProducts(currentCategory, currentStock, search);
    }

    // Availability buttons
    const stockBtn = event.target.closest('.availability-btn');

    if (stockBtn) {
      document
        .querySelectorAll('.availability-btn')
        .forEach((btn) => btn.classList.remove('active'));

      stockBtn.classList.add('active');
      currentStock = stockBtn.dataset.stock;

      const search =
        document.querySelector('#product-search')?.value || '';

      renderProducts(currentCategory, currentStock, search);
    }
  });

  // Search input
  const searchInput = document.querySelector('#product-search');

  if (searchInput) {
    searchInput.addEventListener('input', (event) => {
      renderProducts(
        currentCategory,
        currentStock,
        event.target.value
      );
    });
  }
}

function setupFooter() {
  const modifiedEl = document.querySelector('#lastModified');

  if (modifiedEl) {
    modifiedEl.textContent =
      'Last Modified: ' + document.lastModified;
  }
}