import { render, fireEvent, screen } from '@testing-library/react';
import AddEditCategoryModal from './AddEditCategoryModal';

describe('AddEditCategoryModal component', () => {
  it('renders without crashing', () => {
    render(<AddEditCategoryModal open={false} onClose={() => {}} onSubmit={() => {}} />);
  });

  it('validates the form', () => {
    render(<AddEditCategoryModal open={true} onClose={() => {}} onSubmit={() => {}} />);
    fireEvent.change(screen.getByLabelText('Category Name'), { target: { value: ' ' } });
    fireEvent.click(screen.getByText('Submit'));
    expect(screen.getByText('Category name cannot be empty')).toBeInTheDocument();
  });
});
