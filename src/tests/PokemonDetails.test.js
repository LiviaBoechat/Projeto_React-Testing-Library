import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste do componente PokemonDetails', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    const btnMoreDetails = screen.getByText('More details');
    userEvent.click(btnMoreDetails);
  });

  test('Teste se é renderizado um card com nome de determinado Pokémon, o h2 summary e o parágrafo do summary', () => {
    const name = screen.getByText('Pikachu');
    const title = screen.getByText('Pikachu Details');
    const summary = screen.getByRole('heading', { name: 'Summary', level: 2 });
    const summaryText = screen.getByText('This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.');

    expect(name).toBeInTheDocument();
    expect(title).toBeVisible();
    expect(summary).toBeInTheDocument();
    expect(summaryText).toBeInTheDocument();
  });

  test('Na seção de detalhes deverá existir um heading h2 com o texto Game Locations of <name>; onde <name> é o nome do Pokémon exibido', () => {
    const gameLocationsTitle = screen.getByRole('heading', { name: 'Game Locations of Pikachu', level: 2 });

    expect(gameLocationsTitle).toBeInTheDocument();
  });

  test('Todas as localizações do Pokémon devem ser mostradas na seção de detalhes', () => {
    const pokemonLocation1 = screen.getByText('Kanto Viridian Forest');
    const pokemonLocation2 = screen.getByText('Kanto Power Plant');
    const locationMap = screen.getAllByRole('img', { name: 'Pikachu location' });
    const locationUrl1 = 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png';
    const locationUrl2 = 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png';

    expect(locationMap.length).toBe(2);
    expect(pokemonLocation1).toBeVisible();
    expect(pokemonLocation2).toBeVisible();
    expect(locationMap[0].src).toBe(locationUrl1);
    expect(locationMap[1].src).toBe(locationUrl2);
  });

  test('Teste se o usuário pode favoritar um Pokémon através da página de detalhes', () => {
    const checkboxFavorite = screen.getByRole('checkbox');
    const labelCheckbox = screen.getByText('Pokémon favoritado?');
    userEvent.click(checkboxFavorite);

    const starImage = screen.getByAltText('Pikachu is marked as favorite');
    const urlStarImage = '/star-icon.svg';
    expect(starImage).toHaveAttribute('src', urlStarImage);
    expect(labelCheckbox).toBeVisible();
  });
});
