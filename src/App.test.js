import { render, screen } from '@testing-library/react';
import App from './App';

test('renders AutoSQL link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Report A/i);
  expect(linkElement).toBeInTheDocument();
});
