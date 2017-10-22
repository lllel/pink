function initMap() {
  var uluru = {lat: 55.75300866, lng: 37.61890411};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map,
    icon: "img/icon-map-marker-form.svg"
  });
}
initMap()
