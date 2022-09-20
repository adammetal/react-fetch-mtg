import { render } from '@testing-library/react';
import Loader from '../index';

test('smoke test for loader', () => {
  const { container } = render(<Loader />);
  expect(container).toMatchSnapshot();
})
