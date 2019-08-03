# bookSearch

A fullstack MERN app that searches for book information on google books and then allows the user to save items returned from google books. The saved information can be seen on another page, and items can be deleted

## Special features (see design notes)

* theme changing between light and dark using css variables
* custom buttons. Similar to material design, but some changes
* customized search button. Hidden until user enters text

## Technologies

* MERN stack
  * Mongodb
  * express
  * react
  * node
* chai
* chai-http
* mocha
* reactstrap (react bootstrap library, I only used the modal)
* bootstrap (cdn) Mostly used for grid
* lodash (only used .get() method - see design notes under debug)
* axios
* html
* javascript
* css

## Deployment (heroku)

<https://hidden-bayou-86482.herokuapp.com/>

Heroku will take 10-20 seconds to open the app as it suspends it when not in use and then has to restart

There is some sample data that can be viewed in the saved books


## Github repository

<https://github.com/johnlobster/booksearch.git>

## Local installation

```bash
git clone https://github.com/johnlobster/bookSearch
cd bookSearch
```

Development server can be started using
```
npm run start
```

No additional configs are required

#### heroku deployment

```bash
heroku create
```
Go to heroku page and add mongodb

Get mongo uri for heroku
```
heroku config:get MONGODB_URI
```
Should be automatically configured on heroku page


```
git push heroku master
```
Check the log from this command, if the build is clean the heroku page will now be working. To check the server logs and see that nothing has crashed
```
heroku logs --tail
```
the `--tail` option continuously views the last lines of the heroku log. You will be able to see any console.log
statements left in the server code and a lot of things that heroku logs

I had a couple of issues
* would not install because I had changed the (server) package.json file `install` script to `install:client` when I had to re-install node-modules. That was a bad idea. This is the correct .json file
```json
"scripts": {
    "start": "if-env NODE_ENV=production && npm run start:prod || npm run start:dev",
    "start:prod": "node server.js",
    "start:dev": "concurrently \"nodemon --ignore 'client/*'\" \"npm run client\"",
    "client": "cd client && npm run start",
    "install": "cd client && npm ci",
```
* crashed because I required a file "books.js" but I had named the file "Books.js". This worked fine on Windows but not on the linux that heroku runs
* because of above I tried a couple of things from web page suggestions that then needed to be undone

## Design notes

#### Responsive design
The basic layout uses bootstrap grid (flexbox) in layout with different column sizes at different screen widths. The page title in the header has a font-height of `9vw` which is 9% of the viewport width, so that the page title shrinks in size as the viewport shrinks

#### Light/dark theme 
In `src/scripts/globals.css` css variables are defined for each theme, for instance
```css
/* light theme */
body.themeA {
  --boxShadowColor : rgb(156, 156, 156);
  --modalShadowColor : rgb(59, 57, 57);
...
/* dark theme */
body.themeB {
  --boxShadowColor : transparent;
  --modalShadowColor : transparent;
...
```
The main `index.html` was modified to add a class to `<body>`, that is used to switch modes
```html
<body class="themeA">
```
Individual elements are then styled to use the css variables, for instance 
```css
.HeaderSurroundingBox {
  position: relative; /* has to be explicitly included or z-index will not be applied */
  box-shadow: 0 0.3rem 6px var(--boxShadowColor);
}
```
The class of the <body> component can then be changed from one theme to another by the following javascript which
is run when the theme button is toggled. `newTheme` is a string argument with the new theme name. Code for this is in the `Header` module. It's generally a bad idea to access the DOM directly from  a react component, but in this case the function is very clear and does not impact anything else. The color changes cascade through the document very quickly, no components are re-rendered.
```js
document.getElementsByTagName("body")[0].className = newTheme;
```
The selectors in the global css are `body.<theme name>` which looks for a class `<theme name>` on the body component, and will then change the css variables from one them to another.

For the light theme, I added a box-shadow at the bottom of the header so that it appears to be above the rest of the content. To make this work, have to set `position: relative` in the header div, otherwise z-index will not be used and the box shadow will not appear. This is required, even though it inherits this property from it's parent.
The box shadow did not look good in dark mode, so the color variable is set to transparent in dark mode.

Originally I picked a div in App.js, gave it an id and set classes on this in the same way. The limitation of
this was that the css variables are "cascading" and don't appear at any level above that div, so could not style body for example. More importantly, the reactstrap modal inserts html at the top level, under `<body>` and so css
variables cannot be referenced.

#### Custom buttons

I created my own button css for this project. I made buttons similar to material properties buttons, with the
wave motion on click. On hover, the button grows a little, a shadow is added and the color gets a little brighter.
This is composed of the following elements
* basic styling: padding, rounded corners, a small caps font "Alegreya Sans SC". Colors are not included, they are defined when the button is instanced, using a specific class that references css variables
* :focus disable outline. It seems like this is part of default button styling and is not overwritten by the bootstrap reset. On click, a border appears around the button, which does not disappear until something else is clicked. I see this issue with bootstrap buttons. It may be specific to chrome
* wave motion. a ::after psuedo property is used to create a white elliptical gradient that fades out. By default this is enlarged by 20 times so does not affect the button as it uses  uses `overflow: hidden` as a basic style. On click (:active) the gradient is shrunk to normal size and then expands slowly so that a wave effect is seen. A `:enabled` selector is used so that it doesn't show the effect when the button is disabled (:enabled/:disabled are intended for forms but also work for buttons).
* :hover uses simple transitions, but the selector used is `.buttonGlobal:hover:enabled` so that hover doesn't have any effect if the button is disabled. I might add a color transform for :disabled so that disabled buttons (on navigation menu for instance) look different when disabled.

#### Search button

This is a variant on the custom buttons. When disabled (set the `disabled` attribute) the button disappears and text telling the user to start typing in the form input boxes appears. This was done using a `::before` psuedo-property. The idea here is that the search button is not visible until there is valid information in the form. It would have been simpler to render text/search/searching based on a state variable. 

#### Debug

Debug was generally difficult because each part of MERN has it's own strange way of running and reporting errors so it took a long time to find the root cause of any issue. In addition there are some subtle differences between how things run in development and production.

* **mongodb not running** I used mocha/chai to test my server api routes (see `test/t1_userCRUD.js`). At one point my PC reset and the mongodb server had stopped. There was no error from `mongoose.connect` even though I used a `.then/.catch` structure. This took a long time to figure out as I was expecting it to be a problem with the chai test code, or the route/controller server code.

* **mongodb/mongoose** Throws an error if it finds a type discrepancy. This happened a couple of times. One was the test "Delete a book with wrong id". I had to copy a mongodb id from somewhere else to make it work

* **promises in react javascript** I made a mistake in a `.then/.then/.catch` sequence. Instead of breaking there,
it executed both branches of another promise that was passing a function to where I made the script error. This then gave the appearance of two responses being returned from the server api

* **react reserved words** For example `class` is a reserved word in javascript and `className` has to be used. I ran into trouble because `for` is also a reserved word, but is also a valid html attribute, used in forms/labels. `htmlFor` has to be used instead - it took an awful lot of google searching to find that.

* **react properties/attributes** When a component is instanced, it looks as though it is a piece of html, but each attribute/class is a react object and defining it is sometimes difficult, especially when using javascript in `{}` sections, if they go in the wrong place then it doesn't work. I wanted to create an attribute `disabled` to use with a button. You cannot do this by adding "disabled" as an attribute. It has to be defined as disabled=true (or false to remove the attribute). `data-something="something else"` is ok. Another example is using an image. You have to import the image, for instance 
```js
import banana from "../images/banana.jpg";
```
The name "banana" is a react object, and can be used in an `<img>` with `src=banana`, but the string "banana" cannot be used instead, even though the src attribute is normally passed a url string. Unless an image is used in this way, react/webpack will not include it in the `/media` directory so that it cannot be accessed by the browser.

* **react synthetic events** react wraps a javascript event to create a synthetic event. This is not well documented (couldn't find any) and therefore accessing event properties on a button press is very hard. In the example we had `const { name, value } = event.target` to access the `name` and `value` attributes on a form. However, to access `data-*` attribute on a button, for instance `data-button="saved"` the following pattern is needed - `event.currentTarget.dataset.button`. I don't understand why currentTarget instead of target (both exist in javascript event). `dataset` accesses the `data-*` variables, so the whole expression will return `"saved"` in this example. This is not documented and took a **lot** of google searching to find out what was going on.

* **javascript throwing error on accessing undefined variable** When the data returns from Google books API, some
fields some throws an error. There is not completely robust solution to this. I thought the lodash `.isUndefined()` method would work but it also threw an error. I discovered that there was lodash method `.get(<object>, <property>, <default value>)` method that worked perfectly. 
```js
const image = lodashGet(bookDetails, "volumeInfo.imageLinks.thumbnail", "");
```
Hopefully `create-react-scripts` doesn't include the whole lodash library. I renamed the .get() function as I thought that be mistaken for a getter property of an object. I thought about pasting the lodash code into the component, but .get() calls several other lodash functions.
```js
import * as lodashGet from "lodash/get";
```


