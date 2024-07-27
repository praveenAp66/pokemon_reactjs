import React, { useRef, useState } from 'react';
import img from '../assets/pokemon.png';
import Pokemoncard from './Pokemoncard';

const Searchbar = () => {
  const [name, setName] = useState("");
  const inputElement = useRef();

  const handleClick = () => {
    setName(inputElement.current.value);
  };

  return (
    <div>
      <div className="fixed top-0 left-0 right-0 flex justify-around items-center h-40 px-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white z-10">
        <div className="h-full max-w-96 px-4">
          <img src={img} className="py-4 h-full" alt="Pokemon" />
        </div>
        <div>
          <input
            type="text"
            name="pokemon"
            placeholder="Enter Pokémon name"
            className="my-4 p-2 bg-white border-2 rounded-md text-black focus:outline-none w-80"
            ref={inputElement}
          />
          <button
            className="bg-gradient-to-r from-sky-500 to-indigo-500 h-11 w-20 rounded-md"
            onClick={handleClick}
          >
            Search
          </button>
        </div>
      </div>
      <div className="pt-40"> {/* Padding to prevent overlap */}
        <Pokemoncard name={name} />
      </div>
    </div>
  );
};

export default Searchbar;
