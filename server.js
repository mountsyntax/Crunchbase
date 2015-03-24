var express = require('express');
var keys = require('./keys');
var crunchbase = require('crunchbase2');

var app = express();
app.use(express.static(__dirname + '/public'));

crunchbase.init(keys.crunchbase);

// route mapper function
app.map = function (a, route) {
  route = route || '';
  for (var key in a) {
    switch (typeof a[key]) {
      case 'object':
        app.map(a[key], route + key);
        break;
      case 'function':
        app[key](route, a[key]);
        break;
    }
  }
};

app.map({
  '/api': {
    '/orgs': {
      'get': function (req, res) {
        crunchbase.organizations({}, function (error, results) {
          if (!error) {
            res.send(results) // send the search results 
          }
        });
      },
      '/bypage/:pageid': {
        'get': function (req, res) {
          crunchbase.organizations({ page: req.params.pageid }, function (error, results) {
            if (!error) {
              res.send(results) // send the search results 
            }
          });
        }
      },
      '/organizations/:orgid': {
        'get': function (req, res) {
          crunchbase.organization(req.params.orgid, function(error, results) {
            if (!error) {
              res.send(results) // send the search results 
            }
          });
        }
      }
    },
    '/people': {
      'get': function (req, res) {
        crunchbase.people({}, function (error, results) {
          if (!error) {
            res.send(results) // send the search results 
          }
        });
      },
      '/bypage/:pageid': {
        'get': function (req, res) {
          crunchbase.people({ page: req.params.pageid }, function (error, results) {
            if (!error) {
              res.send(results) // send the search results 
            }
          });
        }
      },
      '/person/:personid': {
        'get': function (req, res) {
          crunchbase.person(req.params.personid, function (error, results) {
            if (!error) {
              res.send(results) // send the search results 
            }
          });
        }
      }
    },
    '/products': {
      'get': function (req, res) {
        crunchbase.products({}, function (error, results) {
          if (!error) {
            res.send(results) // send the search results 
          }
        });
      },
      '/bypage/:pageid': {
        'get': function (req, res) {
          crunchbase.products({ page: req.params.pageid }, function (error, results) {
            if (!error) {
              res.send(results) // send the search results 
            }
          });
        }
      },
      '/product/:productid': {
        'get': function (req, res) {
          crunchbase.product(req.params.productid, function (error, results) {
            if (!error) {
              res.send(results) // send the search results 
            }
          });
        }
      }
    }
  }
});


app.get('*', function (req, res) {
  res.sendFile('./public/index.html', { "root": __dirname });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('server listening at http://%s:%s', host, port);
});
