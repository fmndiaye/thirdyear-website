$(document).ready(function(){ //inclus le menu sur toutes les pages
 	$("#included").load("header", function(response, status, xhr){
 		if (status == "error"){
 			var msg = "Erreur de chargement de page: ";
 			$("#error").html( msg + xhr.status + " " + xhr.statusText );
 		}
    });

    
});