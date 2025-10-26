import React, { useEffect, useState } from 'react';
import HeroCover from './components/HeroCover';
import AuthPanel from './components/AuthPanel';
import MessageAndLinks from './components/MessageAndLinks';
import StoriesSection from './components/StoriesSection';

const loadMessage = () => {
  try {
    const raw = localStorage.getItem('mainMessage');
    return raw || '';
  } catch {
    return '';
  }
};

const saveMessage = (text) => {
  localStorage.setItem('mainMessage', text);
};

function App() {
  const [role, setRole] = useState('guest');
  const [message, setMessageState] = useState('');

  useEffect(() => {
    setMessageState(loadMessage());
  }, []);

  const setMessage = (text) => {
    setMessageState(text);
    saveMessage(text);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-gray-50 text-gray-900">
      <HeroCover message={message} />
      <AuthPanel role={role} onChange={setRole} />
      <MessageAndLinks role={role} message={message} setMessage={setMessage} />
      <StoriesSection role={role} />
      <footer className="mx-auto mt-16 max-w-6xl px-6 pb-16 text-center text-sm text-gray-500">
        <p>
          Built with love. “But God demonstrates his own love for us in this: While we were still sinners, Christ died for us.” — Romans 5:8
        </p>
      </footer>
    </div>
  );
}

export default App;
