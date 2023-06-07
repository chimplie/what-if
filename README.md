What If?
========

A simple LLM-powered app that collect information about user's company by having a friendly conversation about the 
company future. 

Prerequisites
-------------

- `Node.js` version `>=16`
- `OpenAI` [API key](https://platform.openai.com/account/api-keys)

Installation
------------

Install dependencies

```shell
npm install
```

Create `.env` file from [template](./.env.template) if not exist or review its contents

```shell
cp -n .env.template .env
```

> **Note!**
>
> For simplicity, we've marked unsecure parameters with `~~~ChangeMe!~~~` and those which requires setting with
> `~~~WON'T__WORK!!!~~~`.

Run development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

Deployment
----------

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
