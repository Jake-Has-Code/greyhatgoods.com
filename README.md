# GreyHatGoods

The storefront runs as a standalone Next.js application packaged with Docker.

## Run with Docker Compose

1. Optionally create `.env` from `.env.example` and set the Stripe Payment Link.
2. Build and start the site:

   ```sh
   docker compose up --build -d
   ```

3. Open <http://localhost:3000>.

Stop it with:

```sh
docker compose down
```

`NEXT_PUBLIC_STRIPE_PAYMENT_LINK` is embedded into the browser bundle while the image is built. Rebuild the image after changing it.

## Run without Docker

```sh
npm ci
npm run dev
```

For a local production build, use `npm run build` followed by `npm start`.
