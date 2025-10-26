import React, { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Clock, Flag, Trash2, User } from 'lucide-react';

const loadStories = () => {
  try {
    const raw = localStorage.getItem('stories');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveStories = (stories) => {
  localStorage.setItem('stories', JSON.stringify(stories));
};

const StoriesSection = ({ role }) => {
  const [stories, setStories] = useState([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    setStories(loadStories());
  }, []);

  useEffect(() => {
    saveStories(stories);
  }, [stories]);

  const approved = useMemo(() => stories.filter((s) => s.status === 'approved'), [stories]);
  const pending = useMemo(() => stories.filter((s) => s.status === 'pending'), [stories]);

  const submitStory = () => {
    if (!text.trim()) return;
    const newStory = {
      id: crypto.randomUUID(),
      name: name.trim() || 'Anonymous',
      text: text.trim(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setStories((prev) => [newStory, ...prev]);
    setName('');
    setText('');
  };

  const approve = (id) => setStories((prev) => prev.map((s) => (s.id === id ? { ...s, status: 'approved' } : s)));
  const reject = (id) => setStories((prev) => prev.filter((s) => s.id !== id));

  return (
    <section id="stories" className="mx-auto mt-10 w-full max-w-6xl px-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Public submission */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">Share Your Story</h3>
          <p className="mt-1 text-sm text-gray-600">
            Encouragement from real journeys. Submissions are screened before publishing.
          </p>
          <div className="mt-4 grid gap-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (optional)"
              className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-200"
            />
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write your testimony or encouragement..."
              className="min-h-[120px] w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-200"
            />
            <button
              onClick={submitStory}
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black"
            >
              Submit
            </button>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-semibold text-gray-800">Recent Stories</h4>
            <ul className="mt-3 space-y-3">
              {approved.length === 0 && (
                <li className="text-sm text-gray-500">No stories yet. Be the first to share.</li>
              )}
              {approved.map((s) => (
                <li key={s.id} className="rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center gap-2 text-xs text-green-600">
                    <CheckCircle2 size={16} /> Approved
                  </div>
                  <p className="mt-2 text-gray-800">{s.text}</p>
                  <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                    <User size={14} /> {s.name} · {new Date(s.createdAt).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Admin moderation */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Admin Moderation</h3>
            <span className={`rounded-full px-2 py-1 text-xs ${
              role === 'admin' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-gray-50 text-gray-600 border border-gray-200'
            }`}>
              {role === 'admin' ? 'Admin Mode' : 'View Only'}
            </span>
          </div>
          {role !== 'admin' && (
            <p className="mt-2 text-sm text-gray-600">
              Sign in as Admin to approve or remove pending stories.
            </p>
          )}

          <ul className="mt-4 space-y-3">
            {pending.length === 0 && (
              <li className="flex items-center gap-2 rounded-lg border border-gray-200 p-4 text-sm text-gray-600">
                <Clock size={16} className="text-gray-400" /> No stories pending review.
              </li>
            )}
            {pending.map((s) => (
              <li key={s.id} className="rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-2 text-xs text-amber-700">
                  <Flag size={16} /> Pending Review
                </div>
                <p className="mt-2 text-gray-800">{s.text}</p>
                <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                  <User size={14} /> {s.name} · {new Date(s.createdAt).toLocaleString()}
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <button
                    disabled={role !== 'admin'}
                    onClick={() => approve(s.id)}
                    className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm ${
                      role === 'admin' ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <CheckCircle2 size={16} /> Approve
                  </button>
                  <button
                    disabled={role !== 'admin'}
                    onClick={() => reject(s.id)}
                    className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm ${
                      role === 'admin' ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Trash2 size={16} /> Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default StoriesSection;
