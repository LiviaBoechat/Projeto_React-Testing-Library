import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

afterEach(cleanup);
describe('Teste do componente About', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const aboutTitle = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    const aboutParagraph = screen.getAllByText(/Pokémon/i);
    const image = screen.getByRole('img');
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(aboutTitle).toBeInTheDocument();
    expect(aboutParagraph).toHaveLength(2);
    expect(image).toHaveAttribute('src', src);
  });
});
