const express = require('express');
const path = require('path');
const app = express();
const { Pool } = require('pg'); //Connecte le serveur à la BDD
const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'pizzeria',
	password: 'fellou',
	port: 5432,
});
const Cart = require('./cart'); //cart.js
const session = require('express-session'); 

pool.connect(err => {
  if (err) {
    console.error('Erreur de connexion à la BDD:\n', err.stack)
  } else {
    console.log('Serveur connecté à la BDD: pizzeria');
  }
});

const dataE = []; //stock les entrées

//applique une requète SQL 
pool.connect().then((client) => {
	//Requete SQL qui récupère les entrées dans la BBD
	const query = ` 
		SELECT *
		FROM entrees`;
	client.query(query).then(res => {
		for (let row of res.rows){
            dataE.push(row);
        }
        //console.log(dataE);
    }).catch(err => {
		  console.error(err);
      });
}).catch(err => {
	console.error(err);
});

const dataP = []; //stock les pizza prédéfinie

pool.connect().then((client) => {
	//Requete SQL qui récupère les pizzas prédéfini dans la BBD
	const query = ` 
		SELECT *
		FROM pizzaPre`;
	client.query(query).then(res => {
		for (let row of res.rows){
            dataP.push(row);
        }
        //console.log(dataP);
    }).catch(err => {
		  console.error(err);
      });
}).catch(err => {
	console.error(err);
});

const dataB = []; //stock les boissons

pool.connect().then((client) => {
	//Requete SQL qui récupère les boissons dans la BBD
	const query = ` 
		SELECT *
		FROM boissons`;
	client.query(query).then(res => {
		for (let row of res.rows){
            dataB.push(row);
        }
        //console.log(dataB);
    }).catch(err => {
		  console.error(err);
      });
}).catch(err => {
	console.error(err);
});

const dataS = []; //stock les sauces

pool.connect().then((client) => {
	//Requete SQL qui récupère les sauces dans la BBD
	const query = ` 
		SELECT *
		FROM sauce`;
	client.query(query).then(res => {
		for (let row of res.rows){
            dataS.push(row);
        }
        //console.log(dataS);
    }).catch(err => {
		  console.error(err);
      });
}).catch(err => {
	console.error(err);
});

function trouver(ID){ //cherche le produit dans la BDD grace à l'ID
	for (i = 0; i < dataE.length; i++){
		if (dataE[i].id == ID){
			console.log("Produit trouvé dans la BDD");
			 return dataE[i];
		} 
	}

	for (i = 0; i < dataP.length; i++){
		if (dataP[i].id == ID){
			console.log("Produit trouvé dans la BDD");
			return dataP[i];
		}
	}

	for (i = 0; i < dataB.length; i++){
		if (dataB[i].id == ID){
			console.log("Produit trouvé dans la BDD");
			return dataB[i];
		}
	}

	for (i = 0; i < dataS.length; i++){
		if (dataS[i].id == ID){
			console.log("Produit trouvé dans la BDD");
			return dataS[i];
		}
	}

	console.log("Erreur! ce produit n'est pas dans la BDD");	
}

app.use(session({ //commence la session
	secret: 'supersecret',
	resave: true,
	saveUninitialized: true,
	cookie: {secure: false}
}));

app.use(function(req, res, next){ //session pour le panier
	res.locals.session = req.session;
	next();
}); 

app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + ''));

app.set('view engine', 'ejs');

//Routes des pages et fonctions

app.route('/').get((req, res) => {
	res.sendFile(__dirname + "/pizzeria.html");
});

app.route('/pizzeria').get((req, res) => {
	res.sendFile(__dirname + "/pizzeria.html");
});

//Affiche les prix et noms des produits sur la page carte, depuis la BDD
app.route('/carte').get((req, res) => {
	res.render("carte", {data : {Entrees: dataE,
							     pizzaPre: dataP,
								 Boissons: dataB,
								 Sauce: dataS}});
});

//Page du panier
app.route('/panier').get((req, res) => {
	let cart = new Cart(req.session.cart);
	if (!req.session.cart){
		res.render("panier", {data: {articles: null}});
		/*si il y a aucun articles dans le panier, on affiche
		un contenu différent */ 
	} else {
		res.render("panier", {data: {articles: cart.listeItem(), 
						         	 prixTotal : cart.prixTotal,
						         	 qtéTotal : cart.qtéTotal}});
	}
});

//Menu qui se trouve en haut de chaque page
app.route('/header').get((req, res) => {
	let articles = 0;
	let livreur = null;
	if (req.session.cart)
		articles = req.session.cart.qtéTotal;
	if (req.session.login)
		livreur = req.session.login
	res.render("header", {data: {articles: articles,
								 livreur: livreur}});
});

//fonction pour déconnecter le livreur
app.route('/disconnect').get((req, res) => {
	if (req.session.login)
		req.session.login = null;
	res.redirect('back');
});

//Ajoute un élément au panier
app.get('/add-to-cart/:id', function(req, res){
	let cart = req.session.cart;
	let produitID = req.params.id;
	if (cart == null){
		cart = new Cart();
		console.log("La session cart est null, creation...");
	} else {
		cart = new Cart(cart); 
		/*req session ne garde pas les fonctions de cart, on refait
		un panier en gardant les anciennes données*/
	}
	let produit = trouver(produitID);
	if (produit == null){
		console.log("Rien n'a été ajouté au panier");
		res.redirect('back');
	}
	cart.add(produit, produitID);
	console.log("Un produit a été ajouté au panier");
	req.session.cart = cart;
	console.log(req.session.cart);
	res.redirect('back');
});

//Ajoute deux produit en même temps (pour les sauces)
app.get('/add-to-cart/:id/:id2', function(req, res){
	let cart = req.session.cart;
	let produitID1 = req.params.id;
	let produitID2 = req.params.id2;
	if (cart == null){
		cart = new Cart();
		console.log("La session cart est null, creation...");
	} else {
		cart = new Cart(cart); 
	}
	let produit1 = trouver(produitID1);
	let produit2 = trouver(produitID2);
	if (produit1 == null || produit2 == null){
		console.log("Rien n'a été ajouté au panier");
	} else {
		cart.add(produit1, produitID1);
		console.log("Un produit a été ajouté au panier");
		cart.add(produit2, produitID2);
		console.log("2 produit ont été ajouté au panier");
		req.session.cart = cart;
		console.log(req.session.cart);
		res.redirect('back');
	}
});

//Retire un élément du panier
app.get('/remove-from-cart/:id', function(req, res){
	let cart = req.session.cart;
	let produitID = req.params.id;
	if (cart == null){
		cart = new Cart();
		console.log("La session cart est null, rien à enlever");
	} else {
		cart = new Cart(cart);
	}
	cart.remove(produitID);
	console.log("Un produit a été retirer du panier");
	req.session.cart = cart;
	console.log(req.session.cart);
	res.redirect('back');
});

//Retire tous les éléments du panier
app.get('/empty-cart', function(req, res){
	let cart = new Cart();
	req.session.cart = cart;
	console.log("Le panier à été vidé");
	res.redirect('back');
});

//affiche une page de validation qui demande les coordonnées du clients
app.route('/valide-cart').get((req, res) => {
	res.sendFile(__dirname + "/valider.html");
});

const commandecart = []; //stock les paniers des commandes

//valide la commande est vide le panier
app.post('/isvalid', function(req, res){
	//ajoute les coordonnees à la BDD
	const query =`
		INSERT INTO coordonnees (nom, prenom, addresse, addresse2, ville, 
		code_postal, code_entree, numerotel, email, heure, charge)
		VALUES ('` + req.body.nom + `', '` + req.body.prenom + `', 
		'` + req.body.address +`', '` + req.body.address2 + `', 
		'` + req.body.ville + `', '` + req.body.zipcode + `', 
		'` + req.body.code + `', '` + req.body.phone + `', 
		'` + req.body.email + `', '` + req.body.time + `', 
		'0')
		`;
	pool.query(query, (err, res) => {
		if(err){
			console.error(err);
		}
		console.log("Une commande à été enregistré, coordonnées:");
		console.log(req.body);
		console.log("Panier vider");
		commandecart.push(new Cart(req.session.cart));
		req.session.cart = new Cart();
	});
	res.redirect('/valide');
});

//page qui confirme la validation de commande
app.route('/valide').get((req, res) => {
	if (req.session.cart)
		req.session.cart = new Cart();
	res.sendFile(__dirname + "/valide.html");
});


//page de livraison
app.route('/livraison').get((req, res) => {
	if(req.session.login){
		for (let i = 0; i < commandecart.length; i++){
			req.session.commandecart[i] = 
			new Cart(commandecart[i]);
		}
		res.render("livraison", {data:{donnees: req.session.donnees,
									   check: req.session.check,
									   login: req.session.login,
									   commande: req.session.commandecart,
									   livreur: req.session.livreur}});
			/*	});
			});
		} */
	} else {
		res.render("livraison", {data:{}});
	}
});

//fonction pour se connecter et afficher les
app.post('/livraison', function(req, res){
	let x;
	let check;
	let donnees = [];
	//Requete SQL qui récupère le livreur dans la BDD
	const query = ` 
		SELECT *
		FROM livreur
		WHERE username = '` + req.body.nom + `'
		AND mdp = crypt('` + req.body.mdp + `', mdp)`;
	let query2;
	pool.query(query).then(response => {
		for (let row of response.rows){
			x = row;
		}
		if(typeof x == 'undefined'){
			check = 0;
			console.log("Tentative de connexion de livreur échouée");
			console.log("Mauvais nom d'utilisateur ou MDP");
			donnees = null;
			res.render("livraison", {data: {donnees: donnees,
										    check: check,
										    login: null}});
		} else {
			req.session.login = req.body.nom;
			req.session.livreur = x;
			check = 1;
			console.log("Livreur trouvé:", x.username);
			query2=`
				SELECT *
				FROM coordonnees
				ORDER by nom ASC
			`;
			pool.query(query2).then(response => {
				for (let row of response.rows){
					donnees.push(row);
				}
				/*on utilise session pour éviter les bugs
				lorsqu'on revient sur /livrasion */
				req.session.donnees = donnees;
				req.session.check = check;
				req.session.commandecart = commandecart;
				res.render("livraison", {data: {donnees: req.session.donnees,
											check: req.session.check,
											login: req.session.login,
											commande: req.session.commandecart,
											livreur: req.session.livreur}});
			});
		}
	}).catch(err => {
		console.error(err);
    });
});

//Met le livreur en charge d'une commande
app.get('/encharge/:id', function(req, res){
	let x;
	let donnees=[];
	let livreur;
	const query=`
		SELECT *
		FROM coordonnees
		WHERE id = '` + req.params.id + `'
	`;
	pool.query(query).then(response => {
		for (let row of response.rows){
			x = row;
		}
		if(typeof x == 'undefined'){
			console.log("cette commande n'existe pas");
			res.redirect('back');
		} else {
			if (req.session.login){
				const query2=`
					UPDATE coordonnees
					SET charge = '1'
					WHERE id = '` + req.params.id + `'
				`;
				pool.query(query2, (err, response) => {
					if(err){
						console.error(err);
					}
					const query3=`
						UPDATE livreur
						SET cid = '` + req.params.id + `'
						WHERE username = '` + req.session.login + `'
					`;
					pool.query(query3, (err, response) => {
						if(err){
							console.error(err);
						}
						console.log("commande prit en charge par: ",
							req.session.login);
						const query4=`
							SELECT *
							FROM coordonnees
							ORDER by nom ASC
						`;
						pool.query(query4).then(response => {
							for (let row of response.rows){
								donnees.push(row);
							}
							req.session.donnees = donnees;
							req.session.commmandecart = commandecart;
							const query5=`
								SELECT *
								FROM livreur
								WHERE username = '` + req.session.login + `'
							`;
							pool.query(query5).then(response => {
								for (let row of response.rows){
									livreur = row;
								}
								req.session.livreur = livreur;
								req.session.login = livreur.username;
								res.redirect('back')
							});
						});
					});
				});
			} else {
				console.log("aucun livreur connecté, echec")
				res.redirect('back');
			}
		}
	});
});

//indique que la livraison à été effectuée
app.get('/livre/:id/:id2', function(req, res){
	let x;
	let donnees=[];
	let livreur;
	const query=`
		SELECT *
		FROM coordonnees
		WHERE id = '` + req.params.id + `'
	`;
	pool.query(query).then(response =>{
		for (let row of response.rows){
			x = row;
		}
		if (typeof x == 'undefined'){
			console.log("cette commande n'existe pas");
			res.redirect('back');
		} else {
			if (req.session.login){
				const query2=`
					UPDATE livreur
					set cid = null
					WHERE id = '` + req.params.id2 + `'
				`;
				pool.query(query2, (err, response) => {
					if(err){
						console.error(err);
					}
					const query3=`
						DELETE FROM coordonnees
						WHERE id = '` + req.params.id + `'
					`;
					console.log('une livraison a été effectuée');
					pool.query(query3, (err, response) =>{
						if(err){
							console.error(err);
						}
						const query4=`
							SELECT *
							FROM coordonnees
						`;
						pool.query(query4).then(response => {
							for (let row of response.rows){
								donnees.push(row);
							}
							req.session.donnees = donnees;
							const query5=`
								SELECT *
								FROM livreur
								WHERE username = '` + req.session.login + `'
							`;
							pool.query(query5).then(response => {
								for (let row of response.rows){
									livreur = row;
								}
								console.log("mise à jour de l'affichage");
								req.session.livreur = livreur;
								req.session.login = livreur.username;
								res.redirect('back');
							});
						});
					});
				});
			} else {
				console.log("aucun livreur connecté, echec")
				res.redirect('back');
			}
		}
	});
});

app.listen(8080);
console.log("Le serveur écoute sur le port: " + 8080);