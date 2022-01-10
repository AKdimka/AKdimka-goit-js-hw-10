export function fetchCountries(inputText) {
	return fetch(`https://restcountries.com/v2/name/${inputText}?fields=name,capital,population,flags,languages`)
		.then(response => {
			if (response.status === 404) {
				throw new Error(response.status);
			}
			return response.json()
		}
		)
};
