import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import countryTpl from './templates/country.hbs';
import countryListTpl from './templates/country-list.hbs';

const DEBOUNCE_DELAY = 300;

const refs = {
	input: document.querySelector('input#search-box'),
	infoContainer: document.querySelector('.country-info'),
	countryList: document.querySelector('.country-list')
}

refs.input.addEventListener('input', search);

function search(e) {
	e.preventDefault();

	let inputText = e.currentTarget.value.toLowerCase();

	fetchCountries(inputText)
		.then(renderCountryInfo)
		.catch(
			Notiflix.Notify.failure('Oops, there is no country with that name')
		)
}

function fetchCountries(inputText) {
	return fetch(`https://restcountries.com/v2/name/${inputText}?fields=name,capital,population,flags,languages`)
		.then(response => response.json())
};

function renderCountryInfo(country) {
	if (country.length === 1) {
		const murkup = countryTpl(country);
		refs.infoContainer.insertAdjacentHTML('beforeend', murkup);
	} else {
		const murkupList = countryListTpl(country);
		refs.countryList.insertAdjacentHTML('beforeend', murkupList);
	}
}