import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { useState } from 'react';
import logo from './logo.svg';
import './styling/App.css';
import React from 'react';
import Banner from './components/Banner';
import CourseList from './components/CourseList';

// Fetch the schedule data
const fetchSchedule = async () => {
  const url = 'https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php';
  const response = await fetch(url);
  if (!response.ok) throw response;
  return await response.json();
};

// Main component
const Main = () => {
  const { data: schedule, isLoading, error } = useQuery({
    queryKey: ['schedule'],
    queryFn: fetchSchedule
  });

  // Handle loading state
  if (isLoading) return <h1>Loading the schedule...</h1>;

  // Handle error state
  if (error) return <h1>{error.message || 'Error loading the schedule'}</h1>;

  // Render content once the data is available
  return (
    <div className="container">
      <Banner title={schedule.title} />
      <CourseList courses={schedule.courses} />
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
