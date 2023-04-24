DROP TABLE IF EXISTS sauce CASCADE;
DROP TABLE IF EXISTS entrees CASCADE;
DROP TABLE IF EXISTS boissons CASCADE;
DROP TABLE IF EXISTS ingredient CASCADE;
DROP TABLE IF EXISTS pizzaPre CASCADE;
DROP TABLE IF EXISTS pizzaCus CASCADE;
DROP TABLE IF EXISTS coordonnees CASCADE;
DROP TABLE IF EXISTS livreur CASCADE;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE sauce(
	ID UUID PRIMARY KEY DEFAULT UUID_GENERATE_V4() NOT NULL,
	nom VARCHAR(100) NOT NULL,
	prix real NOT NULL
);

\copy sauce(nom, prix) from 'Sauce.txt' with (format csv, header);

CREATE TABLE entrees(
	ID UUID PRIMARY KEY DEFAULT UUID_GENERATE_V4() NOT NULL, 
	nom VARCHAR(100) NOT NULL,
	prix REAL NOT NULL
);

\copy entrees(nom, prix) from 'Entrees.txt' with (format csv, header);

CREATE TABLE boissons(
	ID UUID PRIMARY KEY DEFAULT UUID_GENERATE_V4() NOT NULL,
	nom VARCHAR(100) NOT NULL,
	prix REAL NOT NULL,
	cl INTEGER NOT NULL
);

\copy boissons(nom, prix, cl) from 'Boissons.txt' with (format csv, header);

CREATE TABLE ingredient(
	ID UUID PRIMARY KEY DEFAULT UUID_GENERATE_V4() NOT NULL,
	nom VARCHAR(100) NOT NULL,
	prix REAL NOT NULL
);

\copy ingredient(nom, prix) from 'ingredient.txt' with (format csv, header);

CREATE TABLE pizzaPre(
	ID UUID PRIMARY KEY DEFAULT UUID_GENERATE_V4() NOT NULL,
	nom VARCHAR(100) NOT NULL,
	size VARCHAR(100) NOT NULL,
	ingre1 VARCHAR(100),
	ingre2 VARCHAR(100),
	ingre3 VARCHAR(100),
	ingre4 VARCHAR(100),
	ingre5 VARCHAR(100),
	ingre6 VARCHAR(100),
	prix REAL NOT NULL
);


--\copy est trop long et dépassera les 80 colonnes, on creer donc les 
--pizza prédéfini à la main

INSERT INTO pizzaPre(
	nom, 
	size, 
	ingre1, 
	ingre2, 
	ingre3, 
	ingre4, 
	ingre5,  
	prix
)
VALUES
	(
		'4 Fromage',
		'Petite',
		'Parmesan',
		'Gorgonzola',
		'Mozzarella',
		'Fromage De Chèvre',
		'Tomate',
		6.49
	),
	(
		'4 Fromage',
		'Moyenne',
		'Parmesan',
		'Gorgonzola',
		'Mozzarella',
		'Fromage De Chèvre',
		'Tomate',
		8.99
	),
	(
		'4 Fromage',
		'Petite',
		'Parmesan',
		'Gorgonzola',
		'Mozzarella',
		'Fromage De Chèvre',
		'Tomate',
		11.49
	),
	(
		'Orientale',
		'Petite',
		'Tomate',
		'Mozzarella',
		'Merguez',
		'Ognion',
		'Poivron',
		6.49
	),
	(
		'Orientale',
		'Moyenne',
		'Tomate',
		'Mozzarella',
		'Merguez',
		'Ognion',
		'Poivron',
		8.99
	),
	(
		'Orientale',
		'Grande',
		'Tomate',
		'Mozzarella',
		'Merguez',
		'Ognion',
		'Poivron',
		11.49
	);

CREATE TABLE pizzaCus(
	ID UUID PRIMARY KEY DEFAULT UUID_GENERATE_V4() NOT NULL,
	size VARCHAR(100) NOT NULL,
	ingre1 VARCHAR(100),
	ingre2 VARCHAR(100),
	ingre3 VARCHAR(100),
	ingre4 VARCHAR(100),
	ingre5 VARCHAR(100),
	ingre6 VARCHAR(100),
	prix REAL NOT NULL
);

CREATE TABLE coordonnees(
	ID UUID PRIMARY KEY DEFAULT UUID_GENERATE_V4() NOT NULL,
	nom VARCHAR(100) NOT NULL,
	prenom VARCHAR(100) NOT NULL,
	addresse VARCHAR(100) NOT NULL,
	addresse2 VARCHAR(100),
	ville VARCHAR(100),
	code_postal INTEGER NOT NULL,
	code_entree INTEGER NOT NULL,
	numerotel VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL,
	heure TIME NOT NULL,
	charge BOOLEAN NOT NULL
);

CREATE TABLE livreur(
	ID UUID PRIMARY KEY DEFAULT UUID_GENERATE_V4() NOT NULL,
	username VARCHAR(100) NOT NULL UNIQUE,
	mdp VARCHAR(100) NOT NULL,
	cid UUID, 
	FOREIGN KEY(cid) REFERENCES coordonnees(id)
);

INSERT INTO livreur(username, mdp)
VALUES ('Fellou', crypt('123456', gen_salt('md5')));

INSERT INTO livreur(username, mdp)
VALUES ('Niako', crypt('123456', gen_salt('md5')));