angular.module("jsonviewer", [])
.controller('MainController', function() {
  this.objectBuffer = { 
    title: "Sample Object", 
    sampleArray: [
      { "title": "arrayObject"}, 
      "is", 
      "a", 
      "sample", 
      "array",
      123,
      new Date()
      ], 
      subObject: {
        title: 'subObject',
        nothing: null
      }
     };
  this.leftPanelContent = 'Left panel';
  this.rightPanelContent = angular.toJson(this.objectBuffer, true);
  console.log(this.objectBuffer);
  this.jsonChanged = function () {
    try{
      var vFromJson = angular.fromJson(this.rightPanelContent);
      this.objectBuffer = vFromJson;
    } catch (aError) {
      console.log(aError.message);
    }
  }
  this.objectChanged = function(aParent) {
    console.log(aParent);
    this.rightPanelContent = angular.toJson(this.objectBuffer, true);
  }

  this.changeContent = function () {
    this.rightPanelContent = "";
  }

  this.getTemplate = function(aProperty) {
    if (_.isArray(aProperty))
      return 'array.html';
    else if (_.isString(aProperty))
      return 'string.html';
    else if (_.isDate(aProperty))
      return 'date.html';
    else if (_.isObject(aProperty))
      return 'object.html';
    else if (_.isNumber(aProperty))
      return 'number.html';
    else if (_.isNull(aProperty))
      return 'null.html';
  }
})
.directive('contenteditable', ['$sce', function($sce) {
  return {
    restrict: 'A', // only activate on element attribute
    require: '?ngModel', // get a hold of NgModelController
    link: function(scope, element, attrs, ngModel) {
      if (!ngModel) return; // do nothing if no ng-model

      // Specify how UI should be updated
      ngModel.$render = function() {
        element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
      };

      // Listen for change events to enable binding
      element.on('blur keyup change', function() {
        scope.$evalAsync(read);
      });
      read(); // initialize

      // Write data to the model
      function read() {
        var html = element.html();
        // When we clear the content editable the browser leaves a <br> behind
        // If strip-br attribute is provided then we strip this out
        if (attrs.stripBr && html === '<br>') {
          html = '';
        }
        ngModel.$setViewValue(html);
      }
    }
  };
}]);