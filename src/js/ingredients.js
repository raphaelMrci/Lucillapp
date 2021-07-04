var ingredients = [];
const ingredientsList = document.getElementById( 'ingredients_list' );

$.getJSON( '../../data/ingredients.json', ( data ) => {
    ingredients = data;

    if ( ingredients.length > 0 ) {
        let ul1 = document.createElement( 'ul' );
        ingredientsList.appendChild( ul1 );

        ingredients.forEach( ingredient => {
            let li = document.createElement( 'li' );
            ul1.appendChild( li );

            // Create a container for all the item. It is a flexbox (set on css)
            let container = document.createElement( 'div' );
            container.className += 'list-item';
            li.appendChild( container );

            // Create the list to set all elements (Name, price, edit button)
            let ul2 = document.createElement( 'ul' );
            container.appendChild( ul2 );

            // Create the name item
            let nameItem = document.createElement( 'li' );
            ul2.appendChild( nameItem );

            // Set the name on h2 element
            let Name = document.createElement( 'h2' );
            Name.innerHTML += ingredient.name;
            nameItem.appendChild( Name );



            let priceItem = document.createElement( 'li' );
            ul2.appendChild( priceItem );

            let priceString = ingredient.price + '€/';

            if ( ingredient.price_type == 'g' ) {
                priceString += 'kg';
            } else if ( ingredient.price_type == 'cL' ) {
                priceString += 'cl';
            } else if ( ingredient.price_type == 'unity' ) {
                priceString += 'pièce';
            } else {
                console.error( "ERROR: ingredient " + ingredient.id + " : unexpected price_type\t" + ingredient.price_type );
            }

            let price = document.createElement( 'h3' );
            price.innerHTML += priceString;
            priceItem.appendChild( price );



            let editItem = document.createElement( 'li' );
            ul2.appendChild( editItem );

            let editBtn = document.createElement( 'img' );
            editBtn.src = '../../img/pencil.png';
            editBtn.className += 'edit-item';
            editBtn.style.cursor = 'pointer';
            editBtn.onclick = () => {
                openEditOverlay( ingredient );
            }
            editItem.appendChild( editBtn );
        } );
    }
} );

function openEditOverlay( ingredient ) {
    console.log( 'Open ' + ingredient.name + ' overlay...' );
}