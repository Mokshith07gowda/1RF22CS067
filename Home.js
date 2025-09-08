import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  const { user, logout } = useAuth();
  const [url, setUrl] = useState('');
  const [urls, setUrls] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const shortenUrl = () => {
    if (!url) return;
    setLoading(true);
    setTimeout(() => {
      const short = `short.ly/${uuidv4().slice(0, 5)}`;
      setUrls([...urls, { id: uuidv4(), original: url, short }]);
      setUrl('');
      setLoading(false);
    }, 1000);
  };

  const deleteUrl = (id) => {
    setUrls(urls.filter(u => u.id !== id));
  };

  const filteredUrls = urls.filter(u => u.original.includes(search) || u.short.includes(search));

  if (!user) return <p>Please login to use the app.</p>;

  return (
    <div style={{ padding: '1rem', maxWidth: '600px', margin: 'auto' }}>
      <h2>Welcome, {user.username}</h2>
      <button onClick={logout}>Logout</button>
      <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter URL" />
      <button onClick={shortenUrl}>Shorten</button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search URLs" />
      <ul>
        {filteredUrls.map(u => (
          <li key={u.id}>
            <p>Original: {u.original}</p>
            <p>Short: {u.short}</p>
            <button onClick={() => deleteUrl(u.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;