import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryClient, QueryClientProvider, useQuery} from '@tanstack/react-query';

// const queryClient = new QueryClient();

// ReactDOM.render(
//   <QueryClientProvider client={queryClient}>
//     <App />
//   </QueryClientProvider>,
//   document.getElementById('root')
// );
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
