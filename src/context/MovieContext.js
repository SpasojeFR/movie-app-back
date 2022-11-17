import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const MovieContext = createContext();

export const MovieContextProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios('http://localhost:3001/', {
        }).then((response) => {
          let movies = response.data;
          let newMovie = [];
          for(let i in movies){
            movies[i].id = i;
            newMovie.push(movies[i]);   
          }
          setMovies(newMovie);
        }).catch((e) => {
          throw new Error(e.message)
        });
    }, []);
  return (
    <MovieContext.Provider value={{ movies }}>
      {children}
    </MovieContext.Provider>
  );
};