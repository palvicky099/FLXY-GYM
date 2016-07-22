app.controller('detailCtrl', function($scope, $cordovaDialogs, $state, $ionicLoading) {
	
    $scope.detailItem = JSON.parse(window.localStorage.getItem("itemDetails"));
	var msg ="This will do a booking for" + " "+$scope.detailItem.gymName + " " + "and center will contact you soon. Please go to My Booking to track the status";
	  $scope.reserve = function () {
            $cordovaDialogs.confirm(msg, 'Information', ['Cancel', 'Book'])
            .then(function (buttonIndex) {
            var btnIndex = buttonIndex;
            if(btnIndex == 1)
            {
            	
            }
            if(btnIndex==2)
                {
             $cordovaDialogs.confirm('Booking Confirmed is 343 entry to seats table is 445', 'Information', ['OK'])
            .then(function () {
            
             if(btnIndex == 1)
            {
            	$state.go('app.dashboard');
               $ionicLoading.show({
                 noBackdrop: false,
                template: '<p class="item flxy-button">Booking Confirm</p>',
                 content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                duration: 3000,
                maxWidth: 200,
                showDelay: 0
               });
               }
             });
            }
            });
            }
      
})
