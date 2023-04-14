import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

describe('Teste do componente Pokedex', () => {
  test('Teste se é renderizado um card com as informações de determinado Pokémon: nome, tipo, avarage weight, image', () => {
    const avarageWeightFunc = (value) => (
      `Average weight: ${value} kg`
    );
    renderWithRouter(<App />);

    const btnNext = screen.getByText('Próximo Pokémon');

    pokemonList.forEach((eachPokemon) => {
      const name = screen.getByText(eachPokemon.name);
      const type = screen.getByTestId('pokemon-type');
      const avarageWeight = screen
        .getByText(avarageWeightFunc(eachPokemon.averageWeight.value));
      const image = screen.getByAltText(`${eachPokemon.name} sprite`);

      expect(name).toBeInTheDocument();
      expect(type).toBeInTheDocument();
      expect(type.innerHTML).toBe(eachPokemon.type);
      expect(avarageWeight).toBeInTheDocument();
      expect(image).toHaveAttribute('src', eachPokemon.image);
      expect(image).toHaveAttribute('alt', `${eachPokemon.name} sprite`);

      userEvent.click(btnNext);
    });
  });

  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemon/<id>, onde <id> é o id do Pokémon exibido', () => {
    const { history } = renderWithRouter(<App />);

    const btnDetails = screen.getByText('More details');
    userEvent.click(btnDetails);

    const { pathname } = history.location;

    expect(pathname).toBe('/pokemon/25');
  });

  test('Teste se existe um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(<App />);
    const srcStarImage = '/star-icon.svg';

    const btnDetails = screen.getByText('More details');
    userEvent.click(btnDetails);

    const checkboxFavorite = screen.getByRole('checkbox');
    userEvent.click(checkboxFavorite);

    const starImage = screen.getByAltText('Pikachu is marked as favorite');

    expect(starImage).toHaveAttribute('src', srcStarImage);
  });
});
