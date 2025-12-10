# Elevatech Product Catalog

A fully dynamic and responsive product catalog system built for Elevatech. This project includes real-time product filtering, search, sorting, lazy loading, and a Quick View modal—everything rendered through clean, modular JavaScript. Designed to scale easily and integrate with backend APIs in the future.

## 🚀 Features

**Dynamic Product Rendering**
All product cards are generated from a JavaScript data structure.

**Interactive Quick View Modal**
Users can preview product details instantly without leaving the page.

**Smart Filters & Search**
Category filter, real-time search, and sort controls.

**Load More Pagination**
Gradually reveals more items for improved performance.

**Responsive Layout**
Designed to look and feel great across devices.

**Modular, Maintainable Codebase**
HTML, CSS, and JS kept clean and scalable.

## 🛠️ Technologies Used

- HTML5  
- CSS3  
- Vanilla JavaScript  
- Font Awesome Icons 

## 📦 Installation

### Option 1 — Open Directly
Clone the repository and open `index.html` in your browser.

```bash
git clone https://github.com/your-username/elevatech-products.git

cd elevatech-products
open index.html
```
### Option 2 — Use VS Code Live Server
1. Install “Live Server” extension  
2. Right-click `index.html`  
3. Select **Open with Live Server**

## 🧩 Adding Products

Products are managed in `products-script.js`.

Each product follows this structure:

```js
{
  id: 1,
  title: "Room Automation Panel",
  category: "iot",
  description: "Smart room control panel with lighting, HVAC, and guest features.",
  price: "Contact for Quote",
  img: "assets/images/panel.jpg",
  specs: [
    "Touch Display",
    "Voice Control",
    "Energy Monitoring"
  ],
  icon: "fas fa-plug"
}
```
## 📤 Deployment

### GitHub Pages

1. Go to your repository **Settings**
2. Open **Pages**
3. Select:
    - Branch: ['main']
    - Folder: ['/root']
4. Save
    Your site will be published automatically.

### Alternatives

- Netlify
- Vercel
- Cloudflare Pages

## 📄 License

This project is licensed under the MIT License.

