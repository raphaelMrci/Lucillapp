const ingredientBtn = document.getElementById( 'ingredients_menu' );
const recipesBtn = document.getElementById( 'recipes_menu' );
const calculateBtn = document.getElementById( 'calculate_menu' );



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