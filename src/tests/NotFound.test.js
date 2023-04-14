import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../pages/NotFound';

afterEach(cleanup);

describe('Teste do componente NotFound', () => {
  test('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);

    const notFoundTitle = screen.getByRole('heading', { name: 'Page requested not found', level: 2 });
    expect(notFoundTitle).toBeInTheDocument();
  });

  test('Teste se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);

    const img = screen.getByRole('img');
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(img).toHaveAttribute('src', src);
  });
});
