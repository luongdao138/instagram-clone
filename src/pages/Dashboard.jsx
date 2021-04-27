import React from 'react';
import { useEffect } from 'react';
import Timeline from '../components/Timeline';
import Sidebar from '../components/sidebar';
import Header from '../components/Header';
import '../styles/dashboard.css';

const Dashboard = () => {
  useEffect(() => {
    document.title = 'Instagram';
  }, []);
  return (
    <div>
      <Header />

      <main className='dashboard'>
        <div className='dashboard__left'>
          <Timeline />
        </div>
        <div className='dashboard__right'>
          <Sidebar />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
