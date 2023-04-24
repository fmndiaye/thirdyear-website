module.exports = function(oldCart){
	if(!oldCart){
		this.items = {};
		this.qtéTotal = 0;
		this.prixTotal = 0;
	}
	else {
		this.items = oldCart.items;
		this.qtéTotal = oldCart.qtéTotal;
		this.prixTotal = oldCart.prixTotal;
	}

	//ajoute un élément au panier
	this.add = function(item, id){
		let storedItem = this.items[id];
		if (!storedItem){
			storedItem = this.items[id] = {item: item, qté: 0, prix: 0};
		}
		storedItem.qté++;
		storedItem.prix = Number(storedItem.item.prix * 
			storedItem.qté).toFixed(2);
		//prix du nombre du produit en fonction de sa quantité dans le panier
		this.qtéTotal++;
		this.prixTotal += storedItem.item.prix;
	};

	//retire un élément du panier
	this.remove = function(id){
		let storedItem = this.items[id];
		if (storedItem){
			this.items[id].qté -= 1;
			this.items[id].prix -= Number(this.items[id].item.prix).toFixed(2);
			this.items[id].prix = Number((this.items[id].prix).toFixed(2));
			this.qtéTotal -= 1;
			this.prixTotal -= Number(this.items[id].item.prix).toFixed(2);
			this.prixTotal = Number((this.prixTotal).toFixed(2));
			/*Sans Number(), ajouter/supprimer des éléments peu parfois
			donner des résultat avec plusieurs nombre après la virgule
			au lieu de 2 (29.979999999999997 par example)*/
			if(this.items[id].qté == 0)
				delete this.items[id];
		}
	}

	//liste les items du panier
	this.listeItem  = function(){
		let x = [];
		for (let id in this.items) {
			x.push(this.items[id]);
		}
		return x;
	};
};
