import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Search from './components/Search'

const API_BASE_URL = "https://api.themoviedb.org/3/movie/popular";

const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MjNmMDcyMDlkNWI4NDJjYWYwY2I3ZDJhMzdlMjE3OCIsIm5iZiI6MTc3MDU1NjI3MC4yNjMsInN1YiI6IjY5ODg4YjZlMzNmOGZlYTFhODVjYWEwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oZbUYzxph-PErPlN-NJQgNscjJR9aHVD7It2tBbQFDg";

const API_OPTION = {
  method: "GET",
  headers:{
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}


function App() {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    console.log(API_KEY)
      const res = fetch(API_BASE_URL, API_OPTION).then(res => res.json().then(r => console.log(r))).catch(err => console.log(err))
  }, [])

  return (
    <>
      <main>
        <div className="pattern"/>
        <div className="wrapper">
            <header>
              <h1>Find <span className='text-gradient'> Movies</span> You'll Enjoy Without the Hassle</h1>
            </header>

            <Search seachTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </main>
    </>
  )
}

export default App
