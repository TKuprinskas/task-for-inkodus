import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../state/store';
import Sidebar from './Sidebar';

describe('Sidebar component', () => {
  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <Sidebar />
      </Provider>
    );
  });
});
