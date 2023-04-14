import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

afterEach(cleanup);
describe('Teste do componente App', () => {
  test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: 'Home' });
    const linkAbout = screen.getByRole('link', { name: 'About' });
    const linkFavorite = screen.getByRole('link', { name: 'Favorite Pokémon' });

    expect(linkHome).toBeInTheDocument();
    expect(linkHome).toHaveTextContent('Home');
    expect(linkHome).toBeVisible();

    expect(linkAbout).toBeInTheDocument();
    expect(linkAbout).toHaveTextContent('About');
    expect(linkAbout).toBeVisible();

    expect(linkFavorite).toBeInTheDocument();
    expect(linkFavorite).toBeVisible();
  });
  test('Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: 'Home' });
    expect(linkHome).toBeInTheDocument();
    userEvent.click(linkHome);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: 'About' });
    expect(linkAbout).toBeInTheDocument();
    userEvent.click(linkAbout);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Teste se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    const linkFavoritePokemon = screen.getByRole('link', { name: 'Favorite Pokémon' });
    expect(linkFavoritePokemon).toBeInTheDocument();
    userEvent.click(linkFavoritePokemon);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  test('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/qlqcoisa');
    });

    // const { pathname } = history.location;
    // expect(pathname).toBe('/qlqcoisa');

    const notFoundTitle = screen.getByRole('heading', { name: 'Page requested not found' });
    expect(notFoundTitle).toBeInTheDocument();
  });
});
