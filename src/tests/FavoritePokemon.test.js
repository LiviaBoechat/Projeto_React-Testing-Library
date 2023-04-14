import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemon from '../pages/FavoritePokemon';

afterEach(cleanup);

const favoritedPokemon = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Kanto Power Plant',
        map: 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ],
    summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
  }];

describe('Teste do componente FavoritePokemon', () => {
  test('Teste se apenas são exibidos os Pokémon favoritados', () => {
    renderWithRouter(<FavoritePokemon
      pokemonList={ favoritedPokemon }
    />);

    const pokemonCard = screen.getByText(/pikachu/i);
    expect(pokemonCard).toBeInTheDocument();
  });

  test('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', () => {
    renderWithRouter(<FavoritePokemon
      pokemonList={ [] }
    />);

    const emptyFavoriteText = screen.getByText('No favorite Pokémon found');
    expect(emptyFavoriteText).toBeInTheDocument();
  });
});
