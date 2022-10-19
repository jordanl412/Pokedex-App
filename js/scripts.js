
//Creates an IIFE
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let loadingMessage = document.querySelector('.loading-message');

    function showLoadingMessage() {
        loadingMessage.classList.add('visible');
        console.log('Loading...');
    }

    function hideLoadingMessage() {
        loadingMessage.classList.remove('visible');
        console.log('Done loading.');
    }

    //loads list of pokemon from the API
    function loadList() {
        showLoadingMessage();
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            hideLoadingMessage();
            //adds each pokemon from the API to pokemonList
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            hideLoadingMessage();
            console.error(e);
        })
    }

    //loads details from the API
    function loadDetails(pokemon) {
        let url = pokemon.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            //adds details to each item (pokemon)
            pokemon.imageUrl = details.sprites.front_default;
            pokemon.height = details.height;
            pokemon.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    function getAll() {
        return pokemonList;
    }

    //shows details of selected pokemon in console
    function showDetails(pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
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
        let neededKeys=['name', 'detailsUrl'];
        if (typeof pokemon === 'object') {
            if (neededKeys.every(key => key in pokemon)) {
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
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails,
        showLoadingMessage: showLoadingMessage,
        hideLoadingMessage: hideLoadingMessage
    };
})();

/*
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
*/


pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});





