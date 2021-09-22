import { createContext, useContext, useState, useEffect } from "react";

import { api } from "../services/api";

import {
  GenreResponseProps,
  MovieProps,
  moviesContextData,
  MoviesContextproviderProps,
} from "./types";

export const MoviesContext = createContext({} as moviesContextData);

export function MoviesContextProvider({
  children,
}: MoviesContextproviderProps) {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const [movies, setMovies] = useState<MovieProps[]>([]);

  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then((response) => {
        setMovies(response.data);
      });

    api
      .get<GenreResponseProps>(`genres/${selectedGenreId}`)
      .then((response) => {
        setSelectedGenre(response.data);
      });
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <MoviesContext.Provider
      value={{
        genres,
        movies,
        selectedGenre,
        selectedGenreId,
        handleClickButton,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}

export const useMoviesContext = () => {
  return useContext(MoviesContext);
};
