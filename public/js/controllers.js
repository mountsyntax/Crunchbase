'use strict';

/* Controllers */
var crunchbaseControllers = angular.module('crunchbase.controllers', []);

/* Organization List */

var OrgsController = (function () {
  function OrgsController($scope, $http) {
    this.$scope = $scope;
    this.$http = $http;
    var _this = this;

    $scope.orgs = [];
    $scope.pages = 1;
    $scope.vm = this;

    $http.get('/api/orgs').success(function (res) {
      _this.$scope.pages = res.data.paging['number_of_pages'];
      _this.$scope.orgs = res.data.items.slice(0, 50); // it returns sooooooooooo many
    });

  }

  OrgsController.prototype.goToPage = function (pageNum) {
    var _this = this;

    $('.pagination li.active').removeClass('active');
    $('.pagination #orgsP' + pageNum).addClass('active');

    _this.$scope.orgs = [];

    this.$http.get('/api/orgs/bypage/' + pageNum).success(function (res) {
      _this.$scope.orgs = res.data.items.slice(0, 50);
    });
  }

  OrgsController.$inject = [
      '$scope',
      '$http'
  ];

  return OrgsController;
})();

crunchbaseControllers.controller('OrgsListCtrl', OrgsController);

/* Org Details */

var OrgDetailsController = (function () {
  function OrgDetailsController($scope, $http, $routeParams) {
    this.$scope = $scope;
    this.$http = $http;
    var _this = this;

    $scope.meta = {};
    $scope.org = {};
    $scope.web = {};
    $scope.categories = {};
    $scope.comments = {};
    $scope.team = {};
    $scope.board = {};
    $scope.acquisitions = {};
    $scope.competitors = {};
    $scope.news = {};
    $scope.products = {};
    $scope.funding = {};
    $scope.investors = {};
    $scope.vm = this;

    $http.get('api/orgs/organizations/' + $routeParams.orgid).success(function (res) {
      _this.$scope.meta = res.metadata;
      _this.$scope.org = res.data.properties;
      // build the header image src
      _this.$scope.org.image = res.metadata['image_path_prefix'] + res.data.relationships['primary_image'].items[0].path;

      _this.$scope.web = res.data.relationships['websites'].items;
      _this.$scope.categories = res.data.relationships['categories'].items;
      _this.$scope.comments = orgComments;
      _this.$scope.team = res.data.relationships['current_team'].items;
      _this.$scope.board = res.data.relationships['board_members_and_advisors'].items;
      _this.$scope.acquisitions = res.data.relationships['acquisitions'].items;
      _this.$scope.competitors = res.data.relationships['competitors'].items;
      _this.$scope.news = res.data.relationships['news'].items;
      _this.$scope.products = res.data.relationships['products'].items;
      _this.$scope.funding = res.data.relationships['funding_rounds'].items;
      _this.$scope.investors = res.data.properties.investors;

      _this.$scope.meta.people = (_this.$scope.investors.length || 0) +
        (_this.$scope.team.length || 0) + (_this.$scope.board.length || 0);

      _this.$scope.meta.intel = (_this.$scope.acquisitions.length || 0) +
        (_this.$scope.competitors.length || 0) + (_this.$scope.funding.length || 0);
    });
  }

  OrgDetailsController.prototype.toggle = function (element) {
    $('#' + element + '-body').slideToggle();
  }

  OrgDetailsController.$inject = [
      '$scope',
      '$http',
      '$routeParams'
  ];
  return OrgDetailsController;
})();

crunchbaseControllers.controller('OrgDetailsCtrl', OrgDetailsController);

/* People List */

var PeopleController = (function () {
  function PeopleController($scope, $http) {
    this.$scope = $scope;
    this.$http = $http;
    var _this = this;

    $scope.people = [];
    $scope.pages = 1;
    $scope.vm = this;

    $http.get('/api/people').success(function (res) {
      _this.$scope.pages = res.data.paging['number_of_pages'];
      _this.$scope.people = res.data.items.slice(0, 50); // it returns sooooooooooo many
    });
  }

  PeopleController.prototype.goToPage = function (pageNum) {
    var _this = this;

    $('.pagination li.active').removeClass('active');
    $('.pagination #peopleP' + pageNum).addClass('active');

    _this.$scope.people = [];

    this.$http.get('/api/people/bypage/' + pageNum).success(function (res) {
      _this.$scope.people = res.data.items.slice(0, 50);
    });
  }

  PeopleController.$inject = [
      '$scope',
      '$http'
  ];

  return PeopleController;
})();

crunchbaseControllers.controller('PeopleListCtrl', PeopleController);

/* Person Details */

var PersonDetailsController = (function () {
  function PersonDetailsController($scope, $http, $routeParams) {
    this.$scope = $scope;
    this.$http = $http;
    var _this = this;

    $scope.vm = this;

    $scope.meta = {};
    $scope.person = {};
    $scope.web = {};
    $scope.founded = {};
    $scope.experience = {};
    $scope.degrees = {};
    $scope.news = {};

    $http.get('api/people/person/' + $routeParams.personid).success(function (res) {
      _this.$scope.meta = res.metadata;
      _this.$scope.person = res.data.properties;
      // build the header image src
      _this.$scope.person.image = res.metadata['image_path_prefix'] + res.data.relationships['primary_image'].items[0].path;

      _this.$scope.web = res.data.relationships['websites'].items;
      _this.$scope.founded = res.data.relationships['founded_companies'].items;
      _this.$scope.experience = res.data.relationships['experience'].items;
      _this.$scope.degrees = res.data.relationships['degrees'].items;
      _this.$scope.news = res.data.relationships['news'].items;
    });
  }

  PersonDetailsController.prototype.toggle = function (element) {
    $('#' + element + '-body').slideToggle();
  }

  PersonDetailsController.$inject = [
      '$scope',
      '$http',
      '$routeParams'
  ];
  return PersonDetailsController;
})();

crunchbaseControllers.controller('PersonDetailsCtrl', PersonDetailsController);

/* Products List */

var ProductsController = (function () {
  function ProductsController($scope, $http) {
    this.$scope = $scope;
    this.$http = $http;
    var _this = this;

    $scope.products = [];
    $scope.pages = 1;
    $scope.vm = this;

    $http.get('/api/products').success(function (res) {
      _this.$scope.pages = res.data.paging['number_of_pages'];
      _this.$scope.products = res.data.items.slice(0, 50); // it returns sooooooooooo many
    });
  }

  ProductsController.prototype.goToPage = function (pageNum) {
    var _this = this;

    $('.pagination li.active').removeClass('active');
    $('.pagination #productsP' + pageNum).addClass('active');

    _this.$scope.products = [];

    this.$http.get('/api/products/bypage/' + pageNum).success(function (res) {
      _this.$scope.products = res.data.items.slice(0, 50);
    });
  }

  ProductsController.$inject = [
      '$scope',
      '$http'
  ];

  return ProductsController;
})();

crunchbaseControllers.controller('ProductListCtrl', ProductsController);

/* Product Details */

var ProductDetailsController = (function () {
  function ProductDetailsController($scope, $http, $routeParams) {
    this.$scope = $scope;
    this.$http = $http;
    var _this = this;

    $scope.vm = this;
  
    $scope.meta = {};
    $scope.product = {};
    $scope.web = {};
    $scope.news = {};

    $http.get('api/products/product/' + $routeParams.productid).success(function (res) {
      _this.$scope.meta = res.metadata;
      _this.$scope.product = res.data.properties;
      // build the header image src
      _this.$scope.product.image = res.metadata['image_path_prefix'] + res.data.relationships['primary_image'].items[0].path;

      _this.$scope.web = res.data.relationships['websites'].items;
      _this.$scope.news = res.data.relationships['news'].items;
    });
  }

  ProductDetailsController.prototype.toggle = function (element) {
    $('#' + element + '-body').slideToggle();
  }

  ProductDetailsController.$inject = [
      '$scope',
      '$http',
      '$routeParams'
  ];
  return ProductDetailsController;
})();

crunchbaseControllers.controller('ProductDetailsCtrl', ProductDetailsController);

/* A Bunch of Fake Comments for the Org Details UI */

var orgComments = [
  {
    by: "Alphonse",
    date: "2015-03-21",
    title: "A Must Have Product",
    content: "These guys have changed my life! I had no clue how empty my life was until I used their product. Never going back to the old way again.",
    replies: [
      {
        by: "Richard",
        date: "2015-03-22",
        title: "These Guys are Crooks",
        content: "They call it disruptive sharing technology but they just wrapped the old school business with new language. They should be forced to follow the rules everyone else does.",
        replies: [
          {
            by: "Alphonse",
            date: "2015-03-23",
            title: "You Fail to See the Brilliance",
            content: "These guys have reduced the pain we all felt doing it the old way. The rules are old and don't fit with the way people want to use it.",
            replies: []
          }
        ]
      },
      {
        by: "Sauron",
        date: "2015-03-22",
        title: "Tricksy Hobbitses",
        content: "They have my ring but I will send my armies to crush them and bring it back.",
        replies: []
      }
    ]
  },
  {
    by: "Doug",
    date: "2015-03-20",
    title: "I think they have a hit",
    content: "I have been following companies for my entire life. Their visionary product is filling a need I didn't even know I had. These guys are the next must have product and I would love to get in on the ground floor.",
    replies: []
  },
  {
    by: "Maria",
    date: "2015-03-20",
    title: "Retire tomorrow by working from home!",
    content: "My cousin Velma makes $eleventybillion per day working from home with this totally not a scam. Click on this link http://totally.notascam.r0yalbank..cx/installmalware.exe to find out how you too can retire tomorrow.",
    replies: [
      {
        by: "Alphonse",
        date: "2015-03-21",
        title: "Get this Spam out of here!",
        content: "Hey mods, you need to get this junk off of this site.",
        replies: []
      }
    ]
  },

];
