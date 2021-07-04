const storage = require( 'electron-json-storage' );
let ingredients = [];

window.$ = window.jQuery = require( 'jquery' );

// Check if a list of ingredients already exists, and load or create it.
storage.has( 'ingredients', function ( error, hasKey ) {
    if ( error ) throw error;

    if ( !hasKey ) {
        let defaultIngredients = [ {
                "id": 1,
                "name": "Beurre",
                "price_type": "g",
                "price": 7.5
            },
            {
                "id": 2,
                "name": "Lait",
                "price_type": "cL",
                "price": 0.8
            },
            {
                "id": 3,
                "name": "Eau",
                "price_type": "cL",
                "price": 0.1
            },
            {
                "id": 4,
                "name": "Sel",
                "price_type": "g",
                "price": 1
            },
            {
                "id": 5,
                "name": "Farine",
                "price_type": "g",
                "price": 0.8
            },
            {
                "id": 6,
                "name": "Oeuf",
                "price_type": "unity",
                "price": 0.5
            }
        ];
        console.log( "Ingredient key doesn't exists" );
        setIngredients( defaultIngredients ).then( () => {
            loadIngredients().then( ( data ) => {
                ingredients = data;
                console.log( 'data loaded' );
                initIngredients();
            } );
        } );

    } else {
        console.log( "Ingredient key exists" );
        loadIngredients().then( ( data ) => {
            ingredients = data;
            initIngredients();
        } );
    }
} );

let deleteID;
const ingredientsList = document.getElementById( 'ingredients_list' );

const editOverlay = document.getElementById( 'edit_overlay' );
const editCross = document.getElementById( 'edit_cross' );
const deleteBtn = document.getElementById( 'delete' );

function initIngredients() {
    console.log( ingredients );

    if ( ingredients.length > 0 ) {
        let ul1 = document.createElement( 'ul' );
        ingredientsList.appendChild( ul1 );

        ingredients.forEach( ( ingredient, index ) => {
            let li = document.createElement( 'li' );
            ul1.appendChild( li );

            // Create a container for all the item. It is a flexbox (set on css)
            let container = document.createElement( 'div' );
            container.className += 'list-item';

            // Set a padding to the end of the list to be able to show last elements.
            if ( index == ingredients.length - 1 ) {
                container.style.paddingBottom = '200px';
                console.log( 'padding effectué.' );
            }
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
}



function openEditOverlay( ingredient ) {
    console.log( 'Open ' + ingredient.name + ' overlay...' );
    editOverlay.style.display = 'block';
    deleteID = ingredient.id;
}

deleteBtn.style.cursor = 'pointer';
deleteBtn.onclick = () => {
    let newArray = ingredients;
    let index = newArray.findIndex( ingredient => ingredient.id === deleteID );
    console.log( index );
    newArray.splice( index, 1 );

    setIngredients( newArray ).then( () => {
        window.location.href = '../html/ingredients.html';
    } )


}

function setIngredients( jsonObj ) {
    return new Promise( ( res, rej ) => {
        storage.set( 'ingredients', jsonObj, function ( error ) {
            if ( error ) rej( error );
            res();
        } );
    } )
}

function loadIngredients() {
    return new Promise( ( res, rej ) => {
        storage.get( 'ingredients', ( err, data ) => {
            if ( err ) rej( err );
            res( data );
        } );
    } )
}

editCross.style.cursor = 'pointer';
editCross.onclick = () => {
    editOverlay.style.display = 'none';
}