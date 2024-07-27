import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Pokemoncard = ({ name }) => {
    const [Pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(false);
    const [pokemonlist, setPokemonlist] = useState(JSON.parse(localStorage.getItem('pokemandata')));
    const navigate = useNavigate();

    const fetchPokemon = async () => {
        if (name) {
            setLoading(true);
            try {
                let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
                if (response.ok) {
                    let result = await response.json();
                    setPokemon(result);
                } else {
                    console.error('Error fetching Pokémon data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching Pokémon data:', error);
            }
            setLoading(false);
        }
    };

    const addtoteam = (Pokemon) => {
        let currentData = JSON.parse(localStorage.getItem('pokemandata')) || [];
        let isalreadyadded = currentData.some(p => p.id === Pokemon.id);
        if (isalreadyadded) {
            alert("Already added");
        } else if (currentData.length < 6) {
            currentData.push(Pokemon);
            localStorage.setItem("pokemandata", JSON.stringify(currentData));
            setPokemonlist(currentData);
            alert("Added to the team");
        } else {
            alert("Reached max number of pokemons - 6");
        }
    };

    const handleViewTeam = () => {
        navigate('/teamdisplay');
        setTimeout(() => {
            const element = document.getElementById('teamdisplay');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        },); // Timeout ensures the scroll happens after navigation
    };

    useEffect(() => {
        fetchPokemon();
    }, [name]);

    return (
        <div className='w-full h-screen bg-gradient-to-b from-blue-500 to-fuchsia-500 text-white mt-15'>
            {!loading && Pokemon ? (
                <div className="w-full max-w-4xl mx-auto flex flex-row lg:flex-row gap-8 items-center justify-center h-full ">
                    <div className="flex-1 flex flex-col items-center justify-center  mb-60">
                        <img
                            src={Pokemon.sprites?.front_default || ''}
                            alt={Pokemon.name}
                            className='w-full max-w-[150px] h-auto mb-4'
                        />
                        <div className='flex flex-row space-x-4'>
                            <div>
                                <button
                                    className="mt-2 bg-blue-500 h-10 w-36 rounded-md"
                                    onClick={() => addtoteam(Pokemon)}
                                >
                                    Add to Team
                                </button>
                            </div>
                            <div>
                                <button className="mt-2 bg-blue-500 h-10 w-36 rounded-md" onClick={handleViewTeam}>
                                    View Team
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 mb-32" >
                        <h1 className='text-4xl font-bold mb-4'>{Pokemon.name}</h1>
                        <div className="mb-4">
                            <h5 className='text-lg font-bold'>Types</h5>
                            {Pokemon.types.map((type, index) => (
                                <p key={index} className='text-lg'>{type.type.name}</p>
                            ))}
                        </div>
                        <div className="mb-4">
                            <h5 className='text-lg font-bold'>Abilities</h5>
                            {Pokemon.abilities.map((ability, index) => (
                                <p key={index} className='text-lg'>{ability.ability.name}</p>
                            ))}
                        </div>
                        <p className='text-lg'>Height: {Pokemon.height}</p>
                        <p className='text-lg'>Weight: {Pokemon.weight}</p>
                    </div>
                    <div className="flex-1 mb-28">
                        <h5 className='text-lg font-bold mb-1'>Stats</h5>
                        {Pokemon.stats.map((stat, index) => (
                            <div key={index} className='mb-2'>
                                <p className='text-lg'>{stat.stat.name}: {stat.base_stat}</p>
                                <div className="w-full bg-gray-200 rounded-full h-4">
                                    <div className="bg-blue-600 h-4 rounded-full" style={{ width: `${stat.base_stat}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default Pokemoncard;
