//Map

var map;

function initMap() {
	var Lyon = {lat: 45.7588165, lng: 4.8447753};
	//Objet map
	map = new google.maps.Map(document.getElementById('map'), {
        center: Lyon,
        zoom: 14,
        styles : mapPerso //Personnalisation du style de la carte
    });
   
    //Récupération des localisations des stations et placement des marqueurs
    ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=ac0e87af0bedce531c9ffa829b9b364a3e542979", function (reponse) {
        var listeStations = JSON.parse(reponse);
		var markers = [];
		listeStations.forEach(function(station) {
			//Ajout objet marqueur
			var marker = new google.maps.Marker({
				//Un marqueur par station
				position: {lat: station.position.lat, lng: station.position.lng},
				numero: station.number,
				map: map,
				title: station.name,
				//Modification de l'icone du marker
				icon: {
					url: "Arrow_3.png",
					scaledSize: new google.maps.Size(45, 45)
				}
			});
			//Ajout d'un gestionnaire d'évènements (clic sur un marqueur)
			marker.addListener("click", function () {
				//Centrage de la carte au clic sur un marqueur
				map.setCenter(marker.position);
				//Animation du marqueur
				marker.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(function(){ marker.setAnimation(null); }, 2250);
				//Mise à jour des infos de la station sélectionnée et ouverture du panneau station + fermeture panneau resa
				ajaxGet("https://api.jcdecaux.com/vls/v1/stations/"+ marker.numero +"?contract=Lyon&apiKey=ac0e87af0bedce531c9ffa829b9b364a3e542979", function (reponse) {
					var majStation = JSON.parse(reponse);
					sta.init(majStation);
                    res.fermerResa();
				});
			});
			//Ajout des marqueurs dans un tableau (pour le marker cluster)
			markers.push(marker);
		});
		//Regroupement des marqueurs
		var markerCluster = new MarkerClusterer (map, markers, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
	});
}


