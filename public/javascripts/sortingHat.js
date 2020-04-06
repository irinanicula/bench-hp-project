const key = '$2a$10$sHgVYvqvgYJhAT2oSMEoiOKJsUEER6CCY2xt5iZreePMHB8tjNDLW';
const sortingButton = document.querySelector('.sorting-hat__button');

const getUrl = () => {
    let url = new URL(`https://www.potterapi.com/v1/sortingHat`), params = {key:key}
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    console.log(url);
    return url;
}

const getHouses = () => {
    return fetch(getUrl(), {key})
        .then(response => response.json());
}

const handleSorting = (house) => {
    let sortedHouse = document.querySelector(`.sorting-hat__${house.toLowerCase()}`);
    sortingButton.addEventListener('click', () => {
        sortedHouse.classList.remove('d-none');
        sortedHouse.scrollIntoView();
    });
}

getHouses().then(data => handleSorting(data));

// export default {getHouses, handleSorting};


