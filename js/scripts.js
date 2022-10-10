let pokemonList = [
    {name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison']},
    {name: 'Jigglypuff', height: 0.5, types: ['fairy', 'normal']},
    {name: 'Seel', height: 1.1, types: ['water']},
    {name: 'Squirtle', height: 0.5, types: ['water']}
];

for (let i=0; i<pokemonList.length; i++) {
    if (i<pokemonList.length) {
        document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')')
    }
    else {
        document.write('You have run out of Pokemon in your list!')
    }
}
