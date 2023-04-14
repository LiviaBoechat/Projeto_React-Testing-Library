import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

describe('Teste do componente Pokedex', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);

    const title = screen.getByRole('heading', { name: 'Encountered Pokémon', level: 2 });
    expect(title).toBeInTheDocument();
  });

  test('Teste se o botão All(reset) está na tela qd a pág. for carregada e se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado ', () => {
    renderWithRouter(<App />);

    // se o forEach não quebrar, quer dizer que ele rodou a pokemonList TODO, ou seja, o filtro All está ativado qd inicia a página
    pokemonList.forEach((eachPokemon) => {
      const nextPokemon = screen.getByText(eachPokemon.name);
      expect(nextPokemon).toBeInTheDocument();
      const btnNext = screen.getByText('Próximo Pokémon');
      expect(btnNext).toBeInTheDocument();
      userEvent.click(btnNext);
    });

    // clica em qlq outro filtro p/ depois clicar no All
    const btnOtherFilter = screen.getByText('Fire');
    userEvent.click(btnOtherFilter);

    // clica no All p/ ver se ele RESETA msm o filtro anterior clicado
    const btnAll = screen.getByText(/all/i);
    expect(btnAll).toBeInTheDocument();
    userEvent.click(btnAll);

    // se o forEach não quebrar, quer dizer que ele rodou a pokemonList TODO, ou seja, o filtro All REALMENTE resetou o outro filtro que foi clicado
    pokemonList.forEach((eachPokemon) => {
      const nextPokemon = screen.getByText(eachPokemon.name);
      expect(nextPokemon).toBeInTheDocument();
      const btnNext = screen.getByText('Próximo Pokémon');
      expect(btnNext).toBeInTheDocument();
      userEvent.click(btnNext);
    });
  });

  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const getPokemonDataTestId = screen.getAllByTestId(/pokemon-name/i);
    expect(getPokemonDataTestId.length).toBe(1);
  });

  test('Teste se existe um botão de filtro para cada pokemon', () => {
    renderWithRouter(<App />);

    const getPokemonTypeButton = screen.getAllByTestId(/pokemon-type-button/i);
    const btnNext = screen.getByText(/próximo pokémon/i);

    getPokemonTypeButton.forEach((eachButton, index) => {
      if (index !== 0) {
        userEvent.click(eachButton);
        const pokemonType = screen.getByTestId('pokemon-type');
        expect(eachButton.innerHTML).toBe(pokemonType.innerHTML);
        if (btnNext.disabled === false) {
          userEvent.click(btnNext);
          const nextPokemonType = screen.getByTestId('pokemon-type');
          expect(eachButton.innerHTML).toBe(nextPokemonType.innerHTML);
        }
      }
    });
  });
});
