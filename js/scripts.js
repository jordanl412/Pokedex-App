
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

    //Bonus task to add filter() function, maybe wrong
    function findPokemonName(pokemon) {
        return pokemonList.filter(pokemonList => pokemonList.name === pokemon);
    }

    return {
        getAll: getAll,
        add: add,
        findPokemonName: findPokemonName
    };
})();

let editedPokemonList = '<ul class="pokemon-list">';

document.write(editedPokemonList);

//checks if key validation works (should not work)
pokemonRepository.add({
    name: 'hello',
    height: 4,
});

//checks if typeof validation works (should not work)
pokemonRepository.add(4);

//another key and typeof validation check, (this one be added successfully)
pokemonRepository.add({
    name: 'Mr. Mime',
    height: 1.3,
    types: ['psychic', 'fairy']
});

//Adds "Wow, that's big!" if height over 1
pokemonRepository.getAll().forEach(function(pokemon) {
    if (pokemon.height>1) {
        editedPokemonList += '<li>' + document.write(pokemon.name + 
        ' (height: ' + pokemon.height + ') - Wow, that\'s big!<br>' + '</li>');
    }
    else {
        editedPokemonList += '<li>' + document.write(pokemon.name + 
        ' (height: ' + pokemon.height + ')<br>' + '</li>');
    }
});

//Supposed to test filter() function
pokemonRepository.findPokemonName('Bulbasaur');

editedPokemonList += '</ul>';



