
SOURCE : https://github.com/run-llama/chat-ui/tree/main/apps/web

Since this uses some [local workspace packages](./package.json#30) , I copied them as well from 
https://github.com/run-llama/chat-ui/tree/main/packages
to [packages](./packages/)

Note to include the workspace packages I had to copy another file defining it called [pnpm-workspace.yaml](./pnpm-workspace.yaml) and run `pnpm install` after that.


# Example app

Simple example app built with `@llamaindex/chat-ui` components.

## Get started

1. Set OpenAI API key

Make sure to either set the `OPENAI_API_KEY` environment variable or create a `.env` file with the key:

```bash
OPENAI_API_KEY=sk-...
```
If none of the OPEN_API_KEY is specified then a fake message generator will be used.


2. Install dependencies

```bash
pnpm install
```

3. Run the development server

```bash
pnpm run dev
```
