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

refs.input.addEventListener('input', debounce(search, DEBOUNCE_DELAY), {
	leading: true,
	trailing: false,
});

function search(e) {
	e.preventDefault();

	let inputText = e.target.value.trim().toLowerCase();

	fetchCountries(inputText)
		.then(renderCountryInfo)
		.catch(
			Notiflix.Notify.failure("Oops, there is no country with that name")
		)
}

function fetchCountries(inputText) {
	return fetch(`https://restcountries.com/v2/name/${inputText}?fields=name,capital,population,flags,languages`)
		.then(response => response.json())
};

function renderCountryInfo(country) {
	console.log(country.length);
	console.log(country);

	refs.infoContainer.textContent = '';
	refs.countryList.textContent = '';

	if (country.length > 10) {
		Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
	}

	else if (country.length > 2 && country.length < 10) {
		const murkupList = countryListTpl(country);
		refs.countryList.insertAdjacentHTML('beforeend', murkupList);
	}

	else if (country.length < 2) {
		const murkup = countryTpl(country);
		refs.infoContainer.insertAdjacentHTML('beforeend', murkup);
	}
}