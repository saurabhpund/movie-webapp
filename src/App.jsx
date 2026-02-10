import { Children, useEffect, useState } from "react";
import heroImg from "./assets/hero.png";
import "./App.css";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCards from "./components/MovieCards";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "./util/appwriteUtil";

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMBD_ACCESS_TOKEN;

const API_OPTION = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [trendingMovies, setTrendingMovies] = useState([]);

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 1000, [searchTerm]);

  const loadTrendingMovies = async () => {
    const movies = await getTrendingMovies();
    setTrendingMovies(movies);
  };

  const fetchData = async (query = "") => {
    try {
      setLoading(true);
      setErrorMessage("");

      const url = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/movie/popular`;

      const response = await fetch(url, API_OPTION);

      if (!response.ok) {
        throw new Error("Unable to fetch data");
      }

      const data = await response.json();
      setMovieList(data.results || []);
      if (query && data.results.length > 0) {
        updateSearchCount(query, data.results[0]);
      }
    } catch (err) {
      setErrorMessage(err.message || "Unable to fetch data");
      setMovieList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <>
      <main>
        <div className="pattern" />
        <div className="wrapper">
          <header>
            <img src={heroImg} alt="hero banner" />
            <h1>
              Find <span className="text-gradient"> Movies</span> You'll Enjoy
              Without the Hassle
            </h1>
            <Search seachTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>

          {trendingMovies.length > 0 && (
            <section className="trending">
              <h2>Trending Movies</h2>
              <ul>
                {trendingMovies.map((movie, i) => {
                  return (
                    <li key={i}>
                      <p>{i + 1}</p>
                      <img src={movie.poster_url} alt={movie.title} />
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          <section className="all-movies">
            <h2 className="mt-10">All Movies</h2>

            {loading ? (
              <Spinner />
            ) : errorMessage ? (
              <p className="text-red-500">{errorMessage}</p>
            ) : (
              <ul>
                {movieList?.map((movie) => (
                  <MovieCards key={movie.id} movie={movie} />
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
    </>
  );
}

export default App;
