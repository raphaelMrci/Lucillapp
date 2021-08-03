window.$ = window.jQuery = require( 'jquery' );

const addBtn = document.getElementById( 'add_recipe_btn' );

const newIngredientOverlayOnRecipe = document.getElementById( 'new-ingredient-overlay' );

const cancelNewIngredientOnRecipe = document.getElementById( 'new-ingredient-cancel' );
const validateNewIngredientOnRecipe = document.getElementById( 'new-ingredient-validate' );


const addOverlay = document.getElementById( 'add_overlay' );
const addCancel = document.getElementById( 'add_cancel' );
const newComponentBtn = document.getElementById( 'add-recipe-component' );

const addComponentOverlay = document.getElementById( 'add-component-overlay' );
const cancelAddComponent = document.getElementById( 'cancel-add-component' );
const newIngredientInComp = document.getElementById( 'new-ingredient' );

const ingredientTab = document.getElementById( 'ing-tab' );
const recipeTab = document.getElementById( 'rec-tab' );
const addComponentBtn = document.getElementById( 'add-comp-btn' );


let addCompList = document.getElementById( 'add-comp-list' );

let selID;

let componentsList = [];


cancelNewIngredientOnRecipe.style.cursor = 'pointer';
cancelNewIngredientOnRecipe.onclick = () => {
    newIngredientOverlayOnRecipe.style.display = 'none';
    //TODO: Reset all fields
}

newIngredientInComp.onclick = () => {
    newIngredientOverlayOnRecipe.style.display = 'block';
    //TODO: Reset all fields
}


validateNewIngredientOnRecipe.style.cursor = 'pointer';




addComponentBtn.onclick = () => {

    if ( selID ) {
        // Split selected item ID (ing/rec _ 0-9+) => ['ing', 18]
        let compID = selID.split( '_' );

        if ( compID[ 0 ] == 'ing' ) {
            let ingredients = [];

            function loadIngredientsToAdd() {
                return new Promise( ( res, rej ) => {
                    storage.get( 'ingredients', ( err, ingArray ) => {
                        if ( err ) rej( err );
                        ingredients = ingArray;
                        res();
                    } );
                } );
            }

            // Add selected item to the components List
            loadIngredientsToAdd().then( () => {
                componentsList.push( ingredients[ compID[ 1 ] ] );
            } );
        } else if ( compID[ 1 ] == 'rec' ) {
            let recipes = [];

            function loadRecipesToAdd() {
                return new Promise( ( res, rej ) => {
                    storage.get( 'recipes', ( err, recArray ) => {
                        if ( err ) rej( err );
                        recipes = recArray;
                        res();
                    } );
                } );
            }

            // Add selected item to the components List
            loadRecipesToAdd().then( () => {
                componentsList.push( recipes[ compID[ 1 ] ] );
            } );
        }

        addComponentOverlay.style.display = 'none';
    }
}

addBtn.style.cursor = 'pointer';
addBtn.onclick = () => {
    addOverlay.style.display = 'block';
}

addCancel.style.cursor = 'pointer';
addCancel.onclick = () => {
    addOverlay.style.display = 'none';
}

newComponentBtn.style.cursor = 'pointer';
newComponentBtn.onclick = () => {
    addComponentOverlay.style.display = 'block';
    initIngredientsOnComp();
}

cancelAddComponent.style.cursor = 'pointer';
cancelAddComponent.onclick = () => {
    addComponentOverlay.style.display = 'none';
}

ingredientTab.style.backgroundColor = '#E65A29';
recipeTab.style.backgroundColor = '#EA9170';

ingredientTab.style.cursor = 'pointer';
ingredientTab.onclick = () => {
    initIngredientsOnComp();


}

recipeTab.style.cursor = 'pointer';
recipeTab.onclick = () => {
    initRecipesOnComp();
}

function initIngredientsOnComp() {
    tab = 'ing';
    ingredientTab.style.backgroundColor = '#E65A29';
    recipeTab.style.backgroundColor = '#EA9170';
    newIngredientInComp.style.display = 'block';

    addComponentBtn.style.backgroundColor = '#EA9170';
    addComponentBtn.style.cursor = 'default';

    selID = null;



    let ingredients = [];

    function loadIngredientsOnComp() {
        console.log( 'Loading ingredients...' );
        return new Promise( ( res, rej ) => {
            storage.get( 'ingredients', ( err, ingArray ) => {
                if ( err ) rej( err );
                ingredients = ingArray;
                res();
            } );
        } );
    }

    //remove all the list
    addCompList.innerHTML = '';

    loadIngredientsOnComp().then( () => {

        validateNewIngredientOnRecipe.onclick = () => {
            if ( document.ingForm.name.value && document.ingForm.price.value && document.ingForm.refer_unity.value && document.ingForm.price_qty.value ) {

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
                newIngredient.name = document.ingForm.name.value.charAt( 0 ).toUpperCase() + document.ingForm.name.value.slice( 1 );
                newIngredient.price_type = document.ingForm.refer_unity.value;
                newIngredient.price = document.ingForm.price.value;
                newIngredient.price_qty = document.ingForm.price_qty.value;

                newArray.push( newIngredient );

                setIngredients( newArray ).then( () => {
                    newIngredientOverlayOnRecipe.style.display = 'none';
                    initIngredientsOnComp();
                } );
            }
        }

        document.ingForm.price_type.forEach( ( radio ) => {
            radio.addEventListener( 'change', () => {
                if ( radio.checked ) {
                    $( '#new-ingredient-overlay option' ).remove();
                    if ( radio.value == 'unity' ) {
                        let option = document.createElement( 'option' );
                        option.value = 'unity';
                        option.innerHTML += 'pièce';
                        document.ingForm.refer_unity.appendChild( option );
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

                        document.ingForm.refer_unity.appendChild( option1 );
                        document.ingForm.refer_unity.appendChild( option2 );
                        document.ingForm.refer_unity.appendChild( option3 );
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

                        document.ingForm.refer_unity.appendChild( option1 );
                        document.ingForm.refer_unity.appendChild( option2 );
                        document.ingForm.refer_unity.appendChild( option3 );
                    }
                }
            } );
        } );


        if ( ingredients.length > 0 ) {
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
                    addCompList.appendChild( letterIndexLi );

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
                    addCompList.appendChild( letterIndexLi );

                    let indexContainer = document.createElement( 'div' );
                    indexContainer.className += 'list-index';
                    letterIndexLi.appendChild( indexContainer );

                    let letter = document.createElement( 'h2' );
                    letter.innerHTML += ingredient.name.charAt( 0 ).toUpperCase();
                    indexContainer.appendChild( letter );
                }

                let li = document.createElement( 'li' );
                addCompList.appendChild( li );

                // Create a container for all the item.
                let container = document.createElement( 'div' );
                container.id = 'ing_' + ingredient.id;
                container.className += 'list-item';

                container.onclick = () => {
                    // Unselect previous item
                    console.log( selID );
                    if ( selID ) {
                        document.getElementById( selID ).classList.remove( 'selected-item' );
                    }


                    addComponentBtn.style.backgroundColor = '#e65a29';
                    addComponentBtn.style.cursor = 'pointer';

                    //Select current item
                    selID = 'ing_' + ingredient.id;

                    container.classList.add( 'selected-item' );
                }
                li.appendChild( container );

                let itemName = document.createElement( 'h2' );
                itemName.innerHTML = ingredient.name;
                container.appendChild( itemName );
            } );
        }
    } );
}

function initRecipesOnComp() {
    tab = 'rec';
    recipeTab.style.backgroundColor = '#E65A29';
    ingredientTab.style.backgroundColor = '#EA9170';
    newIngredientInComp.style.display = 'none';

    addComponentBtn.style.backgroundColor = '#EA9170';
    addComponentBtn.style.cursor = 'default';

    selID = null;



    let recipes1 = [];

    function loadRecipesOnComp() {
        return new Promise( ( res, rej ) => {
            storage.get( 'recipes', ( err, recArray ) => {
                if ( err ) rej( err );
                recipes1 = recArray;
                res();
            } );
        } );
    }

    //remove all the list
    addCompList.innerHTML = '';

    loadRecipesOnComp().then( () => {

        if ( recipes1.length > 0 ) {
            // Tri par ordre alphabétique
            recipes1.sort( ( a, b ) => {
                if ( a.name > b.name ) {
                    return 1;
                }
                if ( b.name > a.name ) {
                    return -1
                }
                return 0;
            } );

            let previousLetter = '#';

            recipes1.forEach( ( recipe, index ) => {
                if ( index == 0 ) {
                    previousLetter = recipe.name.charAt( 0 ).toUpperCase();
                    let letterIndexLi = document.createElement( 'li' );
                    addCompList.appendChild( letterIndexLi );

                    let indexContainer = document.createElement( 'div' );
                    indexContainer.className += 'list-index';
                    letterIndexLi.appendChild( indexContainer );

                    let letter = document.createElement( 'h2' );
                    letter.innerHTML += recipe.name.charAt( 0 ).toUpperCase();
                    indexContainer.appendChild( letter );

                }

                if ( previousLetter != recipe.name.charAt( 0 ).toUpperCase() ) {
                    previousLetter = recipe.name.charAt( 0 ).toUpperCase();
                    let letterIndexLi = document.createElement( 'li' );
                    addCompList.appendChild( letterIndexLi );

                    let indexContainer = document.createElement( 'div' );
                    indexContainer.className += 'list-index';
                    letterIndexLi.appendChild( indexContainer );

                    let letter = document.createElement( 'h2' );
                    letter.innerHTML += recipe.name.charAt( 0 ).toUpperCase();
                    indexContainer.appendChild( letter );
                }

                let li = document.createElement( 'li' );
                addCompList.appendChild( li );

                // Create a container for all the item.
                let container = document.createElement( 'div' );
                container.id = 'rec_' + recipe.id;
                container.className += 'list-item';

                container.onclick = () => {
                    // Unselect previous item
                    if ( selID ) {
                        document.getElementById( selID ).classList.remove( 'selected-item' );
                    }

                    addComponentBtn.style.backgroundColor = '#e65a29';
                    addComponentBtn.style.cursor = 'pointer';

                    //Select current item
                    selID = 'rec_' + recipe.id;

                    container.classList.add( 'selected-item' );
                }
                li.appendChild( container );

                let itemName = document.createElement( 'h2' );
                itemName.innerHTML = recipe.name;
                container.appendChild( itemName );
            } );
        }
    } );
}