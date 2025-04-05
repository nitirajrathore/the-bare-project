# Whats Next??
1. [done] Add aliases to the static ratios. This is required because, "Market Capitalization" by default is shown as "Market Cap" in default list. But when selected from 'Edit Ratios', it shows up as 'Mar Cap'. Similarly by default 'Price to Earning' are shown as 'Stock P/E' but when explicitly selected it is shown as 'Price to Earning'

2. Make the config for time series fields.

    1. Confirm that timeseries metrices with `-` in their name works correctly. 

3. There is no operator precedence between operators. So if >= 100 -> blue and == 121 -> green, it is difficult to say if the value of 121 will appear blue or green. Fix this. Low priority

    1. Do not let one metric to be set multiple times in configs. 

    

## install and configure

1. Tailwind

2. Chrome types
```
npm install --save-dev @types/chrome
```

3. Shadcn
```
## DOES NOT WORK as my project has custom structure I guess.
pnpm dlx shadcn@latest init
```

Following the [manual instructions](https://ui.shadcn.com/docs/installation/manual)
```
pnpm add class-variance-authority clsx tailwind-merge lucide-react tw-animate-css
```

#### install origin ui components
```
pnpm dlx shadcn@latest add https://originui.com/r/comp-229.json
```

### install tsconfig webpack plugin to handle the alias (@) in path.
```
pnpm add -D tsconfig-paths-webpack-plugin
```

## Using the template 

the-bare-project/chrome_extension/react_chrome_extension/tutorial-react-ts-chrome-extension


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
