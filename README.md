# Using this repo in development

The `src` directory is where all of project client-side JavaScript code live. The file `src/start.js` is the entry point for our React application. All other files I use will either be imported by `start.js` or imported by files that are imported `start.js` (or imported by files that are imported by files that are imported by `start.js`, etc.).

To run our app in development, we need to start two servers.

1. `bundle-server.js` - this server will listen on port 8081 and does nothing but compile the code in `src/start.js` and its dependencies into a single bundle which it serves from the url `/bundle.js`. It uses [`webpack-dev-middleware`](https://github.com/webpack/webpack-dev-middleware) to do this. This middleware keeps all the compiled files in memory and doesn't ever write a file to disk. Every time we edit one of the files in our bundle, it detects the change and automatically recompiles. Thus, we do not have to restart this process every time we make a change to one of our client-side JavaScript files. After a change is saved, the updated `/bundle.js` will be available automatically.

2. `index.js` - this server listens on port 8080 and it is where all our normal express stuff should go. When `index.js` is running in development, requests for `/bundle.js` will cause a request to be made to `http://localhost:8081/bundle.js` and the result served (it uses the [`http-proxy-middleware`](https://github.com/chimurai/http-proxy-middleware) to do this). We can restart this server every time we make a server-side change and not have to wait for `bundle.js` to recompile before we can test the change.
