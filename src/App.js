
import './App.css';
import React, { useEffect, useState } from 'react';
import Pokemon from './components/pokemon'
function App() {
  const [pokemon, setPokemon] = useState([]);
  useEffect(function () {
    fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
      .then(function (serverReturn) {
        return serverReturn.json()
      })
      .then(function (jsonPromise) {
        setPokemon(jsonPromise)
      })


  }, [])
  var basePokemon = {
    name: pokemon?.name,
    height: pokemon?.height,
    weight: pokemon?.weight,
    sprite: pokemon.sprites?.front_default,
    base_experience: pokemon?.base_experience,
  }


  const [pokelist, setPokelist] = useState([]);
  const [currentOffset, setCurrentOffset] = useState(0);

  
  const [pokeListFinal,setPokeListFInal] = useState([])
  useEffect(() => {
    const perPage = 25;
    const ENDPOINT = 'https://pokeapi.co/api/v2'
    const URL = `${ENDPOINT}/pokemon?limit=${perPage}&offset=${currentOffset}`
    console.log(URL)
    fetch(URL)
      .then((response) => response.json())
      .then((newPokemons) => {
        let test = newPokemons?.results
    
        return (setPokelist((prevPokemons) => [...prevPokemons, ...test]))

      }
      )
  }, [currentOffset]);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        console.log("sentileaApareceu", currentOffset)
        setCurrentOffset((currentValue) => currentValue + 25)
      }
    })
    intersectionObserver.observe(document.querySelector('#sentinela'));
    return () => intersectionObserver.disconnect();
  }, [])
  

  useEffect(()=>{

    pokelist?.map((entity)=>{
       
      console.log('URL',entity.url)
      fetch(entity.url)
        .then(function (serverReturn) {
          return serverReturn.json()
        })
        .then(function (jsonPromise) {
          return (setPokeListFInal((prevPokemons) => [...prevPokemons,jsonPromise]))
        })

    })

  },[pokelist])

  return (
    <div className="pokemon">
      <div className="pokeInfo">
        <form onSubmit={function handleSearchPokemon(e) {
          e.preventDefault();
          const formData = new FormData(e.target)
          let searchName = formData.get("searchPoke").toLowerCase();
          fetch(`https://pokeapi.co/api/v2/pokemon/${searchName}`)
            .then(function (serverReturn) {
              if (!serverReturn.ok) {
                throw Error(serverReturn.statusText)
              }
              return serverReturn.json()
            })
            .then(function (jsonPromise) {

              setPokemon(jsonPromise)
              basePokemon = {
                name: pokemon?.name,
                height: pokemon?.height,
                weight: pokemon?.weight,
                sprite: pokemon.sprites?.front_default,
                base_experience: pokemon?.base_experience,
              }

            })
            .catch(function (error) {
              console.log('There has been a problem with your fetch operation: ' + error.message);
            });



        }}>
          <label htmlFor="nomePokemon">Pokemon</label>
          <input name="searchPoke" id="nomePokemon" types="text" placeholder="Pikachu"></input>
          <button>Buscar</button>
        </form>

        <Pokemon pokemon={basePokemon}></Pokemon>

        Abilities
        <ul>
          {
            pokemon.abilities?.map((entity) => {
              return (
                <li key={entity.ability.name}>
                  {entity.ability.name}
                </li>
              )
            })
          }
        </ul>
        Types
        <ul>
          {
            pokemon.types?.map((entity) => {
              return (
                <li key={entity.type.name}>
                  {entity.type.name}
                </li>
              )
            })
          }
        </ul>
        Moves
        <ul>
          {
            pokemon.moves?.map((entity, index) => {
              return (
                <li key={entity.move.name + index}>
                  {entity.move.name}
                </li>
              )
            })
          }
        </ul>
      </div>
      <div className="pokeList">
        <h2>PokeList</h2>
        <ul>
          {
            pokeListFinal.map((entity, index) => {
              return (
                <li key={entity.name + index}>
                  
                  <div>
                    <img src={entity.sprites?.front_default}></img>
                    {entity.name}
                  </div>
                </li>
              )
            })
          }
          <li id="sentinela"></li>
        </ul>
      </div>
    </div>
  );
}

export default App;
