import { CategoryType } from '@/types/types';

export const fetchCategories = (): Promise<CategoryType[]> =>
  new Promise((resolve) =>
    setTimeout(
      () =>
        resolve([
          {
            id: 1,
            name: 'Category',
            children: [],
          },
        ]),
      2000
    )
  );
