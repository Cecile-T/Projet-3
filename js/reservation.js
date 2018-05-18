var Reservations = {
	//A voir Details sttaion.com ne marche pas
	init: function () {
		this.nom = document.getElementById("nom").textContent;
	},

	ouvrirPanneauResa: function() {
		document.getElementById("infoStation").style.display = "none";
		document.getElementById("reservation").style.display = "block";
		document.getElementById("resa-nom-station").textContent = this.nom;
		var hideResa = document.getElementById("bouton_annulation");
		hideResa.addEventListener("click", function () {
			Reservations.fermerResa();
		});
	},
	//A voir !
	fermerResa: function () {
		document.getElementById("reservation").style.display = "none";
	},

	
}