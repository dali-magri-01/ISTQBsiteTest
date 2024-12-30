document.addEventListener('DOMContentLoaded', () => {
    // Récupérer le panier existant dans localStorage ou initialiser un tableau vide
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Sélection de toutes les cartes d'articles
    const articleCards = document.querySelectorAll('.article-card');

    // Ajout d'un écouteur d'événements à chaque bouton "Ajouter au panier"
    articleCards.forEach(card => {
        const addToCartButton = card.querySelector('.add-to-cart');

        addToCartButton.addEventListener('click', () => {
            // Récupération des données de l'article
            const productId = card.getAttribute('data-id');
            const productName = card.querySelector('h2').textContent;
            const productPrice = parseFloat(card.querySelector('.price').textContent.replace(/[^\d.]/g, '')); // Conversion du prix en nombre
            const quantityInput = card.querySelector('.quantity');
            let quantity = parseInt(quantityInput.value, 10);

            // Vérifie que la quantité est valide
            if (isNaN(quantity) || quantity <= 0) {
                alert('Veuillez saisir une quantité valide.');
                return;
            }

            // Vérifie si l'article est déjà dans le panier
            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity += quantity; // Ajoute la quantité
            } else {
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    quantity: quantity
                });
            }

            // Sauvegarde le panier dans localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Affichage d'une alerte et réinitialisation de la quantité
            alert(`${quantity} x ${productName} ajouté(s) au panier !`);
            quantityInput.value = 1;

            // Affiche le contenu du panier dans la console (pour le développement)
            console.log(cart);
        });
    });
});
