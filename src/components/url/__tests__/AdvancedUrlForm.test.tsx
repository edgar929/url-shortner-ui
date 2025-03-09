import { render, screen, fireEvent } from '@testing-library/react';
import { AdvancedUrlForm } from '../AdvancedUrlForm';

describe('AdvancedUrlForm', () => {
  it('renders basic form fields', () => {
    render(<AdvancedUrlForm />);
    
    expect(screen.getByLabelText(/long url/i)).toBeInTheDocument();
    expect(screen.getByText(/advanced options/i)).toBeInTheDocument();
  });

  it('shows advanced options when clicked', () => {
    render(<AdvancedUrlForm />);
    
    fireEvent.click(screen.getByText(/show advanced options/i));
    
    expect(screen.getByLabelText(/custom alias/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/expiration date/i)).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    render(<AdvancedUrlForm />);
    
    fireEvent.click(screen.getByText(/shorten url/i));
    
    expect(await screen.findByText(/please enter a valid url/i)).toBeInTheDocument();
  });
}); 