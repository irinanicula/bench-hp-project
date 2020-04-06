const key = '$2a$10$sHgVYvqvgYJhAT2oSMEoiOKJsUEER6CCY2xt5iZreePMHB8tjNDLW';

const charactersArray = [];
let names = [];
let searchInput = document.getElementById('searchInput');

//TODO: find out more about urls and methods associated with them

const getUrl = () => {
    let url = new URL(`https://www.potterapi.com/v1/characters`), params = {key:key}
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    return url;
}

//here I am getting a list of all characters
const getCharacters = () => {
    return fetch(getUrl(), {key})
        .then(response => response.json());
}

//here I am returning a list of all characters that contains id, name, role and house
const createCharactersArray = (characters) => {
    characters.forEach(character => {
        if(character.house !== undefined) {
            let characterObject = {
                id: character._id,
                name: character.name,
                house: character.house,
                role: character.role
            }
            charactersArray.push(characterObject);
        } 
    });
    return charactersArray;
}

//here i am creating a card element that contains the name of the character and the occupation
const createCharacterCard = (character) => {
    let house = character.house.toLowerCase();
    let characterListElement = document.querySelector(`.characters-list__${house}-cards`);
    let cardElement = document.createRange().createContextualFragment(`
                            <div class="card col-3 m-3">
                                <div class="card-body">
                                    <h5>${character.name}</h5>
                                    <p>${character.role}</p>
                                </div>
                            </div>`);

    characterListElement.append(cardElement);
}

//with this function i am generating character cards for all characters
const generateCharacterCards = (charactersArray) => {
    charactersArray.forEach(character => {
        createCharacterCard(character);
    });
}

//here i am using the data retrieved to form a characters array and generate character cards
getCharacters().then(data => {
    const characters = createCharactersArray(data);
    generateCharacterCards(characters);
});

//this function makes sure that when you click on a button, the right div is shown
const handleClick = () => {
    let buttons = document.querySelectorAll(`.house-button`);
    Array.from(buttons).forEach(button => {
        let characterCards = document.querySelector(`.characters-list__${button.id}`);    
        button.addEventListener("click", () => {
            showHouseCards(characterCards);
        });
    });
}

//this function removes all active classes from divs
const removeActiveClass = () => {
    let characterCardsList = document.querySelectorAll('.character-list');
    Array.from(characterCardsList).forEach(characterCards => {
        if(characterCards.classList.contains('active')) {
            characterCards.classList.remove('active');
            characterCards.classList.add('d-none');
        }
    });
}

//this function adds active class to the right div
const showHouseCards = (characterCards) => {
    removeActiveClass();
    if(characterCards.classList.contains('d-none')) {
        characterCards.classList.remove('d-none');
        characterCards.classList.add('active');
    }
}

const createCharacterNamesArray = () => {
    getCharacters().then(data => {
        const characters = createCharactersArray(data);
        if(characters.length > 0) {
            characters.forEach(character => {
                names.push(character.name);
                return names;
            });
        } else {
            console.log("characterz is empty!!! Hellep");
        }   
    });
}

const search = (word) => {
    let characterSearchResult = document.querySelector('.search-results');
    names.forEach(name => {
        if(name.toLowerCase().indexOf(word.toLowerCase()) != -1) {
            characterSearchResult.innerHTML += `<h5>${name}</h5>`;
            showHouseCards(characterSearchResult);
        }
    });
}

handleClick();

createCharacterNamesArray();




