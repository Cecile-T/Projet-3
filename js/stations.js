//Objet Station
var DetailsStation = {
	
	init:function(data) {
		this.status = data.status;
		this.nom = data.name;
		this.address = data.address;
		this.bikes = data.available_bikes;
		//Décrémente le vélo sur le panneau station après réservation si on ré-ouvre le panneau station
		if (this.nom === sessionStorage.nomStationReserve) {
			this.bikes =this.bikes-1;
		}
		this.stands = data.available_bike_stands;
		this.currentStation();
		this.actualisation();
	},

	//Insertion des infos dans le panneau station
	currentStation: function() {
		document.getElementById("infoStation").style.display = "block";
		document.getElementById("nom").textContent = this.nom;
		document.getElementById("adresse").textContent = this.address;
		document.getElementById("velos").textContent = this.bikes;
		document.getElementById("places").textContent = this.stands;
		//Affichage du statut en français
		if(this.status ==="OPEN") {
			this.status = "station ouverte";
		} else if (this.status ==="CLOSED"){
			this.status = "station fermée";	
		} 
		document.getElementById("statut").textContent = this.status;
		this.boutonResa();
		this.boutonFermer();
	},

	//Affichage ou non du bouton réservation
	boutonResa: function () {
		if (this.status === "CLOSED" || this.bikes === 0) {
			document.getElementById("bouton_reservation").style.display ="none";
		} else {
			document.getElementById("bouton_reservation").style.display ="block";
		}
	},

	boutonFermer: function () {
		var fermerInfos = document.getElementById("bouton_fermeture");
		fermerInfos.addEventListener("click", function () {
			document.getElementById("infoStation").style.display = "none";
		});
	},

	//Actualisation de l'heure
	actualisation: function () {
		this.dateModif = new Date();  
		var heures= this.dateModif.getHours(); 
		var minutes= this.dateModif.getMinutes(); 
		var secondes= this.dateModif.getSeconds();
		document.getElementById("actualisation").textContent = heures + " h "+ minutes + " m "+ secondes+" s";
	}
}


					