import { Query, ID } from "appwrite";
import { tableDB } from "../lib/appwrite";

const VITE_APPWRITE_PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const VITE_APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;
const databaseId = import.meta.env.VITE_APPWRITE_DATABASE;
const tableId = import.meta.env.VITE_APPWRITE_COLLECTION;

export const updateSearchCount = async (searchTerm, movie) => {
  // * 1. use appwrite sdk to check search term exist in the database

  try {
    const result = await tableDB.listRows({
      databaseId, tableId,
      queries: [Query.equal("searchTerm", searchTerm)]
    });

    // * 2. If found increase the count of the search movie
    if (result.rows.length > 0) {
      const doc = result.rows[0];
        console.log(doc)
      await tableDB.updateRow({
        databaseId,
        tableId,
        rowId: doc.$id,
        data: { count: data.count + 1 },
      });
    }
    // * 3. If not add the current search term into the database and set count to 1
    else {
      await tableDB.createRow({
        databaseId,
        tableId,
        rowId: ID.unique(),
        data: {
          searchTerm,
          count: 1,
          movie_id: movie.id,
          poster_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
        },
      });
    }
  } catch (error) {
    console.log(error)
  }
};

export const getTrendingMovies = async() => {
    try {
        const result = await tableDB.listRows({databaseId, tableId, queries: [Query.limit(5), Query.orderDesc("count")]});
        console.log(result)
        return result.rows;
    } catch (error) {
        
    }
}
