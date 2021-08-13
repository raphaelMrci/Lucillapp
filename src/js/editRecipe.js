const editOverlay = document.getElementById( 'edit-overlay' );
const newIngredientOverlayOnRecipeEdit = document.getElementById( 'edit-new-ingredient-overlay' );

const validateNewIngredientOnRecipeEdit = document.getElementById( 'edit-new-ingredient-validate' );

const cancelEditOverlay = document.getElementById( 'edit-cancel' );
const validateEditBtn = document.getElementById( 'edit-validate-btn' );
const addComponentEditBtn = document.getElementById( 'add-component-edit-btn' );

const editNameField = document.getElementById( 'edit-name-recipe' );
const editQtyField = document.getElementById( 'edit-qty-recipe' );
const editUnitySelect = document.getElementById( 'edit-unity-select' );
const editComponentsList = document.getElementById( 'edit-components-list' );


const newComponentEditOverlay = document.getElementById( 'edit-add-component-overlay' );
const cancelNewComponentEdit = document.getElementById( 'cancel-edit-add-component' );
const ingredientTabEdit = document.getElementById( 'edit-ing-tab' );
const recipeTabEdit = document.getElementById( 'edit-rec-tab' );
const newIngredientInCompEdit = document.getElementById( 'new-ingredient-edit' );
const addComponentBtnEdit = document.getElementById( 'edit-add-comp-btn' );

let addCompListEdit = document.getElementById( 'edit-add-comp-list' );

let editCompList = [];
let curID;
let selEditID;

cancelNewComponentEdit.onclick = () => {
    newComponentEditOverlay.style.display = 'none';
}

ingredientTabEdit.style.backgroundColor = '#E65A29';
recipeTabEdit.style.backgroundColor = '#EA9170';

ingredientTabEdit.onclick = () => {
    initIngredientsOnCompEdit();
}

recipeTabEdit.onclick = () => {
    initRecipesOnCompEdit();
}

addComponentEditBtn.style.cursor = 'pointer';
addComponentEditBtn.onclick = () => {
    newComponentEditOverlay.style.display = 'block';
    initIngredientsOnCompEdit();
}

cancelEditOverlay.style.cursor = 'pointer';
cancelEditOverlay.onclick = () => {
    editOverlay.style.display = 'none';
    resetEditRecipe();
}

validateEditBtn.style.cursor = 'pointer';
validateEditBtn.onclick = () => {
    saveEditRecipe();

}

addComponentBtnEdit.onclick = () => {
    if ( selEditID ) {
        // Split selected item ID (ing/rec _ 0-9+) => ['ing', 18]
        let compID = selEditID.split( '_' );

        if ( compID[ 0 ] == 'ing' ) {
            let ingredients = [];

            function loadIngredientsToComponentEdit() {
                return new Promise( ( res, rej ) => {
                    storage.get( 'ingredients', ( err, ingArray ) => {
                        if ( err ) rej( err );
                        ingredients = ingArray;
                        res();
                    } );
                } );
            }

            // Add selected item to the components List
            loadIngredientsToComponentEdit().then( () => {
                let curIng = ingredients.find( ( ingredient ) => ingredient.id == compID[ 1 ] );
                curIng.id = 'ing_' + curIng.id;
                editCompList.push( curIng );

                insertEditComponent( curIng );
                newComponentEditOverlay.style.display = 'none';

            } ).catch( err => console.error( err ) );
        } else if ( compID[ 0 ] == 'rec' ) {
            let recipes = [];

            function loadRecipesToComponentEdit() {
                return new Promise( ( res, rej ) => {
                    storage.get( 'recipes', ( err, recArray ) => {
                        if ( err ) rej( err );
                        recipes = recArray;
                        res();
                    } );
                } );
            }

            // Add selected item to the components List
            loadRecipesToComponentEdit().then( () => {
                let curRec = recipes.find( ( recipe ) => recipe.id == compID[ 1 ] );
                curRec.id = 'rec_' + curRec.id;
                editCompList.push( curRec );
                insertEditComponent( curRec );
                newComponentEditOverlay.style.display = 'none';
            } ).catch( err => console.error( err ) );
        } else {
            console.error( `Component group unexpected! Recieved ${compID[ 0 ]}.` );
        }


    }
}

function editRecipe( recipe ) {

    curID = recipe.id;
    editComponentsList.innerHTML = '';

    editOverlay.style.display = 'block';

    editNameField.value = recipe.name;
    editQtyField.value = recipe.qty;
    editUnitySelect.value = recipe.unity;

    if ( recipe.components.length ) {


        let recipes = [];

        function loadRecipesToEdit() {
            return new Promise( ( res, rej ) => {
                storage.get( 'recipes', ( err, recArray ) => {
                    if ( err ) rej( err );
                    recipes = recArray;
                    res();
                } );
            } );
        }

        let ingredients = [];

        function loadIngredientsToEdit() {
            return new Promise( ( res, rej ) => {
                storage.get( 'ingredients', ( err, ingArray ) => {
                    if ( err ) rej( err );
                    ingredients = ingArray;
                    res();
                } );
            } );
        }

        loadIngredientsToEdit().then( () => {
            loadRecipesToEdit().then( () => {
                recipe.components.forEach( comp => {
                    let item;

                    console.log( comp.id );

                    if ( comp.group == 'ingredients' ) {
                        item = ingredients.find( ( ingredient ) => ingredient.id == comp.id );
                        item.id = 'ing_' + item.id;

                    } else if ( comp.group == 'recipes' ) {
                        item = recipes.find( ( curRecipe ) => curRecipe.id == comp.id );
                        item.id = 'rec_' + item.id;
                    }
                    editCompList.push( item );
                    insertEditComponent( item, comp.qty, comp.unity );
                } );
            } );
        } );

    }
}

function insertEditComponent( comp, qty, unity ) {

    let li = document.createElement( 'li' );


    let div = document.createElement( 'div' );
    div.classList.add( 'component-container' );


    let title = document.createElement( 'h1' );
    title.innerHTML = comp.name;


    let qtyContainer = document.createElement( 'div' );
    qtyContainer.classList.add( 'comp-qty-container' );


    let qtyInput = document.createElement( 'input' );
    qtyInput.type = 'number';
    qtyInput.id = comp.id + '_editQty';
    if ( qty ) {
        qtyInput.value = qty;
    }

    let deleteComponent = document.createElement( 'img' );
    deleteComponent.src = '../../img/delete_component.png';
    deleteComponent.classList.add( 'delete-component' );
    deleteComponent.onclick = () => {
        editCompList.splice( editCompList.findIndex( cmp => cmp.id == comp.id ), 1 );
        li.remove();
    }

    let unitySelector = document.createElement( 'select' );
    unitySelector.id = comp.id + '_editUnity';

    editComponentsList.appendChild( li );
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
    if ( unity ) {
        unitySelector.value = unity;
    }

}

function saveEditRecipe() {

    console.log( 'saving recipe...' );
    if ( !document.editRecipeForm.name.value || document.editRecipeForm.name.value <= 0 ) {
        console.warn( 'Problem with name field.' );
        return;
    }

    if ( !document.editRecipeForm.unity.value ) {
        console.warn( 'No unity selected' );
        return;
    }

    if ( !parseInt( document.editRecipeForm.qty.value ) || parseInt( document.editRecipeForm.qty.value ) <= 0 ) {
        console.warn( 'No quantity entered...' );
        return;
    }

    if ( !editCompList.length ) {
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

        let newRecipeArray = recipes;


        let newRec = {
            name: document.editRecipeForm.name.value,
            id: curID,
            unity: document.editRecipeForm.unity.value,
            qty: parseInt( document.editRecipeForm.qty.value ),
            components: []
        };

        let status = 'OK';
        let code = 200;

        editCompList.forEach( ( comp ) => {
            let splittedID = comp.id.split( '_' );

            let newComp = {
                id: splittedID[ 1 ],
            }

            if ( splittedID[ 0 ] == 'rec' ) newComp.group = 'recipes';
            else if ( splittedID[ 0 ] == 'ing' ) newComp.group = 'ingredients';
            else {
                status = 'ERROR';
                code = 1;
            }

            let unity = document.getElementById( comp.id + '_editUnity' );
            let qty = document.getElementById( comp.id + '_editQty' );


            if ( !parseInt( qty.value ) || parseInt( qty.value ) <= 0 || !unity.value ) {
                console.warn( 'Component field uncompleted.' );
                status = 'ERROR';
                code = 2;
            }

            newComp.unity = unity.value;
            newComp.qty = parseInt( qty.value );


            newRec.components.push( newComp );
        } );

        if ( status == 'ERROR' ) {
            console.error( `An error was occured while saving... CODE: ${code}` );
            return;
        }

        // Delete old recipe version on the array
        newRecipeArray.splice( newRecipeArray.findIndex( recipe => recipe.id == curID ), 1 );

        newRecipeArray.push( newRec );

        setRecipes( newRecipeArray ).then( () => {
            resetEditRecipe();
            window.location.href = '../html/recipes.html';
        } )
    } );


}

function initIngredientsOnCompEdit() {
    ingredientTabEdit.style.backgroundColor = '#E65A29';
    recipeTabEdit.style.backgroundColor = '#EA9170';
    newIngredientInCompEdit.style.display = 'block';

    addComponentBtnEdit.style.backgroundColor = '#EA9170';
    addComponentBtnEdit.style.cursor = 'default';

    selEditID = null;



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
    addCompListEdit.innerHTML = '';

    loadIngredientsOnComp().then( () => {

        validateNewIngredientOnRecipeEdit.onclick = () => {
            if ( document.editIngForm.name.value && document.editIngForm.price.value && document.editIngForm.refer_unity.value && document.editIngForm.price_qty.value ) {

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
                newIngredient.name = document.editIngForm.name.value.charAt( 0 ).toUpperCase() + document.editIngForm.name.value.slice( 1 );
                newIngredient.unity = document.editIngForm.refer_unity.value;
                newIngredient.price = document.editIngForm.price.value;
                newIngredient.price_qty = document.editIngForm.price_qty.value;

                newArray.push( newIngredient );

                setIngredients( newArray ).then( () => {
                    newIngredientOverlayOnRecipeEdit.style.display = 'none';
                    initIngredientsOnComp();
                } );
            }
        }

        document.editIngForm.unity.forEach( ( radio ) => {
            radio.addEventListener( 'change', () => {
                if ( radio.checked ) {
                    $( '#edit-new-ingredient-overlay option' ).remove();
                    if ( radio.value == 'unity' ) {
                        let option = document.createElement( 'option' );
                        option.value = 'unity';
                        option.innerHTML += 'pièce';
                        document.editIngForm.refer_unity.appendChild( option );
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

                        document.editIngForm.refer_unity.appendChild( option1 );
                        document.editIngForm.refer_unity.appendChild( option2 );
                        document.editIngForm.refer_unity.appendChild( option3 );
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

                        document.editIngForm.refer_unity.appendChild( option1 );
                        document.editIngForm.refer_unity.appendChild( option2 );
                        document.editIngForm.refer_unity.appendChild( option3 );
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

            let previousLetter = '';

            ingredients.forEach( ( ingredient ) => {

                if ( previousLetter != ingredient.name.charAt( 0 ).toUpperCase() ) {
                    previousLetter = ingredient.name.charAt( 0 ).toUpperCase();
                    let letterIndexLi = document.createElement( 'li' );
                    addCompListEdit.appendChild( letterIndexLi );

                    let indexContainer = document.createElement( 'div' );
                    indexContainer.className += 'list-index';
                    letterIndexLi.appendChild( indexContainer );

                    let letter = document.createElement( 'h2' );
                    letter.innerHTML += ingredient.name.charAt( 0 ).toUpperCase();
                    indexContainer.appendChild( letter );
                }

                let li = document.createElement( 'li' );
                addCompListEdit.appendChild( li );

                // Create a container for all the item.
                let container = document.createElement( 'div' );
                container.id = 'ing_' + ingredient.id;
                container.className += 'list-item';

                container.onclick = () => {
                    // Unselect previous item
                    if ( selEditID ) {
                        document.getElementById( selEditID ).classList.remove( 'selected-item' );
                    }


                    addComponentBtnEdit.style.backgroundColor = '#e65a29';
                    addComponentBtnEdit.style.cursor = 'pointer';

                    //Select current item
                    selEditID = 'ing_' + ingredient.id;

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

function initRecipesOnCompEdit() {
    recipeTabEdit.style.backgroundColor = '#E65A29';
    ingredientTabEdit.style.backgroundColor = '#EA9170';
    newIngredientInCompEdit.style.display = 'none';

    addComponentBtnEdit.style.backgroundColor = '#EA9170';
    addComponentBtnEdit.style.cursor = 'default';

    selEditID = null;



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
    addCompListEdit.innerHTML = '';

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

            let previousLetter = '';

            recipes.forEach( ( recipe ) => {

                if ( previousLetter != recipe.name.charAt( 0 ).toUpperCase() ) {
                    previousLetter = recipe.name.charAt( 0 ).toUpperCase();
                    let letterIndexLi = document.createElement( 'li' );
                    addCompListEdit.appendChild( letterIndexLi );

                    let indexContainer = document.createElement( 'div' );
                    indexContainer.className += 'list-index';
                    letterIndexLi.appendChild( indexContainer );

                    let letter = document.createElement( 'h2' );
                    letter.innerHTML += recipe.name.charAt( 0 ).toUpperCase();
                    indexContainer.appendChild( letter );
                }

                let li = document.createElement( 'li' );
                addCompListEdit.appendChild( li );

                // Create a container for all the item.
                let container = document.createElement( 'div' );
                container.id = 'rec_' + recipe.id;
                container.className += 'list-item';

                container.onclick = () => {
                    // Unselect previous item
                    if ( selEditID ) {
                        document.getElementById( selEditID ).classList.remove( 'selected-item' );
                    }

                    addComponentBtnEdit.style.backgroundColor = '#e65a29';
                    addComponentBtnEdit.style.cursor = 'pointer';

                    //Select current item
                    selEditID = 'rec_' + recipe.id;

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

function resetEditRecipe() {
    editCompList = [];
    document.editRecipeForm.qty.value = '';
    document.editRecipeForm.name.value = '';
    editComponentsList.innerHTML = '';
}