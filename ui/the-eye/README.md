This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## decodeURIComponent()
This built-in function is used to handle special characters (like spaces) passed in a url.
For example:
If the url passed is domain.com/param1 param2
The url will render as domain.com/param1%20param2
The function will replace the %20 with a space
