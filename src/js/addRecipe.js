window.$ = window.jQuery = require( 'jquery' );

const addBtn = document.getElementById( 'add_recipe_btn' );

const newIngredientOverlayOnRecipe = document.getElementById( 'new-ingredient-overlay' );

const cancelNewIngredientOnRecipe = document.getElementById( 'new-ingredient-cancel' );
const validateNewIngredientOnRecipe = document.getElementById( 'new-ingredient-validate' );

const validateNewRecipeBtn = document.getElementById( 'add_validate_btn' );

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

validateNewRecipeBtn.style.cursor = 'pointer';
validateNewRecipeBtn.onclick = () => {
    saveRecipe();
}


cancelNewIngredientOnRecipe.style.cursor = 'pointer';
cancelNewIngredientOnRecipe.onclick = () => {
    newIngredientOverlayOnRecipe.style.display = 'none';
    resetNewRecipe();
}

newIngredientInComp.style.cursor = 'pointer';
newIngredientInComp.onclick = () => {
    newIngredientOverlayOnRecipe.style.display = 'block';

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
                let curIng = ingredients.find( ( ingredient ) => ingredient.id == compID[ 1 ] );
                curIng.id = 'ing_' + curIng.id;
                componentsList.push( curIng );

                addComponentOverlay.style.display = 'none';
                insertComponent( curIng );
            } );
        } else if ( compID[ 0 ] == 'rec' ) {
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
                let curRec = recipes.find( ( recipe ) => recipe.id == compID[ 1 ] );
                curRec.id = 'rec_' + curRec.id;
                componentsList.push( curRec );

                addComponentOverlay.style.display = 'none';
                insertComponent( curRec );
            } );
        }


    }
}

addBtn.style.cursor = 'pointer';
addBtn.onclick = () => {
    addOverlay.style.display = 'block';
}

addCancel.style.cursor = 'pointer';
addCancel.onclick = () => {
    addOverlay.style.display = 'none';
    resetNewRecipe();
}

newComponentBtn.style.cursor = 'pointer';
newComponentBtn.onclick = () => {
    addComponentOverlay.style.display = 'block';
    initIngredientsOnComp();
}

cancelAddComponent.onclick = () => {
    addComponentOverlay.style.display = 'none';
}

ingredientTab.style.backgroundColor = '#E65A29';
recipeTab.style.backgroundColor = '#EA9170';

ingredientTab.onclick = () => {
    initIngredientsOnComp();
}

recipeTab.onclick = () => {
    initRecipesOnComp();
}

function initIngredientsOnComp() {
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
                newIngredient.unity = document.ingForm.refer_unity.value;
                newIngredient.price = document.ingForm.price.value;
                newIngredient.price_qty = document.ingForm.price_qty.value;

                newArray.push( newIngredient );

                setIngredients( newArray ).then( () => {
                    newIngredientOverlayOnRecipe.style.display = 'none';
                    initIngredientsOnComp();
                } );
            }
        }

        document.ingForm.unity.forEach( ( radio ) => {
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
    recipeTab.style.backgroundColor = '#E65A29';
    ingredientTab.style.backgroundColor = '#EA9170';
    newIngredientInComp.style.display = 'none';

    addComponentBtn.style.backgroundColor = '#EA9170';
    addComponentBtn.style.cursor = 'default';

    selID = null;



    let recipes = [];

    function loadRecipesOnComp() {
        return new Promise( ( res, rej ) => {
            storage.get( 'recipes', ( err, recArray ) => {
                if ( err ) rej( err );
                recipes = recArray;
                res();
            } );
        } );
    }

    //remove all the list
    addCompList.innerHTML = '';

    loadRecipesOnComp().then( () => {

        if ( recipes.length > 0 ) {
            // Tri par ordre alphabétique
            recipes.sort( ( a, b ) => {
                if ( a.name > b.name ) {
                    return 1;
                }
                if ( b.name > a.name ) {
                    return -1
                }
                return 0;
            } );

            let previousLetter = '#';

            recipes.forEach( ( recipe, index ) => {
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

const compList = document.getElementById( 'add-components-list' );

function insertComponent( comp ) {

    let li = document.createElement( 'li' );


    let div = document.createElement( 'div' );
    div.classList.add( 'component-container' );


    let title = document.createElement( 'h1' );
    title.innerHTML = comp.name;


    let qtyContainer = document.createElement( 'div' );
    qtyContainer.classList.add( 'comp-qty-container' );


    let qtyInput = document.createElement( 'input' );
    qtyInput.type = 'number';
    qtyInput.id = comp.id + '_qty';

    let deleteComponent = document.createElement( 'img' );
    deleteComponent.src = '../../img/delete_component.png';
    deleteComponent.classList.add( 'delete-component' );
    deleteComponent.onclick = () => {
        componentsList.splice( componentsList.findIndex( cmp => cmp.id == comp.id ), 1 );
        li.remove();
    }


    let unitySelector = document.createElement( 'select' );
    unitySelector.id = comp.id + '_unity';

    compList.appendChild( li );
    li.appendChild( div );
    div.appendChild( title );
    div.appendChild( qtyContainer );
    div.appendChild( deleteComponent );
    qtyContainer.appendChild( qtyInput );
    qtyContainer.appendChild( unitySelector );


    if ( comp.unity == 'kg' || comp.unity == 'g' || comp.unity == 'mg' ) {
        let opt1 = document.createElement( 'option' );
        opt1.value = 'kg';
        opt1.innerHTML = 'kg';
        unitySelector.appendChild( opt1 );

        let opt2 = document.createElement( 'option' );
        opt2.value = 'g';
        opt2.innerHTML = 'g';
        unitySelector.appendChild( opt2 );

        let opt3 = document.createElement( 'option' );
        opt3.value = 'mg';
        opt3.innerHTML = 'mg';
        unitySelector.appendChild( opt3 );
    } else if ( comp.unity == 'L' || comp.unity == 'cL' || comp.unity == 'mL' ) {
        let opt1 = document.createElement( 'option' );
        opt1.value = 'L';
        opt1.innerHTML = 'L';
        unitySelector.appendChild( opt1 );

        let opt2 = document.createElement( 'option' );
        opt2.value = 'cL';
        opt2.innerHTML = 'cL';
        unitySelector.appendChild( opt2 );

        let opt3 = document.createElement( 'option' );
        opt3.value = 'mL';
        opt3.innerHTML = 'mL';
        unitySelector.appendChild( opt3 );

    } else if ( comp.unity == 'piece' ) {
        let opt1 = document.createElement( 'option' );
        opt1.value = 'piece';
        opt1.innerHTML = 'pièce';
        unitySelector.appendChild( opt1 );
    }

}

function saveRecipe() {

    console.log( 'saving recipe...' );
    if ( !document.recipeForm.name.value || document.recipeForm.name.value <= 0 ) {
        console.warn( 'Problem with name field.' );
        return;
    }

    if ( !document.recipeForm.unity.value ) {
        console.warn( 'No unity selected' );
        return;
    }

    if ( !parseInt( document.recipeForm.qty.value ) || parseInt( document.recipeForm.qty.value ) <= 0 ) {
        console.warn( 'No quanty entered...' );
        return;
    }

    if ( !componentsList.length ) {
        console.warn( 'No components.' );
        return;
    }

    let recipes = [];

    function loadRecipesOnComp() {
        return new Promise( ( res, rej ) => {
            storage.get( 'recipes', ( err, recArray ) => {
                if ( err ) rej( err );
                recipes = recArray;
                res();
            } );
        } );
    }

    loadRecipesOnComp().then( () => {
        let index = 0;

        let newRecipeArray = recipes;

        while ( true ) {
            index++;

            if ( !newRecipeArray.some( ( ingredient ) => ingredient.id === index ) ) {
                break;
            }
        }

        let newRec = {
            name: document.recipeForm.name.value,
            id: index,
            unity: document.recipeForm.unity.value,
            qty: parseInt( document.recipeForm.qty.value ),
            components: []
        };

        let status = 'OK';

        componentsList.forEach( ( comp ) => {
            console.log( comp.id );
            let compID = comp.id.split( '_' );

            let newComp = {
                id: parseInt( compID[ 1 ] )
            }

            if ( compID[ 0 ] == 'ing' ) {
                newComp.group = 'ingredients';
            } else if ( compID[ 0 ] == 'rec' ) {
                newComp.group = 'recipes';
            }

            let unity = document.getElementById( comp.id + '_unity' );
            let qty = document.getElementById( comp.id + '_qty' );

            if ( !parseInt( qty.value ) || parseInt( qty.value ) <= 0 || !unity.value ) {
                console.warn( 'Component field uncompleted.' );
                status = 'ERROR';
            }

            newComp.unity = unity.value;
            newComp.qty = parseInt( qty.value );


            newRec.components.push( newComp );
        } );

        if ( status == 'ERROR' ) {
            return;
        }

        newRecipeArray.push( newRec );

        setRecipes( newRecipeArray ).then( () => {
            resetNewRecipe();
            window.location.href = '../html/recipes.html';
        } )
    } );


}

function resetNewRecipe() {
    compList.innerHTML = '';
    componentsList = [];
    document.recipeForm.qty.value = '';
    document.recipeForm.name.value = '';
}