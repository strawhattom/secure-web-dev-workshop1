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
    const _elementYear = el.fields.annee_tournage;
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
    const _elYear = el.fields.annee_tournage;
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
    const _elDistrict = el.fields.ardt_lieu;
    _district[_elDistrict] = (_district[_elDistrict] || 0) + 1;
  });
  return _district;
}
// console.log("Nombre d'arrondissement :");
// console.log(getFilmingLocationsNumberPerDistrict());


function getFilmLocationsByFilm() {
  let _locationByFilm = [];

  let _filmName = [];
  // retrieve all film name
  filmingLocations.forEach(element => {
    const _name = element.fields.nom_tournage;
    if (_filmName.indexOf(_name) < 0) _filmName.push(_name);
  });

  // starting to count locations for each film(name)
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
// const filmLocationByFilm = getFilmLocationsByFilm();
// console.log(filmLocationByFilm);

function getNumberOfFilms() {
  let _filmNames = [];
  // retrieve all film name
  filmingLocations.forEach(element => {
    const _name = element.fields.nom_tournage;
    // search if the name is in our name array
    if (_filmNames.indexOf(_name) < 0) _filmNames.push(_name);
  });
  return _filmNames.length;
}
console.log("Number of different films : " + getNumberOfFilms());

function getArseneFilmingLocations() {
  let _arseneLocation = [];

  // get all locations
  filmingLocations.forEach(element => {
    const _name = element.fields.nom_tournage;
    const _location = element.fields.adresse_lieu;
    if (_name === `LRDM - Patriot season 2`) _arseneLocation.push(_location);
  });

  // remove duplicate
  return [... new Set(_arseneLocation)];
}
//console.log(getArseneFilmingLocations());

// return an array of all the districts of each favorite films given as a
function getFavoriteFilmsLocations(favoriteFilmsNames) {
  let _res = {};

  // store our name as keys in _res object
  for (const filmName of favoriteFilmsNames){
    _res[filmName] = [];
  }

  // get districts avoiding doubles
  filmingLocations.forEach(element => {
    const _name = element.fields.nom_tournage;
    const _district = element.fields.ardt_lieu;
    if (_name in _res) {
      if (!_res[_name].includes(_district)) _res[_name].push(_district);
    }
  })

  return _res;
}
const favoriteFilms =
  [
    'LRDM - Patriot season 2',
    'Alice NEVERS',
    'Emily in Paris',
  ];

//console.log(getFavoriteFilmsLocations(favoriteFilms));

// All filming locations for each film
function getFilmingLocationsPerFilm() {
  let _allLocationPerFilm = {};
  let _filmNames = [];

  // get all film names
  filmingLocations.forEach(film => {
    const _name = film.fields.nom_tournage;
    if (_filmNames.indexOf(_name) < 0) {
      _filmNames.push(_name);
    }
  });

  // go around all the names...
  _filmNames.forEach(name => {
    let _filmLocations = [];
    
    // and look for his locations...
    filmingLocations.forEach(film => {
      const _name = film.fields.nom_tournage;
      const _location = film.fields.adresse_lieu;
      
      if (name === _name) {
        // check if we do not already have the location in our array
        if (_filmLocations.indexOf(_location) < 0) _filmLocations.push(_location);
      }
    });
    _allLocationPerFilm[name] = _filmLocations;
  });

  return _allLocationPerFilm;
}
// console.log(getFilmingLocationsPerFilm());

function countFilmingTypes() {
  let _filmType = {};
  filmingLocations.forEach(element => {
    let _type = element.fields.type_tournage;
    _filmType[_type] = (_filmType[_type] || 0) + 1;
  })
  return _filmType;
};
// console.log(countFilmingTypes());

function sortedCountFilmingTypes() {

  // using defined function countFilmingTypes
  const _typesCount = countFilmingTypes();
  let _sortedCount = [];
  for (const type in _typesCount) {
    _sortedCount.push({type, count:_typesCount[type]});
  }

  // sorting and reversing by count
  _sortedCount.sort((a,b) => {
    return a.count - b.count;
  })
  return _sortedCount.reverse();
}
// console.log(sortedCountFilmingTypes());

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
function getLongestFilmingLocation(){
  let _duration = [];
  let _index = 0;
  filmingLocations.forEach(location => {
    const _endDate = new Date(location.fields.date_fin);
    const _startDate = new Date(location.fields.date_debut);
    _duration.push({
      id:_index,
      duration:_endDate - _startDate,
    })
    _index++;
  });
  let _longest = Math.max(..._duration.map(obj => {
    return obj.duration;
  }));
  let _res = _duration.find(obj => obj.duration === _longest);
  return {id:_res.id,duration:duration(_res.duration)};
}

console.log(getLongestFilmingLocation());

function getAverageFilmingDuration(){
  let _total = 0;
  filmingLocations.forEach(element => {
    const _end = new Date(element.fields.date_fin);
    const _begin = new Date(element.fields.date_debut);
    _total+= _end - _begin;
  })

  return duration(_total/filmingLocations.length);
}
console.log(`Average filming duration : ${getAverageFilmingDuration()}`)
