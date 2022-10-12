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

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    return {
        getAll: getAll,
        add: add
    };
})();

let editedPokemonList = '<ul class="pokemon-list">';

document.write(editedPokemonList);

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



