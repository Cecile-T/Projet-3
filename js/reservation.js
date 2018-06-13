//Objet Reservations
var Reservations = {
	min: 0,
	sec: 0,
	counter:0,
	timeLeft: 1200, 
	intervalId:"",

	init: function () {
		this.nom = sta.nom;
		this.ouvrirPanneauResa();
	},

	ouvrirPanneauResa: function() {
		document.getElementById("infoStation").style.display = "none";
		document.getElementById("reservation").style.display = "block";
		document.getElementById("resa-nom-station").textContent = this.nom;
	},
	
	fermerResa: function () {
		document.getElementById("reservation").style.display = "none";
		//Effacement du canvas si signature présente
		if (sign.context != undefined) { 
			sign.clearCanvas();
		}
	},

	//Phase de vérification après appui sur le bouton valider
	validerResa: function() {
		//Vérification présence d'une signature
		if (sign.valid === true) {
			//Vérification présence d'une valeur dans le session storage
			if (sessionStorage.nomStationReserve != null) { 
				//Vérification si reservation actuellement en cours sur la même station
				if (sessionStorage.nomStationReserve === res.nom) {
					alert("Il y a déjà une réservation en cours à cette station.");
					this.fermerResa();
				} else { //Si autre réservation en cours, mais station différente
					if (confirm("Voulez-vous annuler la réservation en cours ?")) {
						this.finResa();
						this.creerResa();
					} else {
						this.fermerResa();
					}
				} 
			} else {
				this.creerResa();
			}
		} else {
			alert("Veuillez signer avant de valider la réservation.");
		}	
	},

	footerResaEnCours: function () {
		document.getElementById("default_resa").style.display = "none";
		document.getElementById("current_resa").style.display = "block";
		document.getElementById("current_resa_nom").textContent = sessionStorage.nomStationReserve; 
	},

	//Web Storage
	sauvegarderResa: function () {
		sessionStorage.setItem("nomStationReserve", res.nom); 
      	sessionStorage.setItem("dureeReservationEcoulee", this.counter); 
	},

	timer:function () {
		this.intervalId = setInterval(function() {
			res.counter++;
    		res.min = Math.floor((res.timeLeft - res.counter) / 60);
			res.sec = (res.timeLeft - res.counter) % 60;
			//Fin du timer
			if (res.counter === res.timeLeft) {
    			res.finResa();
  			}
  			//Mise à jour du footer et du counter dans le session storage à chaque seconde
  			document.getElementById("minutes_resa").textContent = res.min;
  			document.getElementById("secondes_resa").textContent = res.sec;
  			sessionStorage.dureeReservationEcoulee = res.counter;
		}, 1000);
	},

	//Création réservation après vérification
	creerResa: function () {
		this.sauvegarderResa(); 
		this.footerResaEnCours();
		this.fermerResa();
		this.timer();
	},

	finResa:function () {
		//Modification footer
		document.getElementById("default_resa").style.display = "block";
		document.getElementById("current_resa").style.display = "none";
		//On stoppe le timer pour qu'il ne continue pas en négatif
		clearInterval(this.intervalId); 
		//Remise à 0 du counter
		this.counter=0;
		//Effacement du session storage
		sessionStorage.clear();
	}
}