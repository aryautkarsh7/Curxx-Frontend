This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Project commands

```bash
npm run format
npm run format:check
npm run lint
npm run test
```

## Run locally

```bash
npm install
cp .env.example .env     # defaults point at the local API
npm run dev              # http://localhost:3000
```

The site reads the API from `NEXT_PUBLIC_API_URL` (default `http://localhost:4000/api/v1`), so start
the API first (`npm run dev` in `../backend`, http://localhost:4000).

| Variable               | Meaning                                                            |
| ---------------------- | ------------------------------------------------------------------ |
| `NEXT_PUBLIC_API_URL`  | API base URL                                                       |
| `NEXT_PUBLIC_SITE_URL` | Canonical site origin                                              |
| `APP_ENV`              | `production` lets search engines index the site; anything else not |
| `SITE_URL`             | Optional server-side override of the canonical origin              |

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
