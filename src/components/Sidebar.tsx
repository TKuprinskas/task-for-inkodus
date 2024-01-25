import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RootState, AppDispatch } from '@/state/store';
import Category from './Category';
import { fetchCategoriesAsync } from '../state/categories/categoriesSlice';
import { CategoryType } from '@/types/types';

const SidebarContainer = styled.div`
  max-width: 400px;
  width: auto;
  height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
  box-sizing: border-box;
  overflow: auto;
`;

const StyledP = styled.p`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

const Sidebar: React.FC = () => {
  const categories = useSelector((state: RootState) => state.categories.categories);
  const dispatch = useDispatch<AppDispatch>();

  const countCategories = (categories: CategoryType[]): number => {
    let count = categories.length;
    for (let category of categories) {
      count += countCategories(category.children);
    }
    return count;
  };

  const count = useSelector((state: RootState) => countCategories(state.categories.categories));

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  return (
    <SidebarContainer>
      <StyledP>Total categories: {count}</StyledP>
      {categories.length > 0 ? categories.map((category) => <Category key={category.id} category={category} />) : <p>No categories yet</p>}
    </SidebarContainer>
  );
};

export default Sidebar;
