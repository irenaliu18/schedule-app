import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { onValue, ref} from 'firebase/database';
import { database, useAuth } from '../utilities/firebase'
import './styling/App.css';
import React from 'react';
import Banner from './components/Banner';
import CourseList from './components/CourseList';

// Fetch the schedule data
const fetchSchedule = async () => {
  const dbRef = ref(database, 'courses'); // Assuming 'courses' is the path in your database
  const snapshot = await new Promise((resolve, reject) => {
    onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log('Fetched data from Firebase:', data); // Inspect fetched data
        resolve(data);
      } else {
        reject('No data available');
      }
    }, {
      onlyOnce: true // Only listen for one event and then stop
    });
  });
  return snapshot;
};

// Main component
const Main = () => {
  const user = useAuth();
  const { data: schedule, isLoading, error } = useQuery({
    queryKey: ['schedule'],
    queryFn: fetchSchedule
  });

  // Handle loading state
  if (isLoading) return <h1>Loading the schedule...</h1>;

  // Handle error state
  if (error) return <h1>{error.message || 'Error loading the schedule'}</h1>;

  console.log('Fetched schedule', schedule);
  // Render content once the data is available
  return (
    <div className="container">
      <Banner title={schedule.title} />
      <CourseList courses={schedule} />
    </div>
  );
};

// QueryClient for managing queries
const queryClient = new QueryClient();

// App component wrapping Main with QueryClientProvider
const App = () => (
  <QueryClientProvider client={queryClient}>
    <Main />
  </QueryClientProvider>
);

export default App;
