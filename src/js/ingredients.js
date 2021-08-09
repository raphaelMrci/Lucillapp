const storage = require( 'electron-json-storage' );
let ingredients = [];

window.$ = window.jQuery = require( 'jquery' );


// Set nav_selector position.
document.getElementById( 'nav_selector' ).style.left = 'calc(100%/6)';


// Check if a list of ingredients already exists, and load or create it.
storage.has( 'ingredients', function ( error, hasKey ) {
    if ( error ) throw error;

    if ( !hasKey ) {
        let defaultIngredients = [ {
                "id": 1,
                "name": "Beurre",
                "unity": "kg",
                "price": 7.5,
                "price_qty": 1
            },
            {
                "id": 2,
                "name": "Lait",
                "unity": "L",
                "price": 0.8,
                "price_qty": 1
            },
            {
                "id": 3,
                "name": "Eau",
                "unity": "L",
                "price": 0.1,
                "price_qty": 1
            },
            {
                "id": 4,
                "name": "Sel",
                "unity": "kg",
                "price": 1,
                "price_qty": 1
            },
            {
                "id": 5,
                "name": "Farine",
                "unity": "kg",
                "price": 0.8,
                "price_qty": 1
            },
            {
                "id": 6,
                "name": "Oeuf",
                "unity": "piece",
                "price": 0.5,
                "price_qty": 1
            },
            {
                "id": 7,
                "name": "Feuille de gélatine",
                "unity": "piece",
                "price": 1,
                "price_qty": 1
            },
            {
                "id": 8,
                "name": "Jaune d'oeuf",
                "unity": "piece",
                "price": 1,
                "price_qty": 1
            },
            {
                "id": 9,
                "name": "Sucre semoule",
                "unity": "kg",
                "price": 1,
                "price_qty": 1
            },
            {
                "id": 16,
                "name": "Maïzena",
                "unity": "kg",
                "price": 1,
                "price_qty": 1
            },
            {
                "id": 10,
                "name": "Sucre roux",
                "unity": "kg",
                "price": 1,
                "price_qty": 1
            },
            {
                "id": 11,
                "name": "Beurre pommade",
                "unity": "kg",
                "price": 1,
                "price_qty": 1
            },
            {
                "id": 12,
                "name": "Noisette",
                "unity": "kg",
                "price": 1,
                "price_qty": 1
            },
            {
                "id": 13,
                "name": "Amandes",
                "unity": "kg",
                "price": 1,
                "price_qty": 1
            },
            {
                "id": 14,
                "name": "Sucre blanc",
                "unity": "kg",
                "price": 1,
                "price_qty": 1
            },
            {
                "id": 15,
                "name": "Fleur de sel",
                "unity": "kg",
                "price": 1,
                "price_qty": 1
            }
        ];
        setIngredients( defaultIngredients ).then( () => {
            loadIngredients().then( ( data ) => {
                ingredients = data;
                initIngredients();
            } );
        } );

    } else {
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
const editValidateBtn = document.getElementById( 'edit_validate_btn' );
const editReferpieceSelect = document.editForm.refer_unity;

const addOverlay = document.getElementById( 'add_overlay' );
const addCross = document.getElementById( 'add_cross' );
const addValidateBtn = document.getElementById( 'add_validate_btn' );
const addBtn = document.getElementById( 'add_ingredient_btn' );
const addReferpieceSelect = document.addForm.refer_unity;

addValidateBtn.style.cursor = 'pointer';
addValidateBtn.onclick = () => {
    if ( document.addForm.name.value && document.addForm.price.value && document.addForm.refer_unity.value && document.addForm.price_qty.value ) {
        let newArray = ingredients;
        let newIngredient = {};

        let index = 0;

        while ( true ) {
            index++;

            if ( !newArray.some( ( ingredient ) => ingredient.id === index ) ) {
                break;
            }
        }
        newIngredient.id = index;
        //Set the first letter to Uppercase
        newIngredient.name = document.addForm.name.value.charAt( 0 ).toUpperCase() + document.addForm.name.value.slice( 1 );
        newIngredient.unity = document.addForm.refer_unity.value;
        newIngredient.price = document.addForm.price.value;
        newIngredient.price_qty = document.addForm.price_qty.value;

        newArray.push( newIngredient );

        setIngredients( newArray ).then( () => {
            window.location.href = '../html/ingredients.html';
        } );
    }
}

addBtn.style.cursor = 'pointer';
addBtn.onclick = () => {
    addOverlay.style.display = 'block';
}

addCross.style.cursor = 'pointer';
addCross.onclick = () => {
    addOverlay.style.display = 'none';
}

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

            let priceString;

            if ( ingredient.unity == 'kg' || ingredient.unity == 'L' || ingredient.unity == 'piece' ) {
                priceString = ingredient.price / ingredient.price_qty;
            } else if ( ingredient.unity == 'g' || ingredient.unity == 'mL' ) {
                priceString = ingredient.price / ingredient.price_qty * 1000;
            } else if ( ingredient.unity == 'cL' ) {
                priceString = ingredient.price / ingredient.price_qty * 100;
            } else if ( ingredient.unity == 'mg' ) {
                priceString = ingredient.price / ingredient.price_qty * 1000000;
            }

            //Round the count
            priceString = Math.round( ( priceString + Number.EPSILON ) * 10 ) / 10;
            priceString += '€/';

            if ( ingredient.unity == 'kg' || ingredient.unity == 'g' || ingredient.unity == 'mg' ) {
                priceString += 'kg';
            } else if ( ingredient.unity == 'L' || ingredient.unity == 'cL' || ingredient.unity == 'mL' ) {
                priceString += 'L';
            } else if ( ingredient.unity == 'piece' ) {
                priceString += 'pièce';
            } else {
                console.error( "ERROR: ingredient " + ingredient.id + " : unexpected unity\t" + ingredient.unity );
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

// Validate modified ingredient
editValidateBtn.style.cursor = 'pointer';
editValidateBtn.onclick = () => {
    if ( document.editForm.name.value && currentID && document.editForm.price.value && document.editForm.refer_piece.value && document.editForm.price_qty.value ) {
        let newArray = ingredients;
        let currentIngredientIndex = ingredients.findIndex( ( ingredient ) => ingredient.id === currentID );
        let edittedIngredient = {};

        edittedIngredient.name = document.editForm.name.value;
        edittedIngredient.id = currentID;
        edittedIngredient.price = document.editForm.price.value;
        edittedIngredient.price_qty = document.editForm.price_qty.value;
        edittedIngredient.unity = document.editForm.refer_piece.value;

        newArray.splice( currentIngredientIndex, 1 );

        newArray.push( edittedIngredient );

        setIngredients( newArray ).then( () => {
            window.location.href = '../html/ingredients.html';
        } );
    } else {
        console.warn( 'Edit form incomplete' );
    }

}

// When radio are changed, selector content will be refreshed
document.addForm.unity.forEach( ( radio ) => {
    radio.addEventListener( 'change', () => {
        if ( radio.checked ) {
            $( 'option' ).remove();
            if ( radio.value == 'piece' ) {
                let option = document.createElement( 'option' );
                option.value = 'piece';
                option.innerHTML += 'pièce';
                addReferpieceSelect.appendChild( option );
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

                addReferpieceSelect.appendChild( option1 );
                addReferpieceSelect.appendChild( option2 );
                addReferpieceSelect.appendChild( option3 );
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

                addReferpieceSelect.appendChild( option1 );
                addReferpieceSelect.appendChild( option2 );
                addReferpieceSelect.appendChild( option3 );
            }
        }
    } );
} );

// When radio are changed, selector content will be refreshed
document.editForm.unity.forEach( ( radio ) => {
    radio.addEventListener( 'change', () => {
        if ( radio.checked ) {
            $( 'option' ).remove();
            if ( radio.value == 'piece' ) {
                let option = document.createElement( 'option' );
                option.value = 'piece';
                option.innerHTML += 'pièce';
                editReferpieceSelect.appendChild( option );
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

                editReferpieceSelect.appendChild( option1 );
                editReferpieceSelect.appendChild( option2 );
                editReferpieceSelect.appendChild( option3 );
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

                editReferpieceSelect.appendChild( option1 );
                editReferpieceSelect.appendChild( option2 );
                editReferpieceSelect.appendChild( option3 );
            }
        }
    } );
} );

function openEditOverlay( ingredient ) {
    editOverlay.style.display = 'block';
    currentID = ingredient.id;
    document.editForm.name.value = ingredient.name;
    document.editForm.price_qty.value = ingredient.price_qty;
    document.editForm.price.value = ingredient.price;

    $( 'option' ).remove();

    if ( ingredient.unity == 'piece' ) {
        document.editForm.unity[ 0 ].checked = true;
        let option = document.createElement( 'option' );
        option.value = 'piece';
        option.innerHTML += 'pièce';
        editReferpieceSelect.appendChild( option );
    } else if ( ingredient.unity == 'kg' || ingredient.unity == 'g' || ingredient.unity == 'mg' ) {
        document.editForm.unity[ 1 ].checked = true;
        let option1 = document.createElement( 'option' );
        let option2 = document.createElement( 'option' );
        let option3 = document.createElement( 'option' );

        option1.value = 'kg';
        option2.value = 'g';
        option3.value = 'mg';

        option1.innerHTML += 'kg';
        option2.innerHTML += 'g';
        option3.innerHTML += 'mg';

        editReferpieceSelect.appendChild( option1 );
        editReferpieceSelect.appendChild( option2 );
        editReferpieceSelect.appendChild( option3 );
    } else if ( ingredient.unity == 'L' || ingredient.unity == 'cL' || ingredient.unity == 'mL' ) {
        document.editForm.unity[ 2 ].checked = true;
        let option1 = document.createElement( 'option' );
        let option2 = document.createElement( 'option' );
        let option3 = document.createElement( 'option' );

        option1.value = 'L';
        option2.value = 'cL';
        option3.value = 'mL';

        option1.innerHTML += 'L';
        option2.innerHTML += 'cL';
        option3.innerHTML += 'mL';

        editReferpieceSelect.appendChild( option1 );
        editReferpieceSelect.appendChild( option2 );
        editReferpieceSelect.appendChild( option3 );
    } else {
        console.warn( "Ingredient don't have valid piece" );
    }

    document.editForm.refer_unity.value = ingredient.unity;
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