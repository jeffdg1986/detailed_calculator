import { render, screen } from '@testing-library/react';
import DetailedCalculator from './DetailedCalculator';

test('renders learn react link', () => {
  render(<DetailedCalculator />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
