
//Creates an IIFE
let pokemonRepository = (function () {
    let pokemonList = [
    {name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison']},
    {name: 'Jigglypuff', height: 0.5, types: ['fairy', 'normal']},
    {name: 'Seel', height: 1.1, types: ['water']},
    {name: 'Squirtle', height: 0.5, types: ['water']}
    ];

    function getAll() {
        return pokemonList;
    }

    //shows details of selected pokemon in console
    function showDetails(pokemon) {
        console.log(pokemon);
    }

    //each added pokemon is added as a list item with a button
    function addListItem(pokemon) {
        let pokemonListContainer = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let pokemonButton = document.createElement('button');
        pokemonButton.innerText = pokemon.name;
        pokemonButton.classList.add('pokemon-button');
        listItem.appendChild(pokemonButton);
        pokemonListContainer.appendChild(listItem);
        //calls showDetails function when button is clicked
        pokemonButton.addEventListener('click', ()=>{
            showDetails(pokemon);
        });
    }

    //validates that the added Pokemon is an object and has matching keys
    function add(pokemon) {
        if (typeof pokemon === 'object') {
            if (Object.keys(pokemonList[0]).every(key => key in pokemon)) {
            pokemonList.push(pokemon);
            }
            else {
                console.log('keys must be "name", "height", "types"');
            }
        }
        else {
            console.log('must be an object');
        }
    }

    //Bonus task to add filter(name) function
    function findPokemonName(pokemonName) {
        return pokemonList.filter(pokemon => pokemon.name === pokemonName);
    }

    return {
        getAll: getAll,
        add: add,
        findPokemonName: findPokemonName,
        addListItem: addListItem,
        showDetails: showDetails
    };
})();

//checks if key validation works (should not work)
pokemonRepository.add({
    name: 'hello',
    height: 4,
});

//checks if typeof validation works (should not work)
pokemonRepository.add(4);

//another key and typeof validation check, (this one should be added successfully)
pokemonRepository.add({
    name: 'Mr. Mime',
    height: 1.3,
    types: ['psychic', 'fairy']
});

//Adds list item (with button) for each pokemon in pokemonList
pokemonRepository.getAll().forEach(pokemonRepository.addListItem);

//Tests filter() function
let filteredPokemon = pokemonRepository.findPokemonName('Bulbasaur');
console.log(filteredPokemon);




