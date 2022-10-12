
//Creates an IIFE//
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

    //validates that the added Pokemon is an object and has matching keys//
    function add(pokemon) {
        if (typeof pokemon === 'object') {
            if (Object.keys(pokemonList[0]).every(key => key in pokemon)) {
            pokemonList.push(pokemon);
            }
            else {
                pokemonList.push(document.write('Pokemon must have "name", "height", and "types" keys.'))
            }
        }
        else {
        pokemonList.push(document.write('Can only add objects to pokemonList!'));
        }
    }

    return {
        getAll: getAll,
        add: add
    };
})();

let editedPokemonList = '<ul class="pokemon-list">';

document.write(editedPokemonList);

/* 
//checks if key validation works
pokemonRepository.add({
    name: 'hello',
    height: 4,
})
*/

/*
//checks if typeof validation works
pokemonRepository.add(4)
*/

pokemonRepository.add({
    name: 'Mr. Mime',
    height: 1.3,
    types: ['psychic', 'fairy']
})

pokemonRepository.getAll().forEach(function(pokemon) {
    if (pokemon.height>1) {
        editedPokemonList += '<li>' + document.write(pokemon.name + 
        ' (height: ' + pokemon.height + ') - Wow, that\'s big!<br>' + '</li>');
    }
    else {
        editedPokemonList += '<li>' + document.write(pokemon.name + 
        ' (height: ' + pokemon.height + ')<br>' + '</li>');
    }
})
editedPokemonList += '</ul>';



