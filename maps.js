var customLabel = {
    restaurant: {
        label: 'Resto'
    },
    bar: {
        label: 'B'
    }
};

function initMap() {
    var MAPA = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(-33.863276, 151.207977),
        zoom: 12
    });
    var infoWindow = new google.maps.InfoWindow;

    // Change this depending on the name of your PHP or XML file
    downloadUrl('https://storage.googleapis.com/mapsdevsite/json/mapmarkers2.xml', function(data) {
        var xml = data.responseXML;
        var markers = xml.documentElement.getElementsByTagName('marker');
        Array.prototype.forEach.call(markers, function(markerElem) {
            var name = markerElem.getAttribute('name');
            var address = markerElem.getAttribute('address');
            var type = markerElem.getAttribute('type');
            var PUNTO = new google.maps.LatLng(
                parseFloat(markerElem.getAttribute('lat')),
                parseFloat(markerElem.getAttribute('lng')));

            var DIV = document.createElement('div');
            var strong = document.createElement('strong');
            strong.textContent = name
            DIV.appendChild(strong);
            DIV.appendChild(document.createElement('br'));

            var TEXTO = document.createElement('text');
            TEXTO.textContent = address
            DIV.appendChild(TEXTO);
            var ICONO = customLabel[type] || {};
            var image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx_jvbkFcLqZM_-1ZajTskoM-i7o36xX6zBaA2X04yy8KY0GmeQg';
            var MARCA = new google.maps.Marker({
                map: MAPA,
                position: PUNTO,
                draggable: true,
                title: "Drag me!",
                animation: google.maps.Animation.DROP,
                label: ICONO.label,
                icon: image
            });

            //MARCA.addListener('mouseover', function() {
            MARCA.addListener('click', function() {

                infoWindow.setContent(DIV);
                infoWindow.open(map, MARCA);
                console.log(infoWindow.content.textContent);
                alert(infoWindow.content.textContent);
            });
        });
    });
}



function downloadUrl(url, callback) {
    var request = window.ActiveXObject ?
        new ActiveXObject('Microsoft.XMLHTTP') :
        new XMLHttpRequest;

    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            request.onreadystatechange = doNothing;
            callback(request, request.status);
        }
    };

    request.open('GET', url, true);
    request.send(null);
}

function doNothing() {}