import './sass/main.scss';

import countryTemplate from './templates/country.hbs';
import '../node_modules/@pnotify/core/dist/BrightTheme.css';
import { error } from '../node_modules/@pnotify/core';
import fetchCountries from './js/fetchCountries.js';

const debounce = require('lodash.debounce');

const refs = {
  textInput: document.querySelector('.searchCountry'),
  countryInfo: document.querySelector('.js-country'),
};

refs.textInput.addEventListener('input', debounce(getInputValue, 500));

function findCountry(inputValue) {
  fetchCountries(inputValue)
    .then(countries => renderCountry(countries));
}

function getInputValue(e) {
  let inputValue = e.target.value.trim();

  if (inputValue) {
      findCountry(inputValue);
  }
}

function renderCountry(country) {
  refs.countryInfo.innerHTML = '';

  if (country === undefined) {
    error({
      text: 'Not found! Please enter a valid country name.',
      delay: 3000,
    });
    return;
  }
  if (country.length === 1) {
    let countryMarkup = countryTemplate(country);
    refs.countryInfo.insertAdjacentHTML('beforeend', countryMarkup);
    return;
  }
  if (country.length >= 2 && country.length < 10) {
    country.map(country => {
      refs.countryInfo.insertAdjacentHTML('beforeend',
        `<li class="country-list-item">${country.name}</li>`);
    });
    return;
  }
  if (country.length > 10) {
    error({
      text: 'Too many matches found. Please enter a more specific query!',
      delay: 3000,
    });
    return;
  }
}