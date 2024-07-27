import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Teamdisplay = () => {
  const [teamlist, setTeamlist] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchData = () => {
      const storage = localStorage.getItem('pokemandata');
      if (storage) {
        try {
          const parsedStorage = JSON.parse(storage);
          setTeamlist(parsedStorage);
        } catch (error) {
          console.error("Error parsing localStorage data:", error);
        }
      }
    };

    fetchData();
  }, [teamlist]);

  useEffect(() => {
    if (location.state?.scroll) {
      const element = document.getElementById('teamdisplay');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.state]);

  const handleRemove = (id) => {
    const updatedList = teamlist.filter(pokemon => pokemon.id !== id);
    localStorage.setItem('pokemandata', JSON.stringify(updatedList));
    setTeamlist(updatedList);
  };

  return (
    <div className='w-full h-screen bg-gradient-to-b from-blue-500 to-fuchsia-500 text-white pt-20' id="teamdisplay">
      <div className='w-full max-w-4xl mx-auto p-4 mt-20'>
        <h1 className='text-4xl font-bold mb-8 text-center'>Team Pokeman</h1>
        <div className='grid grid-cols-6  gap-4'>
          {teamlist.length > 0 ? (
            teamlist.map((pokemon) => (
              <div key={pokemon.id} className='bg-white text-black p-4 rounded-md flex flex-col items-center relative'>
                <button
                  onClick={() => handleRemove(pokemon.id)}
                  className='absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full'
                >
                  X
                </button>
                <img
                  src={pokemon.sprites?.front_default || ''}
                  alt={pokemon.name}
                  className='w-full max-w-[150px] h-auto mb-4'
                />
                <h2 className='text-lg font-bold'>{pokemon.name}</h2>
              </div>
            ))
          ) : (
            <p className='text-center col-span-full'>No Pokémon in team</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Teamdisplay;
