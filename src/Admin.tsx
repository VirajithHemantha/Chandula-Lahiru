import React, { useState } from 'react';

const PREFIXES = ['Mr.', 'Mrs.', 'Mr. & Mrs.', 'Family', 'Dear', 'Miss'];
const SUFFIX_OPTIONS = [
  { label: 'Auto (Based on Prefix)', value: 'auto' },
  { label: 'ඔබට (Single)', value: 'single' },
  { label: 'ඔබ දෙපළට (Couple)', value: 'couple' },
  { label: 'ඔබ සැමට (Family)', value: 'family' }
];

export default function Admin() {
  const [prefix, setPrefix] = useState('Mr.');
  const [guestName, setGuestName] = useState('');
  const [suffix, setSuffix] = useState('auto');
  const [generatedLink, setGeneratedLink] = useState('');

  const generateLink = () => {
    if (!guestName.trim()) {
      alert("Please enter a guest name.");
      return;
    }
    const baseUrl = window.location.origin;
    const url = new URL(baseUrl);
    url.searchParams.set("prefix", prefix);
    url.searchParams.set("name", guestName.trim());
    if (suffix !== 'auto') {
      url.searchParams.set("suffix", suffix);
    }
    setGeneratedLink(url.toString());
  };

  const getFullMessage = () => {
    return `Dear ${prefix} ${guestName} ❤️

With joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.

Please view our wedding invitation and all the event details through the link below 🌐:

${generatedLink}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

With love,
❤️ Lahiru & Chandula`;
  };

  const copyLink = async () => {
    if (!generatedLink) return;
    try {
      await navigator.clipboard.writeText(generatedLink);
      alert("Link copied to clipboard!");
    } catch (err) {
      alert("Failed to copy link");
    }
  };

  const copyFullMessage = async () => {
    if (!generatedLink) return;
    try {
      await navigator.clipboard.writeText(getFullMessage());
      alert("Full message copied to clipboard!");
    } catch (err) {
      alert("Failed to copy full message");
    }
  };

  return (
    <div className="h-[100dvh] w-full overflow-y-auto bg-slate-50 p-6 md:p-12">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden mx-auto">
        <div className="bg-[#8c6b2b] p-6 text-center text-white">
          <h1 className="text-2xl md:text-3xl font-bold tracking-widest">INVITATION GENERATOR</h1>
          <p className="opacity-80 mt-2 text-sm tracking-widest">Lahiru & Chandula's Wedding</p>
        </div>

        <div className="p-8 space-y-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="space-y-2 md:col-span-3">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Prefix</label>
                <select
                  value={prefix}
                  onChange={(e) => setPrefix(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-all"
                >
                  {PREFIXES.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2 md:col-span-6">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Guest Name</label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Sanjaya"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-all"
                />
              </div>

              <div className="space-y-2 md:col-span-3">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Sinhala Text</label>
                <select
                  value={suffix}
                  onChange={(e) => setSuffix(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-all"
                >
                  {SUFFIX_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={generateLink}
              className="w-full bg-black text-white py-4 rounded-xl font-bold tracking-widest hover:bg-[#8c6b2b] transition-colors"
            >
              GENERATE LINK
            </button>
          </div>

          {generatedLink && (
            <div className="pt-8 border-t border-slate-100 space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Generated Link</label>
                <div className="flex gap-4">
                  <input
                    type="text"
                    readOnly
                    value={generatedLink}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-500 font-mono text-sm"
                  />
                  <button
                    onClick={copyLink}
                    className="px-6 bg-[#f0f0f0] text-slate-700 font-bold rounded-xl hover:bg-[#e0e0e0] transition-colors whitespace-nowrap"
                  >
                    Copy Link Only
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Message Preview</label>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-slate-700 whitespace-pre-wrap font-sans text-sm leading-relaxed">
                  {getFullMessage()}
                </div>
                <button
                  onClick={copyFullMessage}
                  className="w-full mt-4 bg-[#8c6b2b] text-white py-4 rounded-xl font-bold tracking-widest hover:bg-[#d4af37] transition-colors"
                >
                  COPY FULL MESSAGE
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
