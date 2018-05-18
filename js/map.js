//Map
var map;

//A voir
function toggleBounce () {
        if (marker.getAnimation() != null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
};

function initMap() {
	var Lyon = {lat: 45.7588165, lng: 4.8447753};
    map = new google.maps.Map(document.getElementById('map'), {
        center: Lyon,
        zoom: 14,
        styles : [
    {
        "featureType": "water",
        "stylers": [
            {
                "color": "#009ee0"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "weight": 6
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#e85113"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#efe9e4"
            },
            {
                "lightness": -40
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#efe9e4"
            },
            {
                "lightness": -20
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "lightness": 100
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "lightness": -100
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.icon"
    },
    {
        "featureType": "landscape",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "stylers": [
            {
                "lightness": 20
            },
            {
                "color": "#efe9e4"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "lightness": 100
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "lightness": -100
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "hue": "#11ff00"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "lightness": 100
            }
        ]
    },
    
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#f0e4d3"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffa800"
            },
            {
                "lightness": -25
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffa800"
            },
            {
                "lightness": 0
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }
]
    });
   
    //Récupération des localisations des stations et placement des marqueurs
    ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=ac0e87af0bedce531c9ffa829b9b364a3e542979", function (reponse) {
        var stations = JSON.parse(reponse);
		var markers = [];
		stations.forEach(function(station) {
			var marker = new google.maps.Marker({
				position: {lat: station.position.lat, lng: station.position.lng},
				numero: station.number,
				map: map,
				title: station.name,
				icon: {
					url: "Arrow_3.png",
					scaledSize: new google.maps.Size(45, 45)
				}
			});
			//Ajout d'un gestionnaire d'évènements (clic sur un marqueur)
			marker.addListener("click", function () {
				//Centrage de la carte
				map.setCenter(marker.position);
				marker.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(function(){ marker.setAnimation(null); }, 2250);
				//Mise à jour des infos de la station sélectionnée et ouverture du panneau
				ajaxGet("https://api.jcdecaux.com/vls/v1/stations/"+ marker.numero +"?contract=Lyon&apiKey=ac0e87af0bedce531c9ffa829b9b364a3e542979", function (reponse) {
					var majStation = JSON.parse(reponse);
					//A voir
					document.getElementById("infoStation").style.display = "block";
					var sta = Object.create(DetailsStation);
					sta.init(majStation);
					sta.currentStation();
					sta.boutonResa();
					sta.boutonFermer();
                    Reservations.fermerResa();
				});
			});
			//Ajout des marqueurs dans un tableau pour le marker cluster
			markers.push(marker);
		});
		//Regroupement des marqueurs
		var markerCluster = new MarkerClusterer (map, markers, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
	});
}


