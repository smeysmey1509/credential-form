# React + TypeScript + Vite

## Testing product sorting with Postman

Use the filter endpoint to verify the additional sort aliases that were added for the product list.

1. Start the API locally so that it listens on port `5002` (the default exported by `src/main/server.ts`).
2. In Postman, create a new `GET` request pointed at:

   ```text
   http://localhost:5002/api/v1/products?sort=price_low_to_high&limit=10&page=1
   ```

3. Add the required headers:

   | Header       | Value                                  |
   | ------------ | -------------------------------------- |
   | `x-api-key`  | The API key configured in `.env`       |
   | `Authorization` (optional) | `Bearer <JWT token>` if you want to test with a specific user |

4. Send the request. A successful response will return the paginated product list sorted by the alias you provided in the `sort` query parameter.

Common aliases you can try in the `sort` parameter include:

| Alias example           | Description                         |
| ----------------------- | ----------------------------------- |
| `price_low_to_high`     | Price ascending                     |
| `price_high_to_low`     | Price descending                    |
| `newest`                | Newest products first               |
| `oldest`                | Oldest products first               |
| `most_relate`           | Relevance (rating & sales weighted) |
| `sort_by`               | Default sorting (newest first)      |

You can swap in any of the supported aliases shown above (including the misspelled `most_releate`) to confirm that the API normalizes and applies the appropriate sort order.

## Searching and filtering products

The same `/api/v1/products` endpoint accepts several optional query parameters that let you narrow down the list beyond sorting. Mix and match the filters below to build the product feed you need.

### Keyword search

Use any of the following keys to perform a full-text search across the product name, brand, description, and tags: `search`, `q`, `keyword`, or `query`.

```text
GET http://localhost:5002/api/v1/products?search=wireless+headphones
```

When a keyword is supplied the API automatically boosts the results using MongoDB's text score. You can still include a `sort` parameter, for example `sort=price_high_to_low`, if you want to apply a secondary ordering.

### Category, brand, and seller filters

Pass one or more identifiers (comma-separated or repeated parameters) to limit results to specific entities:

| Filter       | Accepted values                                           |
|--------------|-----------------------------------------------------------|
| `category`, `categories`, `categoryId`, `categoryIds` | ObjectId, `categoryId`, or category name |
| `brand`, `brands`, `brandId`                        | MongoDB ObjectId values                      |
| `seller`, `sellers`, `sellerId`                     | MongoDB ObjectId values                      |

Example:

```text
GET http://localhost:5002/api/v1/products?category=Electronics&brandId=64f5b2c1a4e0f1234567890a
```

### Availability and merchandising flags

Boolean filters accept `true/false`, `1/0`, `yes/no`, and similar values:

| Parameter               | Behaviour                                    |
|-------------------------|----------------------------------------------|
| `inStock` or `available`| `true` shows only products with inventory     |
| `featured`/`isFeatured` | Limits to featured products                  |
| `trending`/`isTrending` | Limits to trending products                  |
| `isAdult`/`adult`       | Filters by adult-only flag                   |
| `isHazardous`/`hazardous` | Filters by hazardous-material flag        |

### Numeric ranges

Provide minimum and/or maximum values to filter on price or rating:

| Parameter                       | Description                                 |
|---------------------------------|---------------------------------------------|
| `minPrice`, `priceMin`          | Lowest acceptable product price             |
| `maxPrice`, `priceMax`          | Highest acceptable product price            |
| `minRating`                     | Minimum average rating (0-5 scale)          |

Example URL combining several filters:

```text
GET http://localhost:5002/api/v1/products?search=monitor&minPrice=200&maxPrice=600&minRating=4&inStock=true
```

### Direct identifiers and tags

| Parameter                 | Description                          |
|---------------------------|--------------------------------------|
| `ids`                     | Filter by MongoDB `_id` values       |
| `productId`, `productIds` | Filter by custom product IDs         |
| `slug`, `slugs`           | Filter by product slugs              |
| `tag`, `tags`             | Match any of the provided tags       |

You can combine these filters with pagination controls (`page`, `limit`) and the sort aliases described earlier to create precisely targeted product lists for dashboards, storefronts, or reporting tools.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
