import React from 'react'

import './pokemon.css'
const Pokemon = (props) => {
    const pokemon = props.pokemon
   
    return (
        <div className="myPokedex">
            <div className="pokemonCard" aria-label="left">
                <img src={pokemon.sprite} alt="pokemon"></img>
                {pokemon.name?.toUpperCase()}
            </div >

            <div className="pokemonStatus" aria-label="right">

                <ul>
                    <li>
                        WEIGHT:{pokemon.weight}

                    </li>
                    <li>
                        HEIGHT:{pokemon.height}

                    </li>
                    <li>
                        BASE EXPERIENCE:{pokemon?.base_experience}

                    </li>

                </ul>
            </div>


        </div>
    )

}
export default Pokemon;
