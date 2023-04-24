$(document).ready(function(){
 	$("#Entrees").click(function(){
 		$("#contenu_entrees").css("display", "unset");
 		$("#contenu_pizza").css("display", "none");
 		$("#contenu_boissons").css("display", "none");
 		$("#contenu_menus").css("display", "none");
 		sessionStorage.setItem("entrees", true);
 		sessionStorage.setItem("pizza", false);
 		//sessionStorage.setItem("boissons", false);
 		sessionStorage.setItem("menus", false);
 	});

 	$("#PizzaPre").click(function(){
 		$("#contenu_pizza").css("display", "unset");
 		$("#contenu_entrees").css("display", "none");
 		$("#contenu_boissons").css("display", "none");
 		$("#contenu_menus").css("display", "none");
 		sessionStorage.setItem("pizza", true);
 		sessionStorage.setItem("entrees", false);
 		sessionStorage.setItem("boissons", false);
 		sessionStorage.setItem("menus", false);
 	});

 	$("#Boissons").click(function(){
 		$("#contenu_boissons").css("display", "unset");
 		$("#contenu_pizza").css("display", "none");
 		$("#contenu_entrees").css("display", "none");
 		$("#contenu_menus").css("display", "none");
 		sessionStorage.setItem("boissons", true);
 		sessionStorage.setItem("pizza", false);
 		sessionStorage.setItem("entrees", false);
 		sessionStorage.setItem("menus", false);
 	});

 	$("#Menus").click(function(){
 		
 	});
 	
 	if(sessionStorage.getItem("entrees") == 'true'){
 		$("#contenu_entrees").css("display", "unset");
 		$("#contenu_pizza").css("display", "none");
 		$("#contenu_boissons").css("display", "none");
 		$("#contenu_menus").css("display", "none");
 		sessionStorage.setItem("pizza", false);
 		sessionStorage.setItem("boissons", false);
 		sessionStorage.setItem("menus", false);
 	}

 	if (sessionStorage.getItem("pizza") == 'true'){
 		$("#contenu_pizza").css("display", "unset");
 	}

 	if(sessionStorage.getItem("boissons") == 'true'){
 		$("#contenu_boissons").css("display", "unset");
 		$("#contenu_pizza").css("display", "none");
 		$("#contenu_entrees").css("display", "none");
 		$("#contenu_menus").css("display", "none"); 
 	}

 	//fonction qui gère les tailles de pizza 4 Frommage
 	document.getElementById('TailleP4').addEventListener('change', 
 		function handleChange(event){
 			let p1 = document.getElementById("1p4").value;
 			let p2 = document.getElementById("2p4").value;
 			let p3 = document.getElementById("3p4").value;
 			let idp1 = document.getElementById("id1p4").value;
 			let idp2 = document.getElementById("id2p4").value;
 			let idp3 = document.getElementById("id3p4").value;
 			if (event.target.value == 0){
 				$("#prixP4").html( 			
 				"<div class='prix2' id ='prixP4'>" + p1 + "€ </div>"); 
 				$("#addP4").html("<a href='add-to-cart/" + idp1 + 
 					"' id ='addP4'> <input type='button' class='addcart' "+ 
 					"value='COMMANDER'>");
 			}

 			if (event.target.value == 1){
 				$("#prixP4").html( 			
 				"<div class='prix2' id ='prixP4'>" + p2 + "€ </div>");
 				$("#addP4").html("<a href='add-to-cart/" + idp2 + 
 					"' id ='addP4'> <input type='button' class='addcart' "+ 
 					"value='COMMANDER'>"); 
 			}

 			if (event.target.value == 2){
 				$("#prixP4").html( 			
 				"<div class='prix2' id ='prixP4'>" + p3 + "€ </div>");
 				$("#addP4").html("<a href='add-to-cart/" + idp3 + 
 					"' id ='addP4'> <input type='button' class='addcart' "+ 
 					"value='COMMANDER'>"); 
 			}
 	});

 	//fonction qui gère les tailles de pizza Orientale
 	document.getElementById('TaillePO').addEventListener('change', 
 		function handleChange(event){
 			let p1 = document.getElementById("1po").value;
 			let p2 = document.getElementById("2po").value;
 			let p3 = document.getElementById("3po").value;
 			let idp1 = document.getElementById("id1po").value;
 			let idp2 = document.getElementById("id2po").value;
 			let idp3 = document.getElementById("id3po").value;
 			if (event.target.value == 3){
 				$("#prixPO").html( 			
 				"<div class='prix2' id ='prixPO'>" + p1 + "€ </div>"); 
 				$("#addPO").html("<a href='add-to-cart/" + idp1 + 
 					"' id ='addPO'> <input type='button' class='addcart' "+ 
 					"value='COMMANDER'></a>");
 			}

 			if (event.target.value == 4){
 				$("#prixPO").html( 			
 				"<div class='prix2' id ='prixPO'>" + p2 + "€ </div>");
 				$("#addPO").html("<a href='add-to-cart/" + idp2 + 
 					"' id ='addPO'> <input type='button' class='addcart' "+ 
 					"value='COMMANDER'></a>"); 
 			}

 			if (event.target.value == 5){
 				$("#prixPO").html( 			
 				"<div class='prix2' id ='prixPO'>" + p3 + "€ </div>");
 				$("#addPO").html("<a href='add-to-cart/" + idp3 + 
 					"' id ='addPO'> <input type='button' class='addcart' "+ 
 					"value='COMMANDER'></a>"); 
 			}
 	});

 	//fonction qui gère les sauce de Ceasar
 	document.getElementById('Sauce1').addEventListener('change', 
 		function handleChange(event){
 			let csr = document.getElementById("csr").value;
 			let idcsr = document.getElementById("idcsr").value;
 			let y = Number(parseFloat(csr) + 0.29).toFixed(2); //prix d'une sauce
 			let x = event.target.value;
 			if (x != "none"){
 				$("#ceasar").html("<a href='add-to-cart/" + x + "' id='ceasar'"
 				 +"> <input type='button' class='addcart' " +
 					"value ='COMMANDER'></a>");
 				$("#prixS1").html("<div class='prix2' id='prixS1'>" + y +
 					"€</div>");
 			} else {
 				$("#ceasar").html("<a href='add-to-cart/" + idcsr + "' id='ceasar'"
 				 +"> <input type='button' class='addcart' " +
 					"value ='COMMANDER'></a>");
 				$("#prixS1").html("<div class='prix2' id='prixS1'>" + csr +
 					"€</div>");
 			}
 	});

 	//fonction qui gère les sauce de Chicken
 	document.getElementById('Sauce2').addEventListener('change', 
 		function handleChange(event){
 			let chk = document.getElementById("chk").value;
 			let idchk = document.getElementById("idchk").value;
 			let y = Number(parseFloat(chk) + 0.29).toFixed(2); //prix d'une sauce
 			let x = event.target.value;
 			if (x != "none"){
 				$("#chicken").html("<a href='add-to-cart/" + x + "' id='chicken'"
 				 +"> <input type='button' class='addcart' " +
 					"value ='COMMANDER'></a>");
 				$("#prixS2").html("<div class='prix2' id='prixS2'>" + y +
 					"€</div>");
 			} else {
 				$("#chicken").html("<a href='add-to-cart/" + idchk + "' id='chicken'"
 				 +"> <input type='button' class='addcart' " +
 					"value ='COMMANDER'></a>");
 				$("#prixS2").html("<div class='prix2' id='prixS2'>" + chk +
 					"€</div>");
 			}
 	});

 	//fonction qui gère les tailles de Coca
 	document.getElementById('TailleB0').addEventListener('change', 
 		function handleChange(event){
 			let p1 = document.getElementById("0pb").value;
 			let p2 = document.getElementById("1pb").value;
 			let p3 = document.getElementById("2pb").value;
 			let p4 = document.getElementById("3pb").value;
 			let p5 = document.getElementById("4pb").value;
 			let id1 = document.getElementById("0idb").value;
 			let id2 = document.getElementById("1idb").value;
 			let id3 = document.getElementById("2idb").value;
 			let id4 = document.getElementById("3idb").value;
 			let id5 = document.getElementById("4idb").value;
 			if (event.target.value == 0){
 				$("#prixB0").html("<div class='prix2' id='prixB0'>" + p1 +
 					"€</div>");
 				$("#addB0").html("<a href='add-to-cart/" + id1 + "' " +
 					"id ='addB0'> <input type='button' class='addcart' "+
 					"value='COMMANDER'></a>");
 			}

 			if (event.target.value == 1){
 				$("#prixB0").html("<div class='prix2' id='prixB0'>" + p2 +
 					"€</div>");
 				$("#addB0").html("<a href='add-to-cart/" + id2 + "' " +
 					"id ='addB0'> <input type='button' class='addcart' "+
 					"value='COMMANDER'></a>");
 			}

 			if (event.target.value == 2){
 				$("#prixB0").html("<div class='prix2' id='prixB0'>" + p3 +
 					"€</div>");
 				$("#addB0").html("<a href='add-to-cart/" + id3 + "' " +
 					"id ='addB0'> <input type='button' class='addcart' "+
 					"value='COMMANDER'></a>");
 			}

 			if (event.target.value == 3){
 				$("#prixB0").html("<div class='prix2' id='prixB0'>" + p4 +
 					"€</div>");
 				$("#addB0").html("<a href='add-to-cart/" + id4 + "' " +
 					"id ='addB0'> <input type='button' class='addcart' "+
 					"value='COMMANDER'></a>");
 			}

 			if (event.target.value == 4){
 				$("#prixB0").html("<div class='prix2' id='prixB0'>" + p5 +
 					"€</div>");
 				$("#addB0").html("<a href='add-to-cart/" + id5 + "' " +
 					"id ='addB0'> <input type='button' class='addcart' "+
 					"value='COMMANDER'></a>");
 			}
 	});

  	//fonction qui gère les tailles de Coca-Light
 	document.getElementById('TailleB5').addEventListener('change', 
 		function handleChange(event){
 			let p1 = document.getElementById("5pb").value;
 			let p2 = document.getElementById("6pb").value;
 			let p3 = document.getElementById("7pb").value;
 			let p4 = document.getElementById("8pb").value;
 			let p5 = document.getElementById("9pb").value;
 			let id1 = document.getElementById("5idb").value;
 			let id2 = document.getElementById("6idb").value;
 			let id3 = document.getElementById("7idb").value;
 			let id4 = document.getElementById("8idb").value;
 			let id5 = document.getElementById("9idb").value;
 			if (event.target.value == 5){
 				$("#prixB5").html("<div class='prix2' id='prixB5'>" + p1 +
 					"€</div>");
 				$("#addB5").html("<a href='add-to-cart/" + id1 + "' " +
 					"id ='addB5'> <input type='button' class='addcart' "+
 					"value='COMMANDER'></a>");
 			}

 			if (event.target.value == 6){
 				$("#prixB5").html("<div class='prix2' id='prixB5'>" + p2 +
 					"€</div>");
 				$("#addB5").html("<a href='add-to-cart/" + id2 + "' " +
 					"id ='addB5'> <input type='button' class='addcart' "+
 					"value='COMMANDER'></a>");
 			}

 			if (event.target.value == 7){
 				$("#prixB5").html("<div class='prix2' id='prixB5'>" + p3 +
 					"€</div>");
 				$("#addB5").html("<a href='add-to-cart/" + id3 + "' " +
 					"id ='addB5'> <input type='button' class='addcart' "+
 					"value='COMMANDER'></a>");
 			}

 			if (event.target.value == 8){
 				$("#prixB5").html("<div class='prix2' id='prixB5'>" + p4 +
 					"€</div>");
 				$("#addB5").html("<a href='add-to-cart/" + id4 + "' " +
 					"id ='addB5'> <input type='button' class='addcart' "+
 					"value='COMMANDER'></a>");
 			}

 			if (event.target.value == 9){
 				$("#prixB5").html("<div class='prix2' id='prixB5'>" + p5 +
 					"€</div>");
 				$("#addB5").html("<a href='add-to-cart/" + id5 + "' " +
 					"id ='addB5'> <input type='button' class='addcart' "+
 					"value='COMMANDER'></a>");
 			}
 	});

 	//fonction qui gère les tailles de Sprite
 	document.getElementById('TailleB10').addEventListener('change', 
 		function handleChange(event){
 			let p1 = document.getElementById("10pb").value;
 			let p2 = document.getElementById("11pb").value;
 			let p3 = document.getElementById("12pb").value;
 			let p4 = document.getElementById("13pb").value;
 			let p5 = document.getElementById("14pb").value;
 			let id1 = document.getElementById("10idb").value;
 			let id2 = document.getElementById("11idb").value;
 			let id3 = document.getElementById("12idb").value;
 			let id4 = document.getElementById("13idb").value;
 			let id5 = document.getElementById("14idb").value;
 			if (event.target.value == 10){
 				$("#prixB10").html("<div class='prix2' id='prixB10'>" + p1 +
 					"€</div>");
 				$("#addB10").html("<a href='add-to-cart/" + id1 + "' " +
 					"id ='addB10'> <input type='button' class='addcart' "+
 					"value='COMMANDER'></a>");
 			}

 			if (event.target.value == 11){
 				$("#prixB10").html("<div class='prix2' id='prixB10'>" + p2 +
 					"€</div>");
 				$("#addB10").html("<a href='add-to-cart/" + id2 + "' " +
 					"id ='addB10'> <input type='button' class='addcart' "+
 					"value='COMMANDER'></a>");
 			}

 			if (event.target.value == 12){
 				$("#prixB10").html("<div class='prix2' id='prixB10'>" + p3 +
 					"€</div>");
 				$("#addB10").html("<a href='add-to-cart/" + id3 + "' " +
 					"id ='addB10'> <input type='button' class='addcart' "+
 					"value='COMMANDER'></a>");
 			}

 			if (event.target.value == 13){
 				$("#prixB10").html("<div class='prix2' id='prixB10'>" + p4 +
 					"€</div>");
 				$("#addB10").html("<a href='add-to-cart/" + id4 + "' " +
 					"id ='addB10'> <input type='button' class='addcart' "+
 					"value='COMMANDER'></a>");
 			}

 			if (event.target.value == 14){
 				$("#prixB10").html("<div class='prix2' id='prixB10'>" + p5 +
 					"€</div>");
 				$("#addB10").html("<a href='add-to-cart/" + id5 + "' " +
 					"id ='addB10'> <input type='button' class='addcart' "+
 					"value='COMMANDER'></a>");
 			}
 	});

 	 //fonction qui gère les tailles de Fanta
 	document.getElementById('TailleB15').addEventListener('change', 
 		function handleChange(event){
 			let p1 = document.getElementById("15pb").value;
 			let p2 = document.getElementById("16pb").value;
 			let p3 = document.getElementById("17pb").value;
 			let p4 = document.getElementById("18pb").value;
 			let p5 = document.getElementById("19pb").value;
 			let id1 = document.getElementById("15idb").value;
 			let id2 = document.getElementById("16idb").value;
 			let id3 = document.getElementById("17idb").value;
 			let id4 = document.getElementById("18idb").value;
 			let id5 = document.getElementById("19idb").value;
 			if (event.target.value == 15){
 				$("#prixB15").html("<div class='prix2' id='prixB15'>" + p1 +
 					"€</div>");
 				$("#addB15").html("<a href='add-to-cart/" + id1 + "' " +
 					"id ='addB10'> <input type='button' class='addcart' "+
 					"value='COMMANDER'></a>");
 			}

 			if (event.target.value == 16){
 				$("#prixB15").html("<div class='prix2' id='prixB15'>" + p2 +
 					"€</div>");
 				$("#addB10").html("<a href='add-to-cart/" + id2 + "' " +
 					"id ='addB15'> <input type='button' class='addcart' "+
 					"value='COMMANDER'></a>");
 			}

 			if (event.target.value == 17){
 				$("#prixB15").html("<div class='prix2' id='prixB15'>" + p3 +
 					"€</div>");
 				$("#addB15").html("<a href='add-to-cart/" + id3 + "' " +
 					"id ='addB15'> <input type='button' class='addcart' "+
 					"value='COMMANDER'></a>");
 			}

 			if (event.target.value == 18){
 				$("#prixB15").html("<div class='prix2' id='prixB15'>" + p4 +
 					"€</div>");
 				$("#addB15").html("<a href='add-to-cart/" + id4 + "' " +
 					"id ='addB15'> <input type='button' class='addcart' "+
 					"value='COMMANDER'></a>");
 			}

 			if (event.target.value == 19){
 				$("#prixB15").html("<div class='prix2' id='prixB15'>" + p5 +
 					"€</div>");
 				$("#addB15").html("<a href='add-to-cart/" + id5 + "' " +
 					"id ='addB15'> <input type='button' class='addcart' "+
 					"value='COMMANDER'></a>");
 			}
 	});	
});

