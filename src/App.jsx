import { Children, useEffect, useState } from "react";
import heroImg from "./assets/hero.png";
import "./App.css";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCards from "./components/MovieCards";
import { useDebounce } from "react-use";

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MjNmMDcyMDlkNWI4NDJjYWYwY2I3ZDJhMzdlMjE3OCIsIm5iZiI6MTc3MDU1NjI3MC4yNjMsInN1YiI6IjY5ODg4YjZlMzNmOGZlYTFhODVjYWEwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oZbUYzxph-PErPlN-NJQgNscjJR9aHVD7It2tBbQFDg";

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
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  useDebounce(() => setDebouncedSearchTerm, 500, [searchTerm]);

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
    } catch (err) {
      setErrorMessage(err.message || "Unable to fetch data");
      setMovieList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(searchTerm);
  }, [searchTerm]);

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

          <section className="all-movies">
            <h2 className="mt-[40px]">All Movies</h2>

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
