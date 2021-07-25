const addBtn = document.getElementById('add_recipe_btn');

const addOverlay = document.getElementById('add_overlay');
const addCancel = document.getElementById('add_cancel');

const componentList = document.getElementById('component_list');
const addComponent = document.getElementById('add_component');

const addComponentList = document.getElementById('add-components-list');
const ingSelect = document.getElementById('ing-select');
const recSelect = document.getElementById('rec-select');

let addCategory = 'ing';

ingSelect.style.cursor = 'pointer';
ingSelect.onclick = () => {
    addCategory = 'ing';
    refreshAddComponentList();
    ingSelect.style.backgroundColor = '#E65A29';
    recSelect.style.backgroundColor = '#EA9170';
}

recSelect.style.cursor = 'pointer';
recSelect.onclick = () => {
    addCategory = 'rec';
    refreshAddComponentList();
    recSelect.style.backgroundColor = '#E65A29';
    ingSelect.style.backgroundColor = '#EA9170';
}



function refreshAddComponentList() {
    if (addCategory == 'ing') {

    } else if (addCategory == 'rec') {

    } else {
        console.error("The component category to add is unexpected...");
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

addComponent.style.cursor = 'pointer';
addComponent.onclick = () => {
    //TODO: Open addComponent overlay
}