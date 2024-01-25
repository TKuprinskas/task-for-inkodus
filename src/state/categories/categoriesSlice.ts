import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CategoryType } from '@/types/types';
import { fetchCategories } from '../api';

export const fetchCategoriesAsync = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await fetchCategories();
  return response;
});

interface CategoriesState {
  categories: CategoryType[];
  nextId: number;
}

const initialState: CategoriesState = {
  categories: [],
  nextId: 1,
};

interface AddCategoryPayload {
  name: string;
  parentId?: number;
}

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<AddCategoryPayload>) => {
      const { name, parentId } = action.payload;
      let newId = 0;
      let categoryNameWithPostfix = name;

      const findAndAddChild = (categories: CategoryType[], parentIds: string[] = []) => {
        for (let i = 0; i < categories.length; i++) {
          let category = categories[i];
          if (category.id === parentId) {
            const newChildIndex = category.children.length + 1;
            newId = parentId * 10 + newChildIndex;
            const newParentIds = [...parentIds, `${newChildIndex}`];
            categoryNameWithPostfix = `${name} ${newParentIds.join('.')}`;
            category.children.push({ id: newId, name: categoryNameWithPostfix, children: [] });
            return true;
          }

          if (category.children.length > 0) {
            if (findAndAddChild(category.children, [...parentIds, `${i + 1}`])) {
              return true;
            }
          }
        }

        return false;
      };

      if (parentId) {
        if (!findAndAddChild(state.categories, [`${parentId % 10}`])) {
          state.categories.push({ id: newId, name: categoryNameWithPostfix, children: [] });
        }
      } else {
        newId = state.nextId;
        categoryNameWithPostfix = `${name} ${state.nextId}`;
        state.categories.push({ id: newId, name: categoryNameWithPostfix, children: [] });
        state.nextId += 1;
      }
    },
    updateCategory: (state, action: PayloadAction<CategoryType>) => {
      const updateCategoryRecursive = (categories: CategoryType[]) => {
        for (let category of categories) {
          if (category.id === action.payload.id) {
            category.name = action.payload.name;
            return true;
          }

          if (category.children.length > 0) {
            if (updateCategoryRecursive(category.children)) {
              return true;
            }
          }
        }

        return false;
      };

      updateCategoryRecursive(state.categories);
    },
    deleteCategory: (state, action: PayloadAction<number>) => {
      const deleteCategoryRecursive = (categories: CategoryType[]): CategoryType[] => {
        return categories.filter((category) => {
          if (category.id === action.payload) {
            return false;
          }

          category.children = deleteCategoryRecursive(category.children);
          return true;
        });
      };

      state.categories = deleteCategoryRecursive(state.categories);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategoriesAsync.fulfilled, (state, action: PayloadAction<CategoryType[]>) => {
      state.categories = action.payload;
      state.nextId = state.categories.length + 1;
    });
  },
});

export const { addCategory, updateCategory, deleteCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
