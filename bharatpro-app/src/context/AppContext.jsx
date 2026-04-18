import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const workersData = [
  { 
    id: 1, 
    name: 'Rajesh Kumar', 
    role: 'Master Plumber', 
    rating: 4.9, 
    reviews: 120, 
    rate: '₹450/hr', 
    experience: '15 years', 
    tags: ['15 yrs', 'Andheri East'],
    skills: ['Leak Detection', 'Pipe Fitting', 'Water Heater'], 
    verified: true, 
    available: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7P0rlWXdvvTvC7eBLduC5UgCDpNT8bWysEsOj9IkQOhP27Dx-Eso9bJehh7BzbdywafcvzBS8jMZLgEUasE6l7FkUM4tBSVn_MU2v3YmfIVaixKNzVVQAHtQd9OdgsA_8wZ5kxmoPP8eW8rdDlgy5Z1yB29uqtqj1svi1g5usg41och-MLBhJd5nw9rLw1uLPlFSNfWjFaJ4h7JIkeDNgdTTmrnE-04M9iYFBQzbWl7iNjVY0rrJi5fypuWhN5_pYVz3smNWpcWM',
  },
  { 
    id: 2, 
    name: 'Priya Sharma', 
    role: 'Emergency Plumber', 
    rating: 4.7, 
    reviews: 85, 
    rate: '₹300/hr', 
    tags: ['Exp 8yrs', 'Bandra'],
    desc: 'Leak detection, pipe repair, emergency geyser fixing.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfLjeoutX94yYCwFBeiGzOXBxcms_AZOw_gs7tXdUDmX0rtdT87wyqiOe2DdOcXOKUIPBZa3t6PNGvXV4-2_mE9cUIeGIUadjfK_R9C5YlrisVkMQWdWFy7OqhkDo3qYn4yKci55uUuDcjlmNnCTpA0_UTy2vRW7cYpdOHWTLHfW0N3Tg1lplDP8rAFAX3jeaQ17kXDFQpQXRtysioKmEsW-0_Bd6AUxp_Gosb7adPKU6AbJkMm6dmVTNeVsUc5IRtQA6idtCJU6A',
  },
  { 
    id: 3, 
    name: 'Amit Singh', 
    role: 'Electrician', 
    rating: 4.8, 
    reviews: 95, 
    rate: '₹500/hr', 
    tags: ['Licensed', 'Powai'],
    desc: 'Wiring, appliance repair, circuit panel upgrades.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpXmFhSlnRHhqc72_V7o1goJzqBPU-bWyyx32wE2w-I7P03FYEjE8SP7I_RlAc6X1cAxB5pNz52HSHcTxRvt4bjG9AJ-Ap-oWmaGo71yVyHGMEFexnxDDdNco3MuXSMYm2JqYxt9tc_PZJ1f-bXAlwoTiEGrif_i4UvyJAwnzwUsnnG1V0G_dBLymHAKIQOc09iTLF4T6XafGEa3KhKyILnhOoVbEVQ5-izj7tr-foMIGaop25atQ9N_yLp7AvreHPGC7dlpUyCkQ',
  },
  { 
    id: 4, 
    name: 'Suresh Raina', 
    role: 'Carpenter', 
    rating: 4.6, 
    reviews: 62, 
    rate: '₹400/hr', 
    tags: ['Furniture Fix', 'Vashi'],
    desc: 'Modular kitchen install, door repairs, furniture assembly.',
    image: null,
  },
];

export function AppProvider({ children }) {
  const [workers, setWorkers] = useState(workersData);
  const [bookings, setBookings] = useState([
    { id: 'BP-1001', workerId: 1, workerName: 'Rajesh Kumar', status: 'completed', date: 'Yesterday', title: 'Kitchen Sink Leak', amount: 800, clientName: 'You' },
    { id: 'BP-1002', workerId: 1, workerName: 'Rajesh Kumar', status: 'active', date: 'Started 2h ago', title: 'Water Heater Install', amount: 3500, clientName: 'You' },
  ]);
  const [savedWorkers, setSavedWorkers] = useState([]);
  const [cart, setCart] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Mock Users
  const currentUser = { id: 999, name: 'You', role: 'customer' };
  const currentWorkerId = 1; // Simulated logged-in worker

  const addBooking = (booking) => {
    const newBooking = {
      ...booking,
      id: `BP-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
    };
    setBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  const updateBookingStatus = (id, status) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  const toggleSavedWorker = (workerId) => {
    setSavedWorkers(prev => prev.includes(workerId) ? prev.filter(id => id !== workerId) : [...prev, workerId]);
  };

  const updateWorkerAvailability = (workerId, available) => {
    setWorkers(prev => prev.map(w => w.id === workerId ? { ...w, available } : w));
  };

  const addToCart = (item) => setCart(prev => [...prev, item]);
  const clearCart = () => setCart([]);

  const getWorkerMetrics = (workerId) => {
    const workerBookings = bookings.filter(b => b.workerId === workerId);
    return {
      totalEarnings: workerBookings.filter(b => b.status === 'completed').reduce((sum, b) => sum + b.amount, 0),
      pendingJobs: workerBookings.filter(b => b.status === 'pending').length,
      activeJobs: workerBookings.filter(b => b.status === 'active').length,
      completedJobs: workerBookings.filter(b => b.status === 'completed').length,
      requests: workerBookings.filter(b => b.status === 'pending').length,
    };
  };

  return (
    <AppContext.Provider value={{ 
      workers, 
      bookings, 
      savedWorkers,
      cart,
      currentUser,
      currentWorkerId,
      isDarkMode,
      setIsDarkMode,
      addBooking, 
      updateBookingStatus,
      getWorkerMetrics,
      toggleSavedWorker,
      updateWorkerAvailability,
      addToCart,
      clearCart
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
