import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../state/store';
import Category from './Category';
import { CategoryType } from '@/types/types';

describe('Category component', () => {
  it('renders without crashing', () => {
    const category: CategoryType = { id: 1, name: 'Test', children: [] };
    render(
      <Provider store={store}>
        <Category category={category} />
      </Provider>
    );
  });

  it('opens the menu when the edit button is clicked', async () => {
    const category: CategoryType = { id: 1, name: 'Test', children: [] };
    render(
      <Provider store={store}>
        <Category category={category} />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));

    fireEvent.click(await screen.findByRole('menuitem', { name: /update category/i }));
  });

  it('opens the menu and inserts a category when the insert category button is clicked', async () => {
    const category: CategoryType = { id: 1, name: 'Test', children: [] };
    render(
      <Provider store={store}>
        <Category category={category} />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));

    fireEvent.click(await screen.findByRole('menuitem', { name: /insert category/i }));
  });

  it('opens the menu and deletes a category when the delete category button is clicked', async () => {
    const category: CategoryType = { id: 1, name: 'Test', children: [] };
    render(
      <Provider store={store}>
        <Category category={category} />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));

    fireEvent.click(await screen.findByRole('menuitem', { name: /delete category/i }));
  });
});
