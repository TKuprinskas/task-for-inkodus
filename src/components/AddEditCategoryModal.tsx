import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

interface AddEditCategoryModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (categoryName: string) => void;
  currentCategoryName?: string;
}

const AddEditCategoryModal: React.FC<AddEditCategoryModalProps> = ({ open, onClose, onSubmit, currentCategoryName }) => {
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    setCategoryName(currentCategoryName || '');
  }, [currentCategoryName]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);
    if (event.target.value.trim() === '') {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleSubmit = () => {
    if (categoryName.trim() === '') {
      setError(true);
      return;
    }
    onSubmit(categoryName);
    setCategoryName('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add/Edit Category</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          label='Category Name'
          type='text'
          fullWidth
          value={categoryName}
          onChange={handleNameChange}
          error={error}
          helperText={error ? 'Category name cannot be empty' : ''}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditCategoryModal;
