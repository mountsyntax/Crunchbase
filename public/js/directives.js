'use strict';

var directives = angular.module('crunchbase.directives', []);

function commentBlockDirective(RecursionHelper) {
  return {
    restrict: 'E',
    templateUrl: 'partials/widgets/comment.html',
    compile: function (element) {
      return RecursionHelper.compile(element);
    }
  };
}
directives.directive('commentBlock', commentBlockDirective);

function degreeBlockDirective() {
  return {
    restrict: 'E',
    templateUrl: 'partials/widgets/degreeBlock.html',
    replace: true
  };
}
directives.directive('degreeBlock', degreeBlockDirective);

function experienceBlockDirective() {
  return {
    restrict: 'E',
    templateUrl: 'partials/widgets/experienceBlock.html',
    replace: true
  };
}
directives.directive('experienceBlock', experienceBlockDirective);

function investorBlockDirective() {
  return {
    restrict: 'E',
    templateUrl: 'partials/widgets/investorBlock.html',
    replace: true
  };
}
directives.directive('investorBlock', investorBlockDirective);

function organizationBlockDirective() {
  return {
    restrict: 'E',
    templateUrl: 'partials/widgets/organizationBlock.html',
    replace: true
  };
}
directives.directive('organizationBlock', organizationBlockDirective);

function personBlockDirective() {
  return {
    restrict: 'E',
    templateUrl: 'partials/widgets/personBlock.html',
    replace: true
  };
}
directives.directive('personBlock', personBlockDirective);

function productBlockDirective() {
  return {
    restrict: 'E',
    templateUrl: 'partials/widgets/productBlock.html',
    replace: true
  };
}
directives.directive('productBlock', productBlockDirective);

function starBlockDirective() {
  return {
    restrict: 'E',
    templateUrl: 'partials/widgets/star.html',
    replace: true,
    controller: function ($scope, $element) {
      $scope.clicked = false;

      $scope.handleClick = function () {
        if ($scope.clicked) {
          $element.children('i').removeClass('starred').addClass('unstarred');
        }
        else {
          $element.children('i').removeClass('unstarred').addClass('starred');
        }

        $scope.clicked = !$scope.clicked;
      }
    }
  };
}
directives.directive('starBlock', starBlockDirective);


function webLinkDirective() {
  return {
    restrict: 'E',
    templateUrl: 'partials/widgets/weblink.html',
    replace: true,
    link: function (scope, element, attribute) {
      scope.site.use_generic = false;

      if (scope.site.title === 'twitter' ||
        scope.site.title === 'facebook' ||
        scope.site.title === 'linkedin' ||
        scope.site.title === 'pinterest' ||
        scope.site.title === 'instagram') {
        scope.site.icon = scope.site.title;
      }
      else if (scope.site.title === 'google+') {
        scope.site.icon = 'google';
      }
      else {
        scope.site.use_generic = true;
      }
      
    }
  }
}
directives.directive('webLink', webLinkDirective);

/*
 * Recursion helper for managing the comments recursion 
 * Shamelessly borrowed from http://stackoverflow.com/questions/14430655/recursion-in-angular-directives
 */

directives.factory('RecursionHelper', ['$compile', function ($compile) {
  return {
    /**
     * Manually compiles the element, fixing the recursion loop.
     * @param element
     * @param [link] A post-link function, or an object with function(s) registered via pre and post properties.
     * @returns An object containing the linking functions.
     */
    compile: function (element, link) {
      // Normalize the link parameter
      if (angular.isFunction(link)) {
        link = { post: link };
      }

      // Break the recursion loop by removing the contents
      var contents = element.contents().remove();
      var compiledContents;
      return {
        pre: (link && link.pre) ? link.pre : null,
        /**
         * Compiles and re-adds the contents
         */
        post: function (scope, element) {
          // Compile the contents
          if (!compiledContents) {
            compiledContents = $compile(contents);
          }
          // Re-add the compiled contents to the element
          compiledContents(scope, function (clone) {
            element.append(clone);
          });

          // Call the post-linking function, if any
          if (link && link.post) {
            link.post.apply(null, arguments);
          }
        }
      };
    }
  };
}]);

