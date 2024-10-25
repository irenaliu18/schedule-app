// import {describe, it,} from 'vitest';
// import {render, screen} from '@testing-library/react';
// import App from './App';

// describe('launching', () => {
//   it('should show the current year', () => {
//     render(<App />);
//     screen.getByText(/2018/);
//   });
// });

// import {describe, it,} from 'vitest';
// import {render, screen} from '@testing-library/react';
// import App from './App';

// describe('launching', () => {
//   it('should show the current year', async () => {
//     render(<App />);
//     await screen.findByText(/2018/);
//   });
// });

import {describe, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import App from './App';
import {useAuth, database} from '../utilities/firebase';

const mockSchedule = {
  "title": "CS Courses for 1850-1851",
  "courses": {
  }
};

vi.mock('../utilities/firebase');

beforeEach(() => {
  database.mockReturnValue([mockSchedule, null]);
  useAuth.mockReturnValue([null]);
});

afterEach(() => {
  vi.resetAllMocks();
});

describe('launching', () => {
  it('should show the current year', () => {
    render(<App />);
    screen.getByText(/1850/);
  });
});

