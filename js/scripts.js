
//Creates an IIFE
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let loadingMessage = document.querySelector('.loading-message');
    //let modalContainer = document.querySelector('#modal-container')


    function showLoadingMessage() {
        loadingMessage.classList.add('is-visible');
        console.log('Loading...');
    }

    function hideLoadingMessage() {
        loadingMessage.classList.remove('is-visible');
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
            pokemon.weight = details.weight;
            pokemon.types = details.types.map(type => type.type.name).join(', ');
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
            //console.log(pokemon);
            showPokemonModal(pokemon);
        });
    }

    //each added pokemon is added as a list item with a button
    function addListItem(pokemon) {
        let pokemonListContainer = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let pokemonButton = document.createElement('button');
        listItem.classList.add('group-list-item');
        pokemonButton.innerText = pokemon.name;
        pokemonButton.classList.add('pokemon-button','btn','btn-primary', 
        'group-list-item');
        pokemonButton.setAttribute('data-toggle', 'modal');
        pokemonButton.setAttribute('data-target', '#pokemon-modal');
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
                console.log('keys must be "name", "height", "weight", "types"');
            }
        }
        else {
            console.log('must be an object');
        }
    }

    //Bonus task to add filter(name) function
    function findPokemonName(input) {
        return pokemonList.filter(pokemon => pokemon.name === input);
    }

    //modal code starts here
    function showPokemonModal(pokemon) {
        let modalBody = $('.modal-body');
        let modalTitle = $('.modal-title');
        let modalHeader = $('.modal-header');

        //clears existing modal content (no carryover of other pokemon)
        modalTitle.empty();
        modalBody.empty();

        //create elements for modal content
        let nameElement = $('<h1>' + pokemon.name + '</h1>');
        let imageElement = $('<img class="modal-img" style="width:50%">');
        imageElement.attr('src', pokemon.imageUrl);
        let heightElement = $('<p>' + 'height: ' + pokemon.height + '</p>');
        let weightElement = $('<p>' + 'weight: '+ pokemon.weight + '</p>');
        let typesElement = $('<p>' + 'types: ' + pokemon.types + '</p>');

        //append each element to the modal
        modalTitle.append(nameElement);
        modalBody.append(imageElement);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
        modalBody.append(typesElement);
    }

    let searchBar = '#searchBar';
    $('#searchBar').keyup((e) => {
        let pokemonButton = $('.pokemonButton');
        let searchString = e.target.value.toLowerCase();
        let filteredPokemonList = pokemonList.filter((pokemon) => {
            return pokemon.name.toLowerCase().includes(searchString);
        });
        //remove all pokemon from list
        $('.pokemonButton').remove();
        //add back the searched pokemon
        filteredPokemonList.forEach(function (pokemon) {
            addListItem(pokemon);
        });
    });

    return {
        getAll: getAll,
        add: add,
        findPokemonName: findPokemonName,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails,
        showLoadingMessage: showLoadingMessage,
        hideLoadingMessage: hideLoadingMessage,
        showPokemonModal: showPokemonModal
    };
})();


pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});

