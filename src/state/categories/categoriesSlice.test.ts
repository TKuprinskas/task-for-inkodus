import { categoriesSlice } from './categoriesSlice';
import { CategoryType } from '@/types/types';

interface CategoriesState {
  categories: CategoryType[];
  nextId: number;
}

interface AddCategoryPayload {
  name: string;
  parentId?: number;
}

describe('categoriesSlice reducer', () => {
  it('should handle initial state', () => {
    expect(categoriesSlice.reducer(undefined, { type: 'unknown' })).toEqual({
      categories: [],
      nextId: 1,
    });
  });

  it('should handle addCategory', () => {
    const initialState: CategoriesState = {
      categories: [],
      nextId: 1,
    };
    const payload: AddCategoryPayload = { name: 'Test' };
    const actual = categoriesSlice.reducer(initialState, categoriesSlice.actions.addCategory(payload));
    expect(actual.categories[0]).toEqual({ id: 1, name: 'Test 1', children: [] });
  });

  it('should handle updateCategory', () => {
    const initialState: CategoriesState = {
      categories: [{ id: 1, name: 'Test 1', children: [] }],
      nextId: 2,
    };
    const payload: CategoryType = { id: 1, name: 'Updated Test', children: [] };
    const actual = categoriesSlice.reducer(initialState, categoriesSlice.actions.updateCategory(payload));
    expect(actual.categories[0]).toEqual({ id: 1, name: 'Updated Test', children: [] });
  });

  it('should handle deleteCategory', () => {
    const initialState: CategoriesState = {
      categories: [{ id: 1, name: 'Test 1', children: [] }],
      nextId: 2,
    };
    const payload: number = 1;
    const actual = categoriesSlice.reducer(initialState, categoriesSlice.actions.deleteCategory(payload));
    expect(actual.categories).toEqual([]);
  });
});
