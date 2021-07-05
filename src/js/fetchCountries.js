export default function fetchQuery(countryId) {
  return fetch(`https://restcountries.eu/rest/v2/name/${countryId}`)
    .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .catch(error => {
        console.log(error);
      });
}