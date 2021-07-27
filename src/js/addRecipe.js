const addBtn = document.getElementById( 'add_recipe_btn' );

const addOverlay = document.getElementById( 'add_overlay' );
const addCancel = document.getElementById( 'add_cancel' );
const addComponentBtn = document.getElementById( 'add-recipe-component' );

const addComponentOverlay = document.getElementById( 'add-component-overlay' );
const cancelAddComponent = document.getElementById( 'cancel-add-component' );
const newIngredientInComp = document.getElementById( 'new-ingredient' );

const ingredientTab = document.getElementById( 'ing-tab' );
const recipeTab = document.getElementById( 'rec-tab' );

let addCompList = document.getElementById( 'add-comp-list' );

let tab = 'ing';

addBtn.style.cursor = 'pointer';
addBtn.onclick = () => {
    addOverlay.style.display = 'block';
}

addCancel.style.cursor = 'pointer';
addCancel.onclick = () => {
    addOverlay.style.display = 'none';
}

addComponentBtn.style.cursor = 'pointer';
addComponentBtn.onclick = () => {
    addComponentOverlay.style.display = 'block';
}

cancelAddComponent.style.cursor = 'pointer';
cancelAddComponent.onclick = () => {
    addComponentOverlay.style.display = 'none';
}

ingredientTab.style.backgroundColor = '#E65A29';
recipeTab.style.backgroundColor = '#EA9170';

ingredientTab.style.cursor = 'pointer';
ingredientTab.onclick = () => {
    tab = 'ing';
    ingredientTab.style.backgroundColor = '#E65A29';
    recipeTab.style.backgroundColor = '#EA9170';
    newIngredientInComp.style.display = 'block';

    let ingredients = [];

    //remove all the list
    addCompList.innerHTML = '';

    loadIngredients().then( ( data ) => {
        ingredients = data;
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
            container.className += 'list-item';

            let itemName = document.createElement( 'h2' );
            itemName.innerHTML = ingredient.name;
        } );
    }
}

recipeTab.style.cursor = 'pointer';
recipeTab.onclick = () => {
    tab = 'rec';
    ingredientTab.style.backgroundColor = '#EA9170';
    recipeTab.style.backgroundColor = '#E65A29';
    newIngredientInComp.style.display = 'none';

    //remove all the list
    addCompList.innerHTML = '';
}