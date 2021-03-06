import {renderStaticSite, addRendering} from "./static-site-renderer";

addRendering("index.html", `
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta httpEquiv="x-ua-compatible" content="ie=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>
  </head>
  <body>
    <script src="main.js" charset="UTF-8"></script>
  </body>
</html>
`);

export = renderStaticSite