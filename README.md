Tutoriel:
Placer un terminal dans le Fichier "pw6-fellou-niako"

Base de données:
-tapez la commande: sudo service postgresql start (si besoin)
-tapez la commande: export PGHOST=localhost (si vous utilisez localhost)
-tapez la commande: connecter un utilisateur quelconque à psql
-tapez la commande: CREATE DATABASE pizzeria;
-déconnectez vous de psql
-dans le fichier serveur.js à la ligne 7, changez les valeurs
avec ce qui correspond pour votre machine (user, host, password)
-tapez la commande: psql -U nom_utilisateur -d pizzeria -f init.sql
où nom_utilisateur est le nom de l'utilisateur utilisé à la ligne 8

Site:
lancer la commande: node serveur.js
taper le lien ci-dessous dans un navigateur:
http://localhost:8080

Identifiant de livreur:
Nom d'utilisateur: Fellou
mot de passe: 123456
Nom d'utilisateur: Niako
mot de passe: 123456

Bugs:
Parfois, ajouter certains produits créer un bug qui affiche un prix
avec beaucoup de chiffre après la virgule
Supprimer un élément corrige ce bug (parfois, ajouter un
élément permet aussi de le corriger)

Sur certains navigateurs (Firefox par example), le css du header dépasse
de quelque pixel quand on survole les boutons du menus, mais ce n'est pas
le cas sur Google Chrome

Fonctionnalité manquante:
-Menus
-Pizza personalisable