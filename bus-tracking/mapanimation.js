// This array contains the coordinates for all bus stops between MIT and Harvard
const busStops = [
  [-71.093729, 42.359244],
  [-71.094915, 42.360175],
  [-71.0958, 42.360698],
  [-71.099558, 42.362953],
  [-71.103476, 42.365248],
  [-71.106067, 42.366806],
  [-71.108717, 42.368355],
  [-71.110799, 42.369192],
  [-71.113095, 42.370218],
  [-71.115476, 42.372085],
  [-71.117585, 42.373016],
  [-71.118625, 42.374863],
];

// TODO: add your own access token
mapboxgl.accessToken = 'pk.eyJ1IjoidGZhcm5oYW0iLCJhIjoiY2w0OWdmbTliMTIzdTNjbXduYmlpd3IyMSJ9.NERm-b1iEu02ww45eLrYbw';

// This is the map instance
let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-71.104081, 42.365554],
  zoom: 14,
});

var allStopMarkers = [];
// TODO: add a marker to the map at the first coordinates in the array busStops. The marker variable should be named "marker"


// counter here represents the index of the current bus stop
let counter = 0;
function move() {
  if (allStopMarkers.length == 0){
  for (let i =0; i < busStops.length; i ++){
  var marker = new mapboxgl.Marker()
  .setLngLat(busStops[i])
  .addTo(map);
  allStopMarkers.push(marker);
  }
}
else {
  for (let i =0; i < allStopMarkers.length; i ++){
    allStopMarkers[i].remove();
}
  allStopMarkers = [];
}
}

var allBusMarkers = [];
// Get bus locations every 15sec
async function run(){
    // get bus data    
    const busses = await getBusLocations();
    console.log(new Date());
    console.log(busses);

  // Reset all markers
  if (allBusMarkers!==null) {
    for (var i = allBusMarkers.length - 1; i >= 0; i--) {
      allBusMarkers[i].remove();
    }

}

  for (let i =0; i<busses.length; i++){

    const el = document.createElement('div');
    if(busses[i].attributes.direction_id == 0){
      // Red busses go North
    el.className = 'markerRed';
    }
    else {
      // Blue busses go South
    el.className = 'markerBlue';

    }

    var marker = new mapboxgl.Marker(el)
    .setLngLat([busses[i].attributes.longitude, busses[i].attributes.latitude])
    .setPopup(new mapboxgl.Popup().setHTML(formatPopup(busses[i].attributes.direction_id,busses[i].attributes.occupancy_status)))
    .addTo(map);
    allBusMarkers.push(marker);
    console.log("Marker: ", marker);
    //marker.remove()
  }
  
    // timer
    setTimeout(run, 15000);
}

function formatPopup(direction, availabilty){
  let dirText = "Unknown";
  if (direction == 0 ){
     dirText = "North";
  }
  else {
     dirText = "South";
  }
  return "Heading: <b>" + dirText + "</b><br>" + availabilty;
}
// Request bus data from MBTA
async function getBusLocations(){
    const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
    const response = await fetch(url);
    const json     = await response.json();
    return json.data;
}

run();