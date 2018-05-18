//Tableau images + textes
var slides = [
{
	image: "image_un_bis.jpg",
	titre: "Bienvenue sur l'application de réservation Vélo'v !",
	texte: "Découvrez son fonctionnement"
},
{
	image: "image_deux.jpg",
	titre: "1. Choix de la station",
	texte: "Parcourez la carte afin de visualiser les différentes stations."
},
{
	image: "image_trois.jpg",
	titre: "2. Sélection d'une station",
	texte: "Vérifiez la disponibilité des vélos dans la station sélectionnée et cliquez sur réserver."
},
{
	image: "image_quatre.jpg",
	titre: "3. Réservation d'un vélo",
	texte: "Pour réserver un vélo, signez dans la zone prévue. Il sera alors réservé pendant 20 minutes."
}
];

//Prototype Diaporama
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

//A voir
var diapo = Object.create(Diaporama);
diapo.init(slides);

var gauche = document.getElementById("prev");
gauche.addEventListener("click", function () {
	diapo.previousSlide();
});

var droite = document.getElementById("next");
droite.addEventListener("click", function () {
	diapo.nextSlide ();
});

//Touches clavier
document.addEventListener("keyup", function (e) {
	if (e.keyCode == 37) {
        diapo.previousSlide();
    } else if (e.keyCode == 39) {
        diapo.nextSlide();
      }
});

