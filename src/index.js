import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import countryTpl from './templates/country.hbs';
import countryListTpl from './templates/country-list.hbs';
import fetchCountries from './js/fetchCountries'

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

	if (!inputText) {
		refs.infoContainer.textContent = '';
		refs.countryList.textContent = '';
		return
	}

	fetchCountries(inputText)
		.then(renderCountryInfo)
		.catch(error => {
			Notiflix.Notify.failure("Oops, there is no country with that name")
		})
}


function renderCountryInfo(country) {
	console.log(country.length);
	console.log(country);

	refs.infoContainer.textContent = '';
	refs.countryList.textContent = '';

	if (country.length > 10) {
		Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
	}

	else if (country.length > 1 && country.length < 10) {
		const murkupList = countryListTpl(country);
		refs.countryList.insertAdjacentHTML('beforeend', murkupList);
	}

	else {
		const murkup = countryTpl(country);
		refs.infoContainer.insertAdjacentHTML('beforeend', murkup);
	}
}
