import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ListItem, ListItemIcon, ListItemText, IconButton, Menu, MenuItem, Collapse, List } from '@mui/material';
import { Edit, Add, Delete, ExpandLess, ExpandMore } from '@mui/icons-material';
import AddEditCategoryModal from './AddEditCategoryModal';
import { addCategory, updateCategory, deleteCategory } from '../state/categories/categoriesSlice';
import { CategoryType } from '@/types/types';

interface CategoryProps {
  category: { id: number; name: string; children: CategoryType[] };
}

interface ActionState {
  type: 'add' | 'edit';
  parentId?: number;
}

const Category: React.FC<CategoryProps> = ({ category }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [action, setAction] = useState<ActionState>({ type: 'add' });
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleAdd = () => {
    setAction({ type: 'add' });
    setModalOpen(true);
    handleCloseMenu();
  };

  const handleAddChild = () => {
    setAction({ type: 'add', parentId: category.id });
    setModalOpen(true);
    handleCloseMenu();
  };

  const handleEdit = () => {
    setAction({ type: 'edit' });
    setModalOpen(true);
    handleCloseMenu();
  };

  const handleDelete = () => {
    dispatch(deleteCategory(category.id));
    handleCloseMenu();
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (categoryName: string) => {
    if (action.type === 'add') {
      dispatch(addCategory({ name: categoryName, parentId: action.parentId }));
      if (action.parentId === category.id) {
        setOpen(true);
      }
    } else if (action.type === 'edit') {
      dispatch(updateCategory({ id: category.id, name: categoryName, children: category.children }));
    }
    setModalOpen(false);
  };

  return (
    <>
      <ListItem onClick={handleToggle}>
        <ListItemIcon>
          <IconButton onClick={handleOpenMenu} aria-label='Open menu'>
            <Edit />
          </IconButton>
        </ListItemIcon>
        <ListItemText primary={category.name} />
        {category.children.length > 0 && (open ? <ExpandLess sx={{ cursor: 'pointer' }} /> : <ExpandMore sx={{ cursor: 'pointer' }} />)}
      </ListItem>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding style={{ paddingLeft: '20px' }}>
          {category.children.map((childCategory) => (
            <Category key={childCategory.id} category={childCategory} />
          ))}
        </List>
      </Collapse>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        <MenuItem onClick={handleAdd}>
          <Add fontSize='small' sx={{ mr: 1 }} />
          Insert category
        </MenuItem>
        <MenuItem onClick={handleAddChild}>
          <Add fontSize='small' sx={{ mr: 1 }} />
          Insert child category
        </MenuItem>
        <MenuItem onClick={handleEdit}>
          <Edit fontSize='small' sx={{ mr: 1 }} />
          Update category
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <Delete fontSize='small' sx={{ mr: 1 }} />
          Delete category
        </MenuItem>
      </Menu>
      <AddEditCategoryModal
        open={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        currentCategoryName={action.type === 'edit' ? category.name : undefined}
      />
    </>
  );
};

export default Category;
