// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict'

// https://opendata.paris.fr/explore/dataset/lieux-de-tournage-a-paris/information
const filmingLocations = require('./lieux-de-tournage-a-paris.json')

console.log('🚀 It Works!');

// return the number of filming locations
function getFilmingLocationsNumber() {
  return filmingLocations.length;
}
console.log(`There is ${getFilmingLocationsNumber()} filming locations in Paris`)

// return the locations sorted by start date
function sortFilmingLocationsByStartDate() {
  let _toSort = filmingLocations;
  _toSort.sort(function(a,b){
    return new Date(a.fields.date_debut) - new Date(b.fields.date_debut);
  }).reverse();
  return _toSort;
}

const sorted = sortFilmingLocationsByStartDate()
console.log(`Most recent : ${sorted[0].fields.date_debut}, last one : ${sorted[sorted.length-1].fields.date_debut}`);

// return locations in year 2020
function getFilmingLocationsNumber2020() {
  let _locations2020 = [];
  filmingLocations.forEach(el => {
    let _elementYear = el.fields.annee_tournage;
    if (_elementYear == '2020') {
      _locations2020.push(el);
    }
  });
  return _locations2020;
}

// const locations2020 = getFilmingLocationsNumber2020();
// console.log("All the locations in 2020 : \n");
// locations2020.forEach(el => {
//   console.log(el.fields.adresse_lieu);
// })

// return number of locations per year
function getFilmingLocationsNumberPerYear() {
  let _year = {};
  filmingLocations.forEach(el => {
    let _elYear = el.fields.annee_tournage;
    _year[_elYear] = (_year[_elYear] || 0) + 1;
  });
  return _year;
}
// console.log("Nombre de lieu par an :");
// console.log(getFilmingLocationsNumberPerYear());

// return number of each district
function getFilmingLocationsNumberPerDistrict() {
  let _district = {};
  filmingLocations.forEach(el => {
    let _elDistrict = el.fields.ardt_lieu;
    _district[_elDistrict] = (_district[_elDistrict] || 0) + 1;
  });
  return _district;
}
// console.log("Nombre d'arrondissement :");
// console.log(getFilmingLocationsNumberPerDistrict());
// 📝 TODO: Number of locations per film, sorted in descending order
// 1. Implement the function, result expected as an array of object like:
//    const result = [{film: 'LRDM - Patriot season 2', locations: 12}, {...}]
// 2. Log the first and last item of the array
function getFilmLocationsByFilm() {
  let _locationByFilm = [];

  let _filmName = [];
  // retrieve all film name
  filmingLocations.forEach(element => {
    let _name = element.fields.nom_tournage;
    if (_filmName.indexOf(_name) < 0) _filmName.push(_name);
  });

  console.log(_filmName);

  _filmName.forEach(name => {
    let count = 0;

    // get total location number of `element` movie
    filmingLocations.forEach(film => {
      if (film.fields.nom_tournage === name) count++;
    })
    _locationByFilm.push({'film':name,'locations':count});
  });
  return _locationByFilm;
}
const filmLocationByFilm = getFilmLocationsByFilm();
console.log(filmLocationByFilm);

// 📝 TODO: Number of different films
// 1. Implement the function
// 2. Log the result
function getNumberOfFilms() {
  return ''
}

// 📝 TODO: All the filming locations of `LRDM - Patriot season 2`
// 1. Return an array with all filming locations of LRDM - Patriot season 2
// 2. Log the result
function getArseneFilmingLocations() {
  return []
}

// 📝 TODO: Tous les arrondissement des lieux de tournage de nos films favoris
//  (favoriteFilms)
// 1. Return an array of all the districts of each favorite films given as a
//    parameter. e.g. :
//    const films = { 'LRDM - Patriot season 2': ['75013'] }
// 2. Log the result
function getFavoriteFilmsLocations(favoriteFilmsNames) {
  return []
}
const favoriteFilms =
  [
    'LRDM - Patriot season 2',
    'Alice NEVERS',
    'Emily in Paris',
  ]

// 📝 TODO: All filming locations for each film
//     e.g. :
//     const films = {
//        'LRDM - Patriot season 2': [{...}],
//        'Une jeune fille qui va bien': [{...}]
//     }
function getFilmingLocationsPerFilm() {
  return {}
}

// 📝 TODO: Count each type of film (Long métrage, Série TV, etc...)
// 1. Implement the function
// 2. Log the result
function countFilmingTypes() {
  return {}
}

// 📝 TODO: Sort each type of filming by count, from highest to lowest
// 1. Implement the function. It should return a sorted array of objects like:
//    [{type: 'Long métrage', count: 1234}, {...}]
// 2. Log the result
function sortedCountFilmingTypes() {
  return []
}

/**
 * This arrow functions takes a duration in milliseconds and returns a
 * human-readable string of the duration
 * @param ms
 * @returns string
 */
const duration = (ms) => `${(ms / (1000 * 60 * 60 * 24)).toFixed(0)} days, ${((ms / (1000 * 60 * 60)) % 24).toFixed(0)} hours and ${((ms / (1000 * 60)) % 60).toFixed(0)} minutes`

// 📝 TODO: Find the filming location with the longest duration
// 1. Implement the function
// 2. Log the filming location, and its computed duration

// 📝 TODO: Compute the average filming duration
// 1. Implement the function
// 2. Log the result
