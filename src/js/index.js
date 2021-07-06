const ingredientBtn = document.getElementById( "ingredients" );
const recipesBtn = document.getElementById( 'recipes' );
const calculateBtn = document.getElementById( 'calculate' );

ingredientBtn.style.cursor = 'pointer';
recipesBtn.style.cursor = 'pointer';
calculateBtn.style.cursor = 'pointer';


ingredientBtn.onclick = () => {
    window.location.href = '../html/ingredients.html';
}

recipesBtn.onclick = () => {
    window.location.href = '../html/recipes.html';
}

calculateBtn.onclick = () => {
    window.location.href = '../html/calculate.html';
}