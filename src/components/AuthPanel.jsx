import React from 'react';

const roles = [
  { key: 'guest', label: 'Continue as Guest' },
  { key: 'joel', label: "Joel's Login" },
  { key: 'admin', label: 'Admin / Preacher' },
];

const AuthPanel = ({ role, onChange }) => {
  return (
    <section className="mx-auto -mt-10 w-full max-w-6xl px-6">
      <div className="rounded-xl border border-gray-200 bg-white/70 p-4 shadow-sm backdrop-blur-sm sm:p-6">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Choose Access</h2>
            <p className="mt-1 text-sm text-gray-600">
              Select a mode to continue. Admin can screen stories. Joel can edit the main message.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {roles.map((r) => (
              <button
                key={r.key}
                onClick={() => onChange(r.key)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  role === r.key
                    ? 'bg-red-500 text-white shadow'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthPanel;
