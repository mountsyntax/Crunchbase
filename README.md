### Demo Crunchbase Application

This is a sample project built to showcase AngularJS development against the [Crunchbase API](https://developer.crunchbase.com/docs).

It makes use of the following frameworks/tools:

* [jQuery](http://jquery.com/)
* [AngularJS](https://angularjs.org/)
* [MaterializeCSS](http://materializecss.com/)
* [Node.js](https://nodejs.org/)
* [Express](http://expressjs.com/)
* [crunchbase2](https://www.npmjs.com/package/crunchbase2)

The application's API runs in a Node wrapper to hide the API key from the client code and to wrap the cross domain requests outside of the browser.

#####Running the Application

**Note:** This application requires Node.js to be installed.

* Clone the repo and navigate to the directory
* _npm install_ the application to fetch all the requirements
* You will need your own Crunchbase key to utilize this project. It should be placed in _/keys.js_ and have the following format
```javascript
exports.crunchbase = '<your key>';
```
* _node server.js_ to run the application
