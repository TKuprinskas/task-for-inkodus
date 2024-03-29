// App.test.tsx
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './state/store';
import App from './App';

describe('App component', () => {
  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
});
