import React from 'react'

import './pokemon.css'
const pokemon = (props) => {
    const pokemon = props.pokemon

    let name = pokemon.name;

    return (
        <div className="myPokedex">
            <div className="pokemonCard" aria-label="left">
                <img src={pokemon.sprite} alt="pokemon"></img>

                {name}
            </div >

            <div className="pokemonStatus" aria-label="right">

                <ul>
                    <li>
                        weight:{pokemon.weight}

                    </li>
                    <li>
                        height:{pokemon.height}

                    </li>

                </ul>
            </div>


        </div>
    )

}
export default pokemon;
