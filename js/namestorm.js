var myApp = angular.module("myApp", ["firebase"]);

myApp.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});

myApp.controller('nameStormController', ['$scope', '$firebase',
	function($scope, $firebase) {
	  //CREATE A FIREBASE REFERENCE
	  var ref = new Firebase("https://namestorm.firebaseio.com/");

	  // GET ideas AS AN ARRAY
	  $scope.ideas = $firebase(ref).$asArray();

		$scope.toggleStar = function(idea) {
			//debugger;
			if(idea.starred){
				idea.starred = false;
			} else {
				idea.starred = true;
			}
			$scope.ideas.$save(idea);
		}
		
		$scope.toggleTrash = function(idea) {
			//debugger;
			if(idea.trashed){
				idea.trashed = false;
			} else {
				idea.trashed = true;
			}
			$scope.ideas.$save(idea);
		}
		
		$scope.emptyTrash = function(){
			angular.forEach($scope.ideas , function(idea){
				if( idea.trashed == true ){
					$scope.ideas.$remove(idea);
				}
			});
		}

	  //ADD MESSAGE METHOD
	  $scope.addIdea = function() {

	    //LISTEN FOR RETURN KEY
	    if ($scope.idea) {
	      //ALLOW CUSTOM OR ANONYMOUS USER NAMES

	      //ADD TO FIREBASE
	      $scope.ideas.$add({
	        title: $scope.idea
	      });

	      //RESET MESSAGE
	      $scope.idea = "";
	    }
	  }
	}
]);