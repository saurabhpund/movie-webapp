import searchImg from "../assets/search.svg";

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search">
      <div>
        <img src={searchImg} alt="search icon" />
        <input
          type="text"
          placeholder="Search through thousand of movies"
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>
    </div>
  );
};

export default Search;
