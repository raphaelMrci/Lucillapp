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
                "price_type": "kg",
                "price": 7.5,
                "price_qty": 1
            },
            {
                "id": 2,
                "name": "Lait",
                "price_type": "L",
                "price": 0.8,
                "price_qty": 1
            },
            {
                "id": 3,
                "name": "Eau",
                "price_type": "L",
                "price": 0.1,
                "price_qty": 1
            },
            {
                "id": 4,
                "name": "Sel",
                "price_type": "kg",
                "price": 1,
                "price_qty": 1
            },
            {
                "id": 5,
                "name": "Farine",
                "price_type": "kg",
                "price": 0.8,
                "price_qty": 1
            },
            {
                "id": 6,
                "name": "Oeuf",
                "price_type": "unity",
                "price": 0.5,
                "price_qty": 1
            },
            {
                "id": 7,
                "name": "Feuille de gélatine",
                "price_type": "unity",
                "price": 1,
                "price_qty": 1
            },
            {
                "id": 8,
                "name": "Jaune d'oeuf",
                "price_type": "unity",
                "price": 1,
                "price_qty": 1
            },
            {
                "id": 9,
                "name": "Sucre semoule",
                "price_type": "kg",
                "price": 1,
                "price_qty": 1
            },
            {
                "id": 16,
                "name": "Maïzena",
                "price_type": "kg",
                "price": 1,
                "price_qty": 1
            },
            {
                "id": 10,
                "name": "Sucre roux",
                "price_type": "kg",
                "price": 1,
                "price_qty": 1
            },
            {
                "id": 11,
                "name": "Beurre pommade",
                "price_type": "kg",
                "price": 1,
                "price_qty": 1
            },
            {
                "id": 12,
                "name": "Noisette",
                "price_type": "kg",
                "price": 1,
                "price_qty": 1
            },
            {
                "id": 13,
                "name": "Amandes",
                "price_type": "kg",
                "price": 1,
                "price_qty": 1
            },
            {
                "id": 14,
                "name": "Sucre blanc",
                "price_type": "kg",
                "price": 1,
                "price_qty": 1
            },
            {
                "id": 15,
                "name": "Fleur de sel",
                "price_type": "kg",
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
const editReferUnitySelect = document.editForm.refer_unity;

const addOverlay = document.getElementById( 'add_overlay' );
const addCross = document.getElementById( 'add_cross' );
const addValidateBtn = document.getElementById( 'add_validate_btn' );
const addBtn = document.getElementById( 'add_ingredient_btn' );
const addReferUnitySelect = document.addForm.refer_unity;

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
        newIngredient.price_type = document.addForm.refer_unity.value;
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

            if ( ingredient.price_type == 'kg' || ingredient.price_type == 'L' || ingredient.price_type == 'unity' ) {
                priceString = ingredient.price / ingredient.price_qty;
            } else if ( ingredient.price_type == 'g' || ingredient.price_type == 'mL' ) {
                priceString = ingredient.price / ingredient.price_qty * 1000;
            } else if ( ingredient.price_type == 'cL' ) {
                priceString = ingredient.price / ingredient.price_qty * 100;
            } else if ( ingredient.price_type == 'mg' ) {
                priceString = ingredient.price / ingredient.price_qty * 1000000;
            }

            //Round the count
            priceString = Math.round( ( priceString + Number.EPSILON ) * 10 ) / 10;
            priceString += '€/';

            if ( ingredient.price_type == 'kg' || ingredient.price_type == 'g' || ingredient.price_type == 'mg' ) {
                priceString += 'kg';
            } else if ( ingredient.price_type == 'L' || ingredient.price_type == 'cL' || ingredient.price_type == 'mL' ) {
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

// Validate modified ingredient
editValidateBtn.style.cursor = 'pointer';
editValidateBtn.onclick = () => {
    if ( document.editForm.name.value && currentID && document.editForm.price.value && document.editForm.refer_unity.value && document.editForm.price_qty.value ) {
        let newArray = ingredients;
        let currentIngredientIndex = ingredients.findIndex( ( ingredient ) => ingredient.id === currentID );
        let edittedIngredient = {};

        edittedIngredient.name = document.editForm.name.value;
        edittedIngredient.id = currentID;
        edittedIngredient.price = document.editForm.price.value;
        edittedIngredient.price_qty = document.editForm.price_qty.value;
        edittedIngredient.price_type = document.editForm.refer_unity.value;

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
document.addForm.price_type.forEach( ( radio ) => {
    radio.addEventListener( 'change', () => {
        if ( radio.checked ) {
            $( 'option' ).remove();
            if ( radio.value == 'unity' ) {
                let option = document.createElement( 'option' );
                option.value = 'unity';
                option.innerHTML += 'pièce';
                addReferUnitySelect.appendChild( option );
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

                addReferUnitySelect.appendChild( option1 );
                addReferUnitySelect.appendChild( option2 );
                addReferUnitySelect.appendChild( option3 );
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

                addReferUnitySelect.appendChild( option1 );
                addReferUnitySelect.appendChild( option2 );
                addReferUnitySelect.appendChild( option3 );
            }
        }
    } );
} );

// When radio are changed, selector content will be refreshed
document.editForm.price_type.forEach( ( radio ) => {
    radio.addEventListener( 'change', () => {
        if ( radio.checked ) {
            $( 'option' ).remove();
            if ( radio.value == 'unity' ) {
                let option = document.createElement( 'option' );
                option.value = 'unity';
                option.innerHTML += 'pièce';
                editReferUnitySelect.appendChild( option );
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

                editReferUnitySelect.appendChild( option1 );
                editReferUnitySelect.appendChild( option2 );
                editReferUnitySelect.appendChild( option3 );
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

                editReferUnitySelect.appendChild( option1 );
                editReferUnitySelect.appendChild( option2 );
                editReferUnitySelect.appendChild( option3 );
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

    if ( ingredient.price_type == 'unity' ) {
        document.editForm.price_type[ 0 ].checked = true;
        let option = document.createElement( 'option' );
        option.value = 'unity';
        option.innerHTML += 'pièce';
        editReferUnitySelect.appendChild( option );
    } else if ( ingredient.price_type == 'kg' || ingredient.price_type == 'g' || ingredient.price_type == 'mg' ) {
        document.editForm.price_type[ 1 ].checked = true;
        let option1 = document.createElement( 'option' );
        let option2 = document.createElement( 'option' );
        let option3 = document.createElement( 'option' );

        option1.value = 'kg';
        option2.value = 'g';
        option3.value = 'mg';

        option1.innerHTML += 'kg';
        option2.innerHTML += 'g';
        option3.innerHTML += 'mg';

        editReferUnitySelect.appendChild( option1 );
        editReferUnitySelect.appendChild( option2 );
        editReferUnitySelect.appendChild( option3 );
    } else if ( ingredient.price_type == 'L' || ingredient.price_type == 'cL' || ingredient.price_type == 'mL' ) {
        document.editForm.price_type[ 2 ].checked = true;
        let option1 = document.createElement( 'option' );
        let option2 = document.createElement( 'option' );
        let option3 = document.createElement( 'option' );

        option1.value = 'L';
        option2.value = 'cL';
        option3.value = 'mL';

        option1.innerHTML += 'L';
        option2.innerHTML += 'cL';
        option3.innerHTML += 'mL';

        editReferUnitySelect.appendChild( option1 );
        editReferUnitySelect.appendChild( option2 );
        editReferUnitySelect.appendChild( option3 );
    } else {
        console.warn( "Ingredient don't have valid unity" );
    }

    document.editForm.refer_unity.value = ingredient.price_type;
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