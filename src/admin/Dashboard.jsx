import React, { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { Layout } from './Layout';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { CalendarGrid } from './CalendarGrid';

dayjs.locale('fr');

const Dashboard = () => {
  const [startDate, setStartDate] = useState(dayjs('2025-07-10'));

  const schedule = [
    { title: 'Podcast', start: '08:00', end: '09:00', day: '2025-07-10', color: 'bg-yellow-200', user: 'David Hidoo' },
    { title: 'Podcast', start: '09:00', end: '12:00', day: '2025-07-10', color: 'bg-orange-200', user: 'David Hidoo' },
    { title: 'Podcast', start: '12:00', end: '13:00', day: '2025-07-10', color: 'bg-purple-200', user: 'David Hidoo' },
    { title: 'Podcast', start: '08:00', end: '09:00', day: '2025-07-12', color: 'bg-green-200', user: 'David Hidoo' },
  ];

  const getWeekDays = () => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = startDate.add(i, 'day');
      return {
        date: date.format('YYYY-MM-DD'),
        label: date.format('D'),
        day: date.format('dddd'),
      };
    });
  };

  const days = getWeekDays();
  const hours = Array.from({ length: 13 }, (_, i) => `${(8 + i).toString().padStart(2, '0')}:00`);

  const goToPreviousWeek = () => setStartDate(startDate.subtract(7, 'day'));
  const goToNextWeek = () => setStartDate(startDate.add(7, 'day'));

  return (
    <Layout 
      sidebar={<Sidebar />}
      header={
        <Header 
          startDate={startDate}
          goToPreviousWeek={goToPreviousWeek}
          goToNextWeek={goToNextWeek} />}>
      <CalendarGrid
        days={days}
        hours={hours}
        schedule={schedule}
        startDate={startDate} />
    </Layout>
  );
};

export default Dashboard;
