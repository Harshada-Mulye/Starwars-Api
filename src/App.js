import { useState,useEffect } from 'react';
import './App.css';
import People from './components/People';

function App() {
  const [people, setPeople] = useState(null)
   const [loading,setLoading] = useState(true)
   const [page,setPage] = useState({ prev: false, next: true })
   const [charInput, setCharInput] = useState(null)
   const [inputFoucs, setInputFoucs] = useState(false)

  useEffect(() => {
    (async () => {
      const req = await fetch("https://swapi.dev/api/people")
      const res = await req.json()
      setPage({ prev: res.previous, next: res.next })
      setPeople(res.results)
       setLoading(false)
    })()
  }, [])
 
  const handleSearch = async () => {
    if (!charInput) return

    const req = await fetch(`https://swapi.dev/api/people/?search=${charInput.trim()}`)
    const res = await req.json()
    setPeople(res.results)
  }
  const pagination = async (type, { prev, next }) => {
    if (type === "next") {
      const req = await fetch(next)
      const res = await req.json()

      setPage({ prev: res.previous, next: res.next })
      setPeople(res.results)
      return

    } else {
      if (!prev) return
      const req = await fetch(prev)
      const res = await req.json()

      setPage({ prev: res.previous, next: res.next })
      setPeople(res.results)
      return
    }
  }

  return (
    <div className="App">
          <lable htmlFor="characterSearch">
              <input
                type="text"
                aria-label="Search for character"
                name="characterSearch"
                id="characterSearch"
                placeholder ="search character"
               value={charInput !== null ? charInput : "" }
                onChange={(e) => { setCharInput(e.target.value) }}
                onFocus={(e) => { setInputFoucs(true) }}
              
              />
            </lable>
            <button
              aria-label="Search"
              onClick={() => handleSearch()}
            >
              Search
              </button>
  
     { 
     people === null ?
     <div className="card_list_loading">
     {loading} 
     </div>
     :
   people.map((item, index) => 
   <People key={index} item={item} index={index} />)
   }

{
            people !== null && people.length === 0 ?
              <div className="card_list_error">
                <h1 tabIndex="0">No data Found.</h1>
                <h1 tabIndex="0">Please try again</h1>
              </div>
              :
              ""
          }
      <button 
      onClick={() => pagination("prev", page)}
     
      style={{ display: page.prev === null ? "none" : "inline-block" }}>
        Prev</button>
      <button onClick={() => pagination("next", page)}
       style={{ display: page.next === null ? "none" : "inline-block" }} >Next</button>

    </div>
  );
}

export default App;
