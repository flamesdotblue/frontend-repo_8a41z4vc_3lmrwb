import React, { useEffect, useMemo, useState } from 'react';
import { Link as LinkIcon, Edit3, Save, QrCode } from 'lucide-react';

const defaultMessage = '“For I know the plans I have for you,” declares the Lord. — Jeremiah 29:11';

const MessageAndLinks = ({ role, message, setMessage }) => {
  const [draft, setDraft] = useState(message || defaultMessage);

  useEffect(() => {
    setDraft(message || defaultMessage);
  }, [message]);

  const canEdit = role === 'joel' || role === 'admin';

  const currentUrl = useMemo(() => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return '';
  }, []);

  const qrSrc = useMemo(() => {
    const data = encodeURIComponent(currentUrl || 'https://example.com');
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${data}`;
  }, [currentUrl]);

  const handleSave = () => {
    setMessage(draft.trim() || defaultMessage);
  };

  return (
    <section className="mx-auto mt-10 w-full max-w-6xl px-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Message Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Main Message</h3>
            {canEdit && (
              <span className="inline-flex items-center gap-2 text-xs text-gray-500">
                <Edit3 size={16} /> Editable by Joel/Admin
              </span>
            )}
          </div>

          {canEdit ? (
            <div className="mt-4">
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                className="min-h-[120px] w-full rounded-lg border border-gray-300 p-3 text-gray-900 shadow-sm focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-200"
              />
              <div className="mt-3 flex items-center justify-between">
                <p className="text-xs text-gray-500">This updates the hero message above.</p>
                <button
                  onClick={handleSave}
                  className="inline-flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white shadow hover:bg-red-600"
                >
                  <Save size={16} /> Save Message
                </button>
              </div>
            </div>
          ) : (
            <p className="mt-4 text-gray-700">{message || defaultMessage}</p>
          )}
        </div>

        {/* Links + QR Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Links & QR</h3>
            <LinkIcon size={18} className="text-gray-500" />
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <a
              href="#stories"
              className="rounded-lg border border-gray-200 px-4 py-3 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Share Your Story
            </a>
            <a
              href="#links"
              className="rounded-lg border border-gray-200 px-4 py-3 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Useful Links
            </a>
          </div>

          <div className="mt-6 grid items-start gap-4 sm:grid-cols-[300px_1fr]">
            <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-3">
              <img src={qrSrc} alt="QR code for this website" className="h-[260px] w-[260px] rounded bg-white p-2 shadow" />
              <a
                href={qrSrc}
                download
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded-md bg-gray-900 px-3 py-2 text-xs font-medium text-white hover:bg-black"
              >
                <QrCode size={14} /> Open / Download for Print
              </a>
              <p className="mt-2 text-center text-xs text-gray-500">Scan or print this QR for business cards.</p>
            </div>
            <div id="links" className="rounded-lg border border-gray-200 p-4">
              <h4 className="text-sm font-semibold text-gray-800">Links</h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a className="text-red-600 hover:underline" href="https://www.bible.com/" target="_blank" rel="noreferrer">
                    Bible.com
                  </a>
                </li>
                <li>
                  <a className="text-red-600 hover:underline" href="https://www.biblegateway.com/" target="_blank" rel="noreferrer">
                    Bible Gateway
                  </a>
                </li>
                <li>
                  <a className="text-red-600 hover:underline" href="https://www.desiringgod.org/" target="_blank" rel="noreferrer">
                    Desiring God
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessageAndLinks;
