import { render, screen, waitForElementToBeRemoved, waitFor, act } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import { App } from '../components';

let container: any = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

beforeEach(() => {
  act(() => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<App />} />
        </Routes>
      </BrowserRouter>,
      container,
    );
  });
});

test('should show loading once it is opened', () => {
  const isLoading = screen.getByTestId('is-loading');
  expect(isLoading).toBeInTheDocument();
});

test('loading should disappear once after some time', () => {
  const isLoading = screen.getByTestId('is-loading');
  waitForElementToBeRemoved(isLoading).then(async () => {
    expect(isLoading).not.toBeInTheDocument();
  });
});

test('header text logo appears once after some time', async () => {
  await waitFor(async () => {
    expect(await screen.findByText('Freshnesecom')).toBeVisible();

    expect(screen.getByTestId('Freshnesecom')).toBeInTheDocument();
    expect(screen.getByTestId('header')).toBeInTheDocument();
    console.log(screen.getByTestId('header').style.background);

    expect(screen.getByTestId('header').childElementCount).toBe(3);
  });
});

test('side bar of categories has 20 category', async () => {
  await waitFor(() => {
    expect(screen.getByTestId('categories')).toBeInTheDocument();

    expect(screen.getByTestId('categories').childElementCount).toBe(20);
  });
});

test('header categories has same count side bar + 1', async () => {
  await waitFor(() => {
    const sidenav = screen.getByTestId('categories');
    const headerSelect = screen.getByTestId('header-select');
    expect(sidenav).toBeInTheDocument();
    expect(headerSelect).toBeInTheDocument();

    expect(headerSelect.childElementCount).toBe(sidenav.childElementCount + 1);
  });
});

test('upon click on first item become selected', async () => {
  await waitFor(() => {
    const selectedCategory = screen.getByTestId('categories').children[1];
    userEvent.click(selectedCategory);

    expect(selectedCategory.classList.contains('selected')).toBeDefined();
  });
});
