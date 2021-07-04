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
                "price_type": "kg",
                "price": 7.5
            },
            {
                "id": 2,
                "name": "Lait",
                "price_type": "L",
                "price": 0.8
            },
            {
                "id": 3,
                "name": "Eau",
                "price_type": "L",
                "price": 0.1
            },
            {
                "id": 4,
                "name": "Sel",
                "price_type": "kg",
                "price": 1
            },
            {
                "id": 5,
                "name": "Farine",
                "price_type": "kg",
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

let currentID;
const ingredientsList = document.getElementById( 'ingredients_list' );

const editOverlay = document.getElementById( 'edit_overlay' );
const editCross = document.getElementById( 'edit_cross' );
const deleteBtn = document.getElementById( 'delete' );
const validateBtn = document.getElementById( 'validate_btn' );


const nameField = document.getElementById( 'name_ingredient' );

const priceTypeUnity = document.getElementById( 'price_type_choice1' );
const priceTypeKilo = document.getElementById( 'price_type_choice2' );
const priceTypeLiter = document.getElementById( 'price_type_choice3' );

const referUnitySelect = document.editForm.refer_unity;

function initIngredients() {

    if ( ingredients.length > 0 ) {
        let ul1 = document.createElement( 'ul' );
        ingredientsList.appendChild( ul1 );

        // Tri par ordre alphabétique
        ingredients.sort( ( a, b ) => {
            if ( a.name > b.name ) {
                return 1;
            }
            if ( b.name > a.name ) {
                return -1
            }
            return 0;
        } );

        let previousLetter = '#';

        ingredients.forEach( ( ingredient, index ) => {
            if ( index == 0 ) {
                previousLetter = ingredient.name.charAt( 0 ).toUpperCase();
                let letterIndexLi = document.createElement( 'li' );
                ul1.appendChild( letterIndexLi );

                let indexContainer = document.createElement( 'div' );
                indexContainer.className += 'list-index';
                letterIndexLi.appendChild( indexContainer );

                let letter = document.createElement( 'h2' );
                letter.innerHTML += ingredient.name.charAt( 0 ).toUpperCase();
                indexContainer.appendChild( letter );

            }

            if ( previousLetter != ingredient.name.charAt( 0 ).toUpperCase() ) {
                previousLetter = ingredient.name.charAt( 0 ).toUpperCase();
                let letterIndexLi = document.createElement( 'li' );
                ul1.appendChild( letterIndexLi );

                let indexContainer = document.createElement( 'div' );
                indexContainer.className += 'list-index';
                letterIndexLi.appendChild( indexContainer );

                let letter = document.createElement( 'h2' );
                letter.innerHTML += ingredient.name.charAt( 0 ).toUpperCase();
                indexContainer.appendChild( letter );
            }

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

            if ( ingredient.price_type == 'kg' ) {
                priceString += 'kg';
            } else if ( ingredient.price_type == 'L' ) {
                priceString += 'L';
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

validateBtn.style.cursor = 'pointer';
validateBtn.onclick = () => {
    let newArray = ingredients;
    let currentIngredientIndex = ingredients.findIndex( ( ingredient ) => ingredient.id === currentID );
    let edittedIngredient = {};

    edittedIngredient.name = document.editForm.name.value;
    edittedIngredient.id = currentID;
    edittedIngredient.price = document.editForm.price.value;
    edittedIngredient.price_type = document.editForm.refer_unity.value;

    newArray.splice( currentIngredientIndex, 1 );

    newArray.push( edittedIngredient );

    setIngredients( newArray ).then( () => {
        window.location.href = '../html/ingredients.html';
    } );

}

// When radio are changed, selector content will be refreshed
document.editForm.price_type.forEach( ( radio ) => {
    radio.addEventListener( 'change', () => {
        if ( radio.checked ) {
            $( 'option' ).remove();
            if ( radio.value == 'unity' ) {
                let option = document.createElement( 'option' );
                option.value = 'unity';
                option.innerHTML += 'pièce';
                referUnitySelect.appendChild( option );
            } else if ( radio.value == 'kg' ) {
                let option1 = document.createElement( 'option' );
                let option2 = document.createElement( 'option' );
                let option3 = document.createElement( 'option' );

                option1.value = 'kg';
                option2.value = 'g';
                option3.value = 'mg';

                option1.innerHTML += 'kg';
                option2.innerHTML += 'g';
                option3.innerHTML += 'mg';

                referUnitySelect.appendChild( option1 );
                referUnitySelect.appendChild( option2 );
                referUnitySelect.appendChild( option3 );
            } else if ( radio.value == 'L' ) {
                let option1 = document.createElement( 'option' );
                let option2 = document.createElement( 'option' );
                let option3 = document.createElement( 'option' );

                option1.value = 'L';
                option2.value = 'cL';
                option3.value = 'mL';

                option1.innerHTML += 'L';
                option2.innerHTML += 'cL';
                option3.innerHTML += 'mL';

                referUnitySelect.appendChild( option1 );
                referUnitySelect.appendChild( option2 );
                referUnitySelect.appendChild( option3 );
            }
        }
    } );
} );

function openEditOverlay( ingredient ) {
    editOverlay.style.display = 'block';
    currentID = ingredient.id;
    nameField.value = ingredient.name;
    $( 'option' ).remove();

    if ( ingredient.price_type == 'unity' ) {
        priceTypeUnity.checked = true;
        let option = document.createElement( 'option' );
        option.value = 'unity';
        option.innerHTML += 'pièce';
        referUnitySelect.appendChild( option );
    } else if ( ingredient.price_type == 'kg' ) {
        priceTypeKilo.checked = true;
        let option1 = document.createElement( 'option' );
        let option2 = document.createElement( 'option' );
        let option3 = document.createElement( 'option' );

        option1.value = 'kg';
        option2.value = 'g';
        option3.value = 'mg';

        option1.innerHTML += 'kg';
        option2.innerHTML += 'g';
        option3.innerHTML += 'mg';

        referUnitySelect.appendChild( option1 );
        referUnitySelect.appendChild( option2 );
        referUnitySelect.appendChild( option3 );
    } else if ( ingredient.price_type == 'L' ) {
        priceTypeLiter.checked = true;
        let option1 = document.createElement( 'option' );
        let option2 = document.createElement( 'option' );
        let option3 = document.createElement( 'option' );

        option1.value = 'L';
        option2.value = 'cL';
        option3.value = 'mL';

        option1.innerHTML += 'L';
        option2.innerHTML += 'cL';
        option3.innerHTML += 'mL';

        referUnitySelect.appendChild( option1 );
        referUnitySelect.appendChild( option2 );
        referUnitySelect.appendChild( option3 );
    } else {
        console.warn( "Ingredient don't have valid unity" );
    }
}

deleteBtn.style.cursor = 'pointer';
deleteBtn.onclick = () => {
    let newArray = ingredients;
    let index = newArray.findIndex( ingredient => ingredient.id === currentID );
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