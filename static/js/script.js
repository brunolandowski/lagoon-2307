// MAP
if($("#map-api").length == 0) {
  //it doesn't exist
} else {
  var locations = [
    ['France', 47.357421, 1.934137, 4],
    ['USA', 39.284965, -75.849443, 5],
    ['Spain', 40.898537, -2.548663, 3],
    ['Oman', 22.656564, 57.568523, 2],
    ['Guyana', 6.382958, -58.622881, 1]
  ];
  var image = {
    url: 'static/img/common/reseller/markup.png',
    scaledSize: new google.maps.Size(10, 10),
  };
      
  var map = new google.maps.Map(document.getElementById('map-api'), {
    zoom: 2,
    scaleControl: false,
    scrollwheel: false,
    center: new google.maps.LatLng(37.284508, -40.165850),
    styles: [
      {"elementType": "geometry","stylers": [{"color": "#333333"}]},
      {"elementType": "labels","stylers": [{"visibility": "off"}]},
      {"elementType": "labels.icon","stylers": [{"visibility": "off"}]},
      {"elementType": "labels.text.fill","stylers": [{"color": "#757575"}]},
      {"elementType": "labels.text.stroke","stylers": [{"color": "#212121"}]},
      {"featureType": "administrative","elementType": "geometry", "stylers": [{"color": "#757575"}]},
      {"featureType": "administrative.country","elementType": "labels.text.fill","stylers": [{"color": "#9e9e9e"}]},
      {"featureType": "administrative.land_parcel","stylers": [{"visibility": "off"}]},
      {"featureType": "administrative.locality","elementType": "labels.text.fill","stylers": [{"color": "#bdbdbd"}]},
      {"featureType": "poi","elementType": "labels.text.fill","stylers": [{"color": "#757575"}]},
      {"featureType": "poi.park","elementType": "geometry","stylers": [{"color": "#181818"}]},
      {"featureType": "poi.park","elementType": "labels.text.fill","stylers": [{"color": "#616161"}]},
      {"featureType": "poi.park","elementType": "labels.text.stroke","stylers": [{"color": "#1b1b1b"}]},
      {"featureType": "road","elementType": "geometry.fill","stylers": [{"color": "#2c2c2c"}]},
      {"featureType": "road","elementType": "labels.text.fill","stylers": [{"color": "#8a8a8a"}]},
      {"featureType": "road.arterial","elementType": "geometry","stylers": [{"color": "#373737"}]},
      {"featureType": "road.highway","elementType": "geometry","stylers": [{"color": "#3c3c3c"}]},
      {"featureType": "road.highway.controlled_access","elementType": "geometry","stylers": [{"color": "#4e4e4e"}]},
      {"featureType": "road.local","elementType": "labels.text.fill","stylers": [{"color": "#616161"}]},
      {"featureType": "transit","elementType": "labels.text.fill","stylers": [{"color": "#757575"}]},
      {"featureType": "water","elementType": "geometry","stylers": [{"color": "#2b2b2b"}]},
      {"featureType": "water","elementType": "labels.text.fill","stylers": [{"color": "#3d3d3d"}]}
      ]
  });
    
  var infowindow = new google.maps.InfoWindow();

  var marker, i;

  for (i = 0; i < locations.length; i++) {  
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map,
      icon: image
    });

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent(locations[i][0]);
        infowindow.open(map, marker);
      }
    })(marker, i));
  }
}

// POPUP
$( ".home .popuplaunch .items button" ).click(function() {
  var dataitemfacebook = $(this).closest(".items").data("item");
  $(".popup[data-item='"+ dataitemfacebook +"']").fadeIn();
  $("body").css("overflow","hidden");
});

$( ".actu .popuplaunch .items button" ).click(function() {
    var dataitemactu = $(this).closest(".items").data("item");
    $(".popup[data-item='"+ dataitemactu +"']").fadeIn();
    $("body").css("overflow","hidden");
});

$( ".popup" ).click(function() {
   $(this).fadeOut();
   $("body").css("overflowY","scroll");
   $("body").css("overflowX","hidden");
  });

  $(".popup").on('click', ':not(.items)', function (e) {
       e.stopPropagation()
      
  });

// SLIDE SLICK JS 
$('.slideEvent').slick({
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  centerMode: true,
  variableWidth: true,
  autoplay: true,
  autoplaySpeed: 4000,
  focusOnSelect: true,
  dots: false,
  prevArrow: false,
  nextArrow: false
});