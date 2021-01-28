'use strict';

const MAP = L.map('map').setView([49.20495, 16.59711], 15);
const URL_OSM = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const URL_GMAPS = 'https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&scale=2';

const OSM = L.tileLayer(URL_OSM);
const GMAPS = L.tileLayer(URL_GMAPS, {
	subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

const MISTA = L.tileLayer.wms('http://ows.mundialis.de/services/service?', {
	layers: 'OSM-Overlay-WMS',
	transparency: 'true',
	opacity: 0.5});



MISTA.addTo(MAP);

var basemaps = {
    Topography: L.tileLayer.wms('http://ows.mundialis.de/services/service?', {
        layers: 'TOPO-WMS'
    }),

    Places: L.tileLayer.wms('http://ows.mundialis.de/services/service?', {
        layers: 'OSM-Overlay-WMS'
    }),

	'ortofoto': L.tileLayer.wms('https://geoportal.cuzk.cz/WMS_ORTOFOTO_PUB/WMService.aspx', {
		layers: 'GR_ORTFOTORGB'
	}),

	
	'puda50': L.tileLayer.wms('https://mapy.geology.cz/arcgis/services/Pudy/pudni_typy50/MapServer/WmsServer?', {
		layers: '0',	
    }),
    
    'Půda_clickable': L.tileLayer.betterWms('https://mapy.geology.cz/arcgis/services/Pudy/pudni_typy50/MapServer/WmsServer?', {
        layers: '0',
        transparent: true,
        format: 'image/png'
      }),

	'srážky': L.tileLayer.wms('https://ags.vuv.cz/arcgis/services/sucho/srazka/MapServer/WmsServer?', {
		layers: '3',	
	}),

	'teplota': L.tileLayer.wms('https://ags.vuv.cz/arcgis/services/sucho/teplota/MapServer/WmsServer?', {
		layers: '1',	
    }),

    'Teplota_clickable': L.tileLayer.betterWms('https://ags.vuv.cz/arcgis/services/sucho/teplota/MapServer/WmsServer?', {
        layers: '1',
        transparent: true,
        format: 'image/png'
      }),
	
	'katastr': L.tileLayer.wms('http://services.cuzk.cz/wms/wms.asp?', {
		layers: 'DEF_PARCELY,polygony_parcel',	
		
    }),    
    
    'Katastr_clickable': L.tileLayer.betterWms('http://services.cuzk.cz/wms/wms.asp?', {
        layers: 'polygony_parcel',
        transparent: true,
        format: 'image/png'
      }),
};

const BASE_LAYERS = {
	'OpenStreetMap': OSM,
	'Google Maps': GMAPS,
	'Places': MISTA,
};





const LAYERS = L.control.layers(basemaps, BASE_LAYERS);

MAP.addControl(LAYERS);