const map = L.map('mapid').setView([-34.6032, -58.3951], 13);
const lineaSelector = document.getElementById('destinos');
L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);

//L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
//	maxZoom: 20,
//	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
//}).addTo(map);

// L.marker([-34.61, -58.39]).addTo(map)
//     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
//     .openPopup();

const customizeMarker = fillColor =>{
    return {
        radius: 9,
        fillColor,
        color: 'black',
        weight: 1.3,
        opacity: 1,
        fillOpacity: 0.8
    }
}    


const getData = async () => {
    const responseDestinos = await fetch('./data/subte_estaciones.geojson')
    const data = await responseDestinos.json();
    destinos = data.features;
    
    const getLine = (nameLine) => destinos.filter(destino => destino.properties.linea.includes(nameLine))
    const myPath = document.getElementsByTagName('path');

    const lineaA = getLine('A');
    const markerOptionLineaA = customizeMarker('lightblue')
    const lineaB = getLine('B');
    const markerOptionLineaB = customizeMarker('red')
    const lineaC = getLine('C');
    const markerOptionLineaC = customizeMarker('blue')
    const lineaD = getLine('D');
    const markerOptionLineaD = customizeMarker('green')
    const lineaE = getLine('E');
    const markerOptionLineaE = customizeMarker('violet')
    const lineaH = getLine('H');
    const markerOptionLineaH = customizeMarker('yellow')

    const onEachFeature = (feature, layer) =>{
        if (feature.properties && feature.properties.estacion) {
            layer.bindPopup(feature.properties.estacion)
        }
    }
    const showGeoJSON = (linea, marker) => {
        L.geoJSON(linea, {
            pointToLayer: (feature, latlng) =>{
                return L.circleMarker(latlng, marker)
            }, onEachFeature
        }).addTo(map)
    }
    
    lineaSelector.addEventListener('change', (e) => {
        let rutaMostrada = [];
        if(e.target.value === 'linea_a') {
            Array.from(myPath).forEach(path => path.remove());
            rutaMostrada = [lineaA, markerOptionLineaA];
        } else if (e.target.value === 'linea_b') {
            Array.from(myPath).forEach(path => path.remove());
            rutaMostrada = [lineaB, markerOptionLineaB];
        } 
        else if (e.target.value === 'linea_c') {
            Array.from(myPath).forEach(path => path.remove());
            rutaMostrada = [lineaC, markerOptionLineaC];
        } 
        else if (e.target.value === 'linea_d') {
            Array.from(myPath).forEach(path => path.remove());
            rutaMostrada = [lineaD, markerOptionLineaD];
        } 
        else if (e.target.value === 'linea_e') {
            Array.from(myPath).forEach(path => path.remove());
            rutaMostrada = [lineaE, markerOptionLineaE];
        } 
        else if (e.target.value === 'linea_h') {
            Array.from(myPath).forEach(path => path.remove());
            rutaMostrada = [lineaH, markerOptionLineaH];
        }
        else if (e.target.value === 'all') {
            Array.from(myPath).forEach(path => path.remove());
            showGeoJSON(lineaA, markerOptionLineaA);
            showGeoJSON(lineaB, markerOptionLineaB);
            showGeoJSON(lineaC, markerOptionLineaC);
            showGeoJSON(lineaD, markerOptionLineaD);
            showGeoJSON(lineaE, markerOptionLineaE);
            showGeoJSON(lineaH, markerOptionLineaH);
        } 
        else {
            Array.from(myPath).forEach(path => path.remove());
                }
        const [linea, marker] = rutaMostrada;

        showGeoJSON(linea, marker)
    })
}
getData();
