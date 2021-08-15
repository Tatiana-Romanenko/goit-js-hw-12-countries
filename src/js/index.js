import countryCardTpl from '../templates/country-card.hbs';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';

const refs = {
    input: document.querySelector('.input'),
    countriesList: document.querySelector('.countries-list'),
    countryContainer: document.querySelector('.country-container'),
}

const debouncedHandleInput = debounce(handleInput, 500);
refs.input.addEventListener('input', debouncedHandleInput);

function handleInput(e) {
    const searchQuery = e.target.value.trim();
    e.preventDefault();
    if (searchQuery) {
        fetchCountries(searchQuery).then(renderResult).catch(errorMessage);
    }
    resetCountryContainer();
}

function renderResult(country) {

    if (country.length > 10) {
        resetresetCountryContainer();
        error({
            title: 'Sorry!',
            text: 'Too many matches found. Please enter a more specific query!',
            delay: 2500,
        });
    } if (country.length >= 2 && country.length <= 10) {
        resetCountryContainer();
        country.map(country => {
            refs.countriesList.insertAdjacentHTML('beforeEnd', `<li>${country.name}</li>`);
        });
    }
    if (country.length === 1) {
        resetCountryContainer();
        const countryCardMarkup = countryCardTpl(country);
        refs.countryContainer.innerHTML = countryCardMarkup;
    }
}

function resetCountryContainer() {
    refs.countryContainer.innerHTML = '';
    refs.input.innerHTML = '';
    refs.countriesList.innerHTML = '';
}

function errorMessage() {
    error({
        title: 'Sorry!',
        text: 'No matches found. Please enter a correct query!',
        delay: 3000,
    });
}

