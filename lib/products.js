export const CATEGORIES = ['electronics', 'clothing', 'home'];

const img = (n) => `/products/${n}.png`;
const mk = (id, title, price, group, slug, description, rating = 4.5, featured = false) =>
  ({ id, title, price, group, rating, description, featured, thumbnail: img(slug), images: [img(slug)] });

const PRODUCTS = [
  mk(1, 'Running Shoes', 99, 'clothing', 'running-shoes', 'Lightweight running shoes with a cushioned white sole and breathable knit upper for everyday training.'),
  mk(2, 'Wireless Headphones', 99, 'electronics', 'wireless-headphones', 'Comfortable wireless headphones with rich sound and long battery life.'),
  mk(3, 'Backpack', 129, 'clothing', 'backpack', 'Durable everyday backpack with a padded laptop sleeve and roomy front pocket.'),
  mk(4, 'Smartwatch', 249, 'electronics', 'smartwatch', 'Smartwatch with a bright display, fitness tracking and notifications on your wrist.'),
  mk(5, 'Sunglasses', 149, 'clothing', 'sunglasses', 'Classic dark sunglasses with UV-protective lenses and a lightweight frame.'),
  mk(6, 'Digital Camera', 499, 'electronics', 'digital-camera', 'Compact digital camera with sharp optics for crisp photos and video.'),
  mk(7, 'T-shirt', 29, 'clothing', 't-shirt', 'Soft cotton crew-neck t-shirt in a relaxed everyday fit.'),
  mk(8, 'Smartphone', 699, 'electronics', 'smartphone', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 4.5, true),
];

export async function getProducts() { return PRODUCTS; }
export async function getProduct(id) { return PRODUCTS.find((p) => p.id === Number(id)) || null; }
