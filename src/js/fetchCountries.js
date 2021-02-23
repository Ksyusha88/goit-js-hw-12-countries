

// Есть файл fetchCountries.js с дефолтным экспортом функции fetchCountries(searchQuery),
// возвращающей промис с массивом стран, результат запроса к API.


function fetchCountries(searchQuery){
const url = `https://restcountries.eu/rest/v2/name/${searchQuery}`;

 return fetch(url)
 .then(res => res.json())
}

export default fetchCountries;