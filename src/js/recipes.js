const storage = require( 'electron-json-storage' );

let recipes = [];
let ingredients = [];

storage.has( 'ingredients', function ( err, hasIng ) {
    if ( err ) throw err;

    if ( !hasIng ) {
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
                "id": 9,
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
        console.log( 'Ingredients creation...' );

        setIngredients( defaultIngredients ).then( () => {
            loadIngredients().then( () => {
                testRecipes();
            } )
        } );
    } else {
        loadIngredients().then( () => {
            testRecipes();
        } );
    }
} )

function testRecipes() {
    storage.has( 'recipes', function ( error, hasKey ) {
        if ( error ) throw error;

        if ( !hasKey ) {
            let defaultRecipes = [ {
                    "id": 1,
                    "name": "Pâte à choux",
                    "unity": "g",
                    "qty": 500,
                    "components": [ {
                            "id": 1,
                            "group": "ingredients",
                            "qty": 110,
                            "unity": "g"
                        },
                        {
                            "id": 2,
                            "group": "ingredients",
                            "qty": 125,
                            "unity": "cL"
                        },
                        {
                            "id": 3,
                            "group": "ingredients",
                            "qty": 125,
                            "unity": "cL"
                        },
                        {
                            "id": 4,
                            "group": "ingredients",
                            "qty": 5,
                            "unity": "g"
                        },
                        {
                            "id": 5,
                            "group": "ingredients",
                            "qty": 145,
                            "unity": "g"
                        },
                        {
                            "id": 6,
                            "group": "ingredients",
                            "qty": 5,
                            "unity": "piece"
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "Crème au praliné",
                    "unity": "g",
                    "qty": 200,
                    "components": [ {
                            "id": 7,
                            "group": "ingredients",
                            "qty": 1,
                            "unity": "piece"
                        },
                        {
                            "id": 2,
                            "group": "ingredients",
                            "qty": 155,
                            "unity": "cL"
                        },
                        {
                            "id": 8,
                            "group": "ingredients",
                            "qty": 2,
                            "unity": "piece"
                        },
                        {
                            "id": 9,
                            "group": "ingredients",
                            "qty": 30,
                            "unity": "g"
                        },
                        {
                            "id": 9,
                            "group": "ingredients",
                            "qty": 15,
                            "unity": "g"
                        },
                        {
                            "id": 3,
                            "group": "recipes",
                            "qty": 80,
                            "unity": "g"
                        },
                        {
                            "id": 1,
                            "group": "ingredients",
                            "qty": 70,
                            "unity": "g"
                        }
                    ]
                },
                {
                    "id": 3,
                    "name": "Praliné",
                    "unity": "g",
                    "qty": 500,
                    "components": [ {
                            "id": 12,
                            "group": "ingredients",
                            "qty": 100,
                            "unity": "g"
                        },
                        {
                            "id": 13,
                            "group": "ingredients",
                            "qty": 100,
                            "unity": "g"
                        },
                        {
                            "id": 14,
                            "group": "ingredients",
                            "qty": 133,
                            "unity": "g"
                        },
                        {
                            "id": 3,
                            "group": "ingredients",
                            "qty": 33,
                            "unity": "cL"
                        },
                        {
                            "id": 15,
                            "group": "ingredients",
                            "qty": 1,
                            "unity": "g"
                        }
                    ]
                },
                {
                    "id": 4,
                    "name": "Paris-Brest",
                    "unity": "piece",
                    "qty": 1,
                    "components": [ {
                            "id": 1,
                            "group": "recipes",
                            "qty": 500,
                            "unity": "g"
                        },
                        {
                            "id": 2,
                            "group": "recipes",
                            "qty": 200,
                            "unity": "g"
                        },
                        {
                            "id": 5,
                            "group": "recipes",
                            "qty": 1,
                            "unity": "piece"
                        }
                    ]
                },
                {
                    "id": 5,
                    "name": "Craquelin",
                    "unity": "piece",
                    "qty": 1,
                    "components": [ {
                            "id": 5,
                            "group": "ingredients",
                            "qty": 50,
                            "unity": "g"
                        },
                        {
                            "id": 10,
                            "group": "ingredients",
                            "qty": 50,
                            "unity": "g"
                        },
                        {
                            "id": 11,
                            "group": "ingredients",
                            "qty": 40,
                            "unity": "g"
                        }
                    ]
                }
            ];

            console.log( 'Recipes creation...' );

            setRecipes( defaultRecipes ).then( () => {
                loadRecipes().then( ( data ) => {
                    initRecipes();
                } );
            } );
        } else {
            loadRecipes().then( ( data ) => {
                initRecipes();
            } );
        }
    } );
}

let currentID;
const recipeList = document.getElementById( 'recipes-list' );

function initRecipes() {
    if ( recipes.length > 0 ) {
        let ul1 = document.createElement( 'ul' );
        recipeList.appendChild( ul1 );

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
                ul1.appendChild( letterIndexLi );

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
                ul1.appendChild( letterIndexLi );

                let indexContainer = document.createElement( 'div' );
                indexContainer.className += 'list-index';
                letterIndexLi.appendChild( indexContainer );

                let letter = document.createElement( 'h2' );
                letter.innerHTML += recipe.name.charAt( 0 ).toUpperCase();
                indexContainer.appendChild( letter );
            }

            let li = document.createElement( 'li' );
            ul1.appendChild( li );

            // Create a container for all the item. It is a flexbox (set on css)
            let container = document.createElement( 'div' );
            container.className += 'list-item';

            // Set a padding to the end of the list to be able to show last elements.
            if ( index == recipes.length - 1 ) {
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
            Name.innerHTML += recipe.name;
            nameItem.appendChild( Name );

            let priceItem = document.createElement( 'li' );
            ul2.appendChild( priceItem );

            let priceString;

            if ( recipe.unity == 'kg' || recipe.unity == 'L' || recipe.unity == 'piece' ) {
                priceString = calcRecipePrice( recipe ) / recipe.qty;
            } else if ( recipe.unity == 'g' || recipe.unity == 'mL' ) {
                priceString = calcRecipePrice( recipe ) / recipe.qty * 1000;
            } else if ( recipe.unity == 'cL' ) {
                priceString = calcRecipePrice( recipe ) / recipe.qty * 100;
            } else if ( recipe.unity == 'mg' ) {
                priceString = calcRecipePrice( recipe ) / recipe.qty * 1000000;
            }

            //Round the count
            priceString = Math.round( ( priceString + Number.EPSILON ) * 10 ) / 10;
            priceString += '€/';

            if ( recipe.unity == 'kg' || recipe.unity == 'g' || recipe.unity == 'mg' ) {
                priceString += 'kg';
            } else if ( recipe.unity == 'L' || recipe.unity == 'cL' || recipe.unity == 'mL' ) {
                priceString += 'L';
            } else if ( recipe.unity == 'piece' ) {
                priceString += 'pièce';
            } else {
                console.error( "ERROR: recipe " + recipe.id + " : unexpected unity\t" + recipe.unity );
            }

            let price = document.createElement( 'h3' );
            price.innerHTML += priceString;
            priceItem.appendChild( price );


            let qtyItem = document.createElement( 'li' );
            ul2.appendChild( qtyItem );

            let qtyString = recipe.qty;
            if ( recipe.unity == 'piece' ) {
                if ( recipe.qty > 1 ) {
                    qtyString += 'pièces';
                } else {
                    qtyString += 'pièce';
                }
            } else {
                qtyString += recipe.unity;
            }

            let qty = document.createElement( 'h4' );
            qty.innerHTML += qtyString;
            qtyItem.appendChild( qty );

            let editItem = document.createElement( 'li' );
            ul2.appendChild( editItem );

            let editBtn = document.createElement( 'img' );
            editBtn.src = '../../img/pencil.png';
            editBtn.className += 'edit-item';
            editBtn.style.cursor = 'pointer';
            editBtn.onclick = () => {
                console.log( 'Editting ' + recipe.name + ' recipe.' );
            }
            editItem.appendChild( editBtn );

        } );
    }
}

function calcRecipePrice( recipe ) {
    let price = 0;
    recipe.components.forEach( ( component ) => {
        if ( component.group == 'ingredients' ) {
            let ingredient = ingredients.find( ( ingredient ) => ingredient.id === component.id );
            if ( component.unity == 'kg' ) {
                if ( ingredient.price_type == 'kg' ) {
                    price += ingredient.price / ingredient.price_qty * component.qty;
                } else if ( ingredient.price_type == 'g' ) {
                    price += ingredient.price / ingredient.price_qty * 1000 * component.qty;
                } else if ( ingredient.price_type == 'mg' ) {
                    price += ingredient.price / ingredient.price_qty * 1000000 * component.qty;
                } else {
                    console.warn( 'components unity are not compatible...' );
                }
            } else if ( component.unity == 'g' ) {
                if ( ingredient.price_type == 'kg' ) {
                    price += ingredient.price / ingredient.price_qty / 1000 * component.qty;
                } else if ( ingredient.price_type == 'g' ) {
                    price += ingredient.price / ingredient.price_qty * component.qty;
                } else if ( ingredient.price_type == 'mg' ) {
                    price += ingredient.price / ingredient.price_qty * 1000 * component.qty
                } else {
                    console.warn( 'components unity are not compatible...' );
                }
            } else if ( component.unity == 'mg' ) {
                if ( ingredient.price_type == 'kg' ) {
                    price += ingredient.price / ingredient.price_qty / 1000000 * component.qty;
                } else if ( ingredient.price_type == 'g' ) {
                    price += ingredient.price / ingredient.price_qty / 1000 * component.qty;
                } else if ( ingredient.price_type == 'mg' ) {
                    price += ingredient.price / ingredient.price_qty * component.qty
                } else {
                    console.warn( 'components unity are not compatible...' );
                }
            } else if ( component.unity == 'L' ) {
                if ( ingredient.price_type == 'L' ) {
                    price += ingredient.price / ingredient.price_qty * component.qty;
                } else if ( ingredient.price_type == 'cL' ) {
                    price += ingredient.price / ingredient.price_qty * 100 * component.qty;
                } else if ( ingredient.price_type == 'mL' ) {
                    price += ingredient.price / ingredient.price_qty * 1000 * component.qty;
                } else {
                    console.warn( 'components unity are not compatible...' );
                }
            } else if ( component.unity == 'cL' ) {
                if ( ingredient.price_type == 'L' ) {
                    price += ingredient.price / ingredient.price_qty / 100 * component.qty;
                } else if ( ingredient.price_type == 'cL' ) {
                    price += ingredient.price / ingredient.price_qty * component.qty;
                } else if ( ingredient.price_type == 'mL' ) {
                    price += ingredient.price / ingredient.price_qty * 10 * component.qty;
                } else {
                    console.warn( 'components unity are not compatible...' );
                }
            } else if ( component.unity == 'mL' ) {
                if ( ingredient.price_type == 'L' ) {
                    price += ingredient.price / ingredient.price_qty / 1000 * component.qty;
                } else if ( ingredient.price_type == 'cL' ) {
                    price += ingredient.price / ingredient.price_qty / 10 * component.qty;
                } else if ( ingredient.price_type == 'mL' ) {
                    price += ingredient.price / ingredient.price_qty * component.qty;
                } else {
                    console.warn( 'components unity are not compatible...' );
                }
            } else if ( component.unity == 'piece' && ingredient.price_type == 'unity' ) {
                price += ingredient.price / ingredient.price_qty * component.qty;
            } else {
                console.warn( 'unknown component unity...' );
            }
        } else if ( component.group == 'recipes' ) {
            nRecipe = recipes.find( ( nRecipe ) => nRecipe.id === component.id );
            price += calcRecipePrice( nRecipe );
        } else {
            console.warn( 'unexpected component group...' );
        }
    } );

    return price;
}

function setRecipes( recipesArray ) {
    return new Promise( ( res, rej ) => {
        storage.set( 'recipes', recipesArray, function ( error ) {
            if ( error ) rej( error );
            res();
        } );
    } )
}

function loadRecipes() {
    console.log( 'Loading Recipes...' );
    return new Promise( ( res, rej ) => {
        storage.get( 'recipes', ( err, recArray ) => {
            if ( err ) rej( err );
            recipes = recArray;
            res();
        } );
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
    console.log( 'Loading ingredients...' );
    return new Promise( ( res, rej ) => {
        storage.get( 'ingredients', ( err, ingArray ) => {
            if ( err ) rej( err );
            ingredients = ingArray;
            res();
        } );
    } );
}