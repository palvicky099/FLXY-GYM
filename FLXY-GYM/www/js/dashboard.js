app.controller('dashboardCtrl', function($cordovaGeolocation, $scope, $state, $ionicSideMenuDelegate) {
	$scope.$on('$ionicView.enter', function () {
 $scope.toggleLeftSideMenu = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
	$scope.dashList = [
	{
"categoryId":"1",
"categoryName":"CARDIO",
"categoryImg":"http://greatist.com/sites/default/files/styles/big_share/public/Tag_Cardio.png?itok=KuJ2JPk4",
	},
	{
"categoryId":"2",
"categoryName":"DANCE",
"categoryImg":"http://www.dancesofindia.co.in/images/Why-is-dance-better-than-traditional-workouts-Blogs-Way-of-Life-Studio-Mumbai.jpg",
	},
	{
"categoryId":"3",
"categoryName":"SPIN",
"categoryImg":"http://mycoachkat.com/wp-content/uploads/2016/04/CardioTextimg1.jpg",
	},
	{
"categoryId":"4",
"categoryName":"SWIM",
"categoryImg":"http://www.baronnews.com/wp-content/uploads/2012/04/swim.jpg",
	},
	{
"categoryId":"5",
"categoryName":"SPORTS",
"categoryImg":"http://health.uq.edu.au/filething/get-styled/study_area_hero_825x320/3683/Exercise-and-Sport-Sciences6.jpg?itok=5taM4M60",
	},
	{
"categoryId":"6",
"categoryName":"TONE",
"categoryImg":"http://hdwpro.com/wp-content/uploads/2016/02/Super-Sports-Wallpaper.jpg",
	},
	{
"categoryId":"7",
"categoryName":"YOGA",
"categoryImg":"http://i.dailymail.co.uk/i/pix/2014/12/22/2438B44700000578-2883729-Pot_yoga_-m-5_1419262687022.jpg",
	},
	{
"categoryId":"8",
"categoryName":"COMBAT",
"categoryImg":"http://www.courtlough.ie/wp-content/uploads/2013/03/IMG_4889.JPG",
	},
	{
"categoryId":"9",
"categoryName":"PILATES",
"categoryImg":"http://images.fitnessmagazine.mdpcdn.com/sites/fitnessmagazine.com/files/mat-pilates.jpg",
	}
	];
	$scope.goList=function(l){
    window.localStorage.setItem("itemCategory", JSON.stringify(l));
$state.go('list');
	}
 setTimeout(function () {
            current();
        },2000);
function current(){
  var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
            var lat  = position.coords.latitude
            var long = position.coords.longitude


             localStorage.setItem("lat", lat);
            localStorage.setItem("long", long);
            var lastLat=localStorage.getItem("lat");
            /*if(lat != lastLat)
            {
              var delOrder = "Delete from PlaceDetails";
           $cordovaSQLite.execute(db, delOrder, []).then(function (res) {
           }, function (err) {
        
          });
            }*/
    }, function(err) {
    });
}
})
})
app.directive('backImg', function(){
    return function(scope, element, attrs){
        var url = attrs.backImg;
        var content = element.find('a');
        content.css({
            'background': 'linear-gradient(rgba(0, 0, 0, 0.60),rgba(0, 0, 0, 0.60)),url(' + url +')',
            'background-size' : 'cover',
            'height':'100%',
              'border':'0px solid black'
        });
    }

});
    