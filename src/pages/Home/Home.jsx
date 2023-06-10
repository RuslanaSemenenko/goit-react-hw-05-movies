import { fetchTrendingApi } from '../../api/fetchApi';
import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';

import {
  MoviesList,
  LinkItem,
  MovieTitle,
  TrendingTitle,
} from '../Pages.styled';

export const Home = () => {
  const [trendings, setTrendings] = useState([]);

  useEffect(() => {
    async function moviesFetch() {
      try {
        const { results } = await fetchTrendingApi();
        if (results < 1) {
          Notiflix.Notify.warning("We can't find it, try again");
        }
        setTrendings(results);
      } catch {
        Notiflix.Notify.warning('Something wrong, try again please');
      }
    }
    moviesFetch();
  }, []);

  return (
    <>
      <TrendingTitle>Trending movies</TrendingTitle>
      {trendings && (
        <MoviesList>
          {trendings.map(movie => {
            let posterPath;
            if (movie.poster_path) {
              posterPath = `https://image.tmdb.org/t/p/w400/${movie.poster_path}`;
            } else {
              posterPath =
                'https://i.pinimg.com/736x/64/71/62/6471622474d071e6d5b6c111a9e18a5d.jpg';
            }

            return (
              <LinkItem key={movie.id} to={`/movies/${movie.id}`}>
                <img src={posterPath} width="400" alt={movie.title} />
                <MovieTitle>{movie.title}</MovieTitle>
              </LinkItem>
            );
          })}
        </MoviesList>
      )}
    </>
  );
};
