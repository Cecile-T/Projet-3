//Elements généraux du projet

//Création des objets avec les prototypes
var sta = Object.create(DetailsStation);

var res = Object.create(Reservations);

var sign = Object.create(Signature);

var diapo = Object.create(Diaporama);
diapo.init(slides);

//Refresh de la page
window.addEventListener("load", function () {
    if (sessionStorage.nomStationReserve != null) {
        clearInterval(res.intervalId);
        res.counter = sessionStorage.dureeReservationEcoulee;
        res.timer();
        res.footerResaEnCours();
    }
});

//Events listener des objets Stations et Reservations
//Ouverture panneau réservation
var showResa = document.getElementById("bouton_reservation");
showResa.addEventListener("click", function () {
    res.init();
    sign.init();
});

//Appui bouton validation
var lancerResa = document.getElementById("bouton_validation");
lancerResa.addEventListener("click", function () {
    res.validerResa();
});

//Appui bouton annulation
var hideResa = document.getElementById("bouton_annulation");
hideResa.addEventListener("click", function () {
    res.fermerResa();
});

//Appui bouton effacement signature
var eraseCanvas = document.getElementById("bouton_effacer");
eraseCanvas.addEventListener("click", function () {
    sign.clearCanvas();
});

//Appui bouton annulation resa
var cancelResa = document.getElementById("bouton_annulation_resa");
cancelResa.addEventListener("click", function () {
    res.finResa();
});

//Diaporama 
//Clic flèche gauche
var left = document.getElementById("prev");
left.addEventListener("click", function () {
    diapo.stopSlider();
    diapo.previousSlide();
});

//Clic flèche droite
var right = document.getElementById("next");
right.addEventListener("click", function () {
    diapo.stopSlider();
    diapo.nextSlide();
});

//Evenement touches clavier
document.addEventListener("keyup", function (e) {
    if (e.keyCode == 37) {
        diapo.stopSlider();
        diapo.previousSlide();
    } else if (e.keyCode == 39) {
        diapo.stopSlider();
        diapo.nextSlide();
    }
});

//Canvas
var monCanvas = document.getElementById("canvas");

//Mouse
//Bouton souris enfoncé
monCanvas.addEventListener("mousedown", function (e) {
    sign.onDraw();
});

//Déplacement souris
monCanvas.addEventListener("mousemove", function (e) {
    sign.getMousePos(e);
});

//Relachement bouton souris
monCanvas.addEventListener("mouseup", function (e) {
    sign.offDraw();
    sign.valid = true;
});

//Touch
//Appui avec le doigt
monCanvas.addEventListener("touchstart", function (e) {
    sign.onDraw();
});

//Déplacement du doigt
monCanvas.addEventListener("touchmove", function (e) {
    e.preventDefault();
    sign.getTouchPos(e);;
});

//Fin d'appui avec le doigt
monCanvas.addEventListener("touchend", function (e) {
    e.preventDefault();
    sign.offDraw();
    sign.valid = true;
});
