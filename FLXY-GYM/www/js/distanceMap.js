app.controller('distanceMapCtrl', function($scope, $ionicLoading, $state,  $ionicHistory) {
    /* currentLocation();*/
	$scope.goBack = function(){

    $ionicHistory.goBack();

}
 $scope.$on('$ionicView.enter', function () {
 var lat= localStorage.getItem("lat");
   var long = localStorage.getItem("long");
  
    var markers = [
             {
                 "title": "Rajmachi Trek",
                 "lat": "18.829891",
                 "lng": "73.39033",
                 "description": "A fort adjoining a historic trade route, Rajmachi (2,710ft) is one of the most exciting and enduring trekking trails around Pune. An 18km trail one way is nothing short of adventure with ancient Buddhist caves, waterfalls, lush greenery, temples, fort ruins that make this place a sought after trekking destination. A stronghold that has witnessed conquests of Shivaji and Mughals stands perched atop two mountain peaks - Shrivardhan and Manoranjan. Rocky routes, panoramic views of the Konkan plains and the backwaters of Shirota Dam are a few of the high points. Friendly locals and camping options at two caves within the fort premise make Rajmachi trek worthwhile.Udhewadi is the base of Rajmachi trek and the activity can be started from Tungarli near Lonavala or Kondivade Village near Karjat."
             }
         ,
         {
             "title": 'You are at',
             "lat": lat,
             "lng": long,
             "description": 'Current Location'
         }
    ];
    var latitude1 = parseInt("18.829891");
    var longitude1 = parseInt("73.39033");
    var latitude2 = parseInt(lat);
    var longitude2 = parseInt(long);
    $scope.distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(latitude1, longitude1), new google.maps.LatLng(latitude2, longitude2));
 //   alert(distance/1000 + "Km");

        var mapOptions = {
            center: new google.maps.LatLng(markers[0].lat, markers[0].lng),
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("dvMap"), mapOptions);
        var infoWindow = new google.maps.InfoWindow();
        var lat_lng = new Array();
        var latlngbounds = new google.maps.LatLngBounds();
        for (i = 0; i < markers.length; i++) {
            var data = markers[i]
            var myLatlng = new google.maps.LatLng(data.lat, data.lng);
            lat_lng.push(myLatlng);
            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                title: data.title
            });
            latlngbounds.extend(marker.position);
            (function (marker, data) {
                google.maps.event.addListener(marker, "click", function (e) {
                    infoWindow.setContent(data.title);
                    infoWindow.open(map, marker);
                });
            })(marker, data);
        }
        map.setCenter(latlngbounds.getCenter());
        map.fitBounds(latlngbounds);

        //***********ROUTING****************//

        //Initialize the Path Array
        var path = new google.maps.MVCArray();

        //Initialize the Direction Service
        var service = new google.maps.DirectionsService();

        //Set the Path Stroke Color
        var poly = new google.maps.Polyline({ map: map, strokeColor: '#4986E7' });

        //Loop and Draw Path Route between the Points on MAP
        for (var i = 0; i < lat_lng.length; i++) {
            if ((i + 1) < lat_lng.length) {
                var src = lat_lng[i];
                var des = lat_lng[i + 1];
                path.push(src);
                poly.setPath(path);
                service.route({
                    origin: src,
                    destination: des,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                }, function (result, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
                            path.push(result.routes[0].overview_path[i]);
                        }
                    }
                });
            }
        
    }
});
})