import { render, screen, fireEvent } from '@testing-library/react';
import { TagInput } from '../TagInput';
import { vi } from 'vitest';

describe('TagInput', () => {
  it('renders with initial tags', () => {
    const tags = ['tag1', 'tag2'];
    render(<TagInput tags={tags} onChange={() => {}} />);
    
    expect(screen.getByText('tag1')).toBeInTheDocument();
    expect(screen.getByText('tag2')).toBeInTheDocument();
  });

  it('adds new tag on Enter', () => {
    const onChange = vi.fn();
    render(<TagInput tags={[]} onChange={onChange} />);
    
    const input = screen.getByPlaceholderText(/add tags/i);
    fireEvent.change(input, { target: { value: 'newtag' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    
    expect(onChange).toHaveBeenCalledWith(['newtag']);
  });

  it('removes tag when clicked', () => {
    const onChange = vi.fn();
    render(<TagInput tags={['tag1']} onChange={onChange} />);
    
    fireEvent.click(screen.getByText('×'));
    
    expect(onChange).toHaveBeenCalledWith([]);
  });
}); 