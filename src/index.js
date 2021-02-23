import './styles.css';
import countrySearch from './js/fetchCountries';
import manyCountry from './templates/many_country.hbs';
import oneCountry from './templates/one_country.hbs';
import { notice, error, } from '@pnotify/core/dist/PNotify.js';
const debounce = require('lodash.debounce');
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/Material.css';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/Material.css';
import 'material-design-icons/iconfont/material-icons.css';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';






const refs = {
    countriesContainer: document.querySelector('.js-countries'),
    input:document.querySelector('input'),
    searchForm: document.querySelector('js-search-form')
};

refs.input.addEventListener('input', debounce(countrySearchInputHandler, 500));

function countrySearchInputHandler(event) {
  event.preventDefault();
  clearArticlesContainer();
   const searchQuery = event.target.value;

   countrySearch(searchQuery).then(data => {
    if (data.length > 10) {
      notice({
          text: "Too many matches found. Please enter a more specific query!"
      });
  } else if (data.status === 404) {
    error({
      text: "No country has been found. Please enter a more specific query!"
  });

  } else if (data.length === 1) {
    updateOneNameMarkup(data);
  } else if (data.length > 1 && data.length <= 10) {
    updateManyNameMarkup(data);
  }
})
.catch(
  //Error => {
  //Error({
  //    text: "You must enter query parameters!"
  //});
  console.log()
//}
)
};

function updateManyNameMarkup(data) {
  const markup = data.map(country  => {
    return country;
  });
  refs.countriesContainer.insertAdjacentHTML('beforeend', manyCountry(markup));
}

function updateOneNameMarkup(data){
  refs.countriesContainer.insertAdjacentHTML('beforeend', oneCountry(data[0]));
}





function clearArticlesContainer() {
 refs.countriesContainer.innerHTML = '';
 return;
}

// refs.input.addEventListener(
//   'input',
//   debounce(event =>{
//     event.preventDefault();
//     clearArticlesContainer();
//     const inputCountry = event.target.value;
//     fetchCountries(inputCountry)
//     .catch(console.log)
//     .then(updateNameMarkup)
//     .catch(console.log);
//     }
//   }, 500),