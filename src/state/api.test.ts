import { fetchCategories } from './api';

describe('fetchCategories function', () => {
  it('returns the expected data', async () => {
    const categories = await fetchCategories();
    expect(categories).toEqual([{ id: 1, name: 'Category', children: [] }]);
  });
});
