const LAT_START = 51.7092;
const LNG_START = 36.15622;
const VIEW_ZOOM = 15;
const TITLE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const map = L.map('map')
  .setView({
    lat: LAT_START,
    lng: LNG_START,
  }, VIEW_ZOOM);

L.tileLayer(
    TITLE_LAYER,
  {
    attribution: ATTRIBUTION,
  },
).addTo(map);

const marker = L.marker(
    {
      lat: LAT_START,
      lng: LNG_START,
    },
  );
  
  marker.addTo(map);