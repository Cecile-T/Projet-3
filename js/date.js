//A voir
function actualisation () {
	var dateModif = new Date();  
	var heures=dateModif.getHours(); 
	var minutes=dateModif.getMinutes(); 
	var secondes=dateModif.getSeconds();

	return heures + " h " + minutes + " mn " + secondes + " s"
}


