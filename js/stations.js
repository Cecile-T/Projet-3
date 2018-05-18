var DetailsStation = {
	
	init:function(data) {
		this.status = data.status;
		this.nom = data.name;
		this.address = data.address;
		this.bikes = data.available_bikes;
		this.stands = data.available_bike_stands;
		this.heure = actualisation();
	},

	currentStation: function() {
		document.getElementById("nom").textContent = this.nom;
		document.getElementById("adresse").textContent = this.address;
		document.getElementById("velos").textContent = this.bikes;
		document.getElementById("places").textContent = this.stands;
		document.getElementById("actualisation").textContent = this.heure;
		//A voir
		if(this.status ==="OPEN") {
			this.status = "station ouverte";
		} else if (this.status ==="CLOSED"){
			this.status = "station fermée";	
		} 
		document.getElementById("statut").textContent = this.status;
	},

	boutonResa: function () {
		if (this.status === "CLOSED" || this.bikes === 0) {
			document.getElementById("bouton_reservation").style.display ="none";
		} else {
			var showResa = document.getElementById("bouton_reservation");
			showResa.style.display ="block";
			showResa.addEventListener("click", function () {
				var res = Object.create(Reservations);
				res.init();
				res.ouvrirPanneauResa();
			});
		}
	},

	boutonFermer: function () {
		var fermerInfos = document.getElementById("bouton_fermeture");
		fermerInfos.addEventListener("click", function () {
			document.getElementById("infoStation").style.display = "none";
		});
	}
	
}


					