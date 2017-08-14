/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const fields = {
  movieTitle: {
    label: 'MovieTitle',
    placeholder: 'Put the title of the movie',
    rules: 'required|string|between:1,25',
  },
  releaseDate: {
    label: 'ReleaseDate',
    placeholder: 'Insert the release date of the movie',
    rules: 'required|date',
  },
  duration: {
    label: 'duration',
    placeholder: 'Insert duration',
    rules: 'required|string|between:5,25',
  },
  genre: {
    label: 'genre',
    placeholder: 'Insert genre',
    rules: 'required|string|between:1,10',
  },
  synopsis: {
    label: 'genre',
    placeholder: 'Insert synopsis',
    rules: 'required|string|between:1,50',
  },
};

