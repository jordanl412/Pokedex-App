let pokemonList = [
    {name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison']},
    {name: 'Jigglypuff', height: 0.5, types: ['fairy', 'normal']},
    {name: 'Seel', height: 1.1, types: ['water']},
    {name: 'Squirtle', height: 0.5, types: ['water']}
];
let editedPokemonList = '<ul class="pokemon-list">';

for (let i=0; i<pokemonList.length; i++) {
    if (pokemonList[i].height>1) {
        editedPokemonList += '<li>' + document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') - Wow, that\'s big!<br>' + '</li>')
    }
    else {
        editedPokemonList += '<li>' + document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')<br>' + '</li>')
    }
}
