//Tableau contenant les images et les textes
var slides = [
{
	image: "images/image_un.jpg",
	titre: "Bienvenue sur l'application de réservation Vélo'v !",
	texte: "Découvrez son fonctionnement"
},
{
	image: "images/image_deux.jpg",
	titre: "1. Choix de la station",
	texte: "Parcourez la carte afin de visualiser les différentes stations."
},
{
	image: "images/image_trois.jpg",
	titre: "2. Sélection d'une station",
	texte: "Vérifiez la disponibilité des vélos dans la station sélectionnée et cliquez sur réserver."
},
{
	image: "images/image_quatre.jpg",
	titre: "3. Réservation d'un vélo",
	texte: "Pour réserver un vélo, signez dans la zone prévue. Il sera alors réservé pendant 20 minutes."
}
];

//Objet Diaporama
var Diaporama = {
	
	init: function (tableau) {
		this.indice= 0;
		this.tableau= tableau;
	},

	activeSlide: function () {
		document.getElementById("image_slider").src = this.tableau[this.indice].image;
		document.getElementById("titre_slider").textContent = this.tableau[this.indice].titre;
		document.getElementById("p_slider").textContent = this.tableau[this.indice].texte;
	},

	nextSlide: function () {
		this.indice++;
		if (this.indice > this.tableau.length-1) {
			this.indice = 0;
		};
		this.activeSlide ();	
	},

	previousSlide: function () {
		this.indice--;
		if (this.indice < 0) {
			this.indice = this.tableau.length-1;
		};
		this.activeSlide ();
	}	
}