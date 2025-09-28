
import React, { useState, useEffect } from 'react';

const ClockIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CalendarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);


const App: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [futureTime, setFutureTime] = useState<Date | null>(null);

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const calculateFutureTime = () => {
    const newFutureTime = new Date(new Date().getTime() + 16 * 60 * 60 * 1000);
    setFutureTime(newFutureTime);
  };

  const formatDateTime = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year} / ${month} / ${day}  ${hours}:${minutes}:${seconds}`;
  };

  return (
    <main className="bg-gradient-to-br from-gray-900 to-slate-800 text-white min-h-screen flex flex-col items-center justify-center font-sans p-4 antialiased">
      <div className="w-full max-w-lg bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl p-8 text-center border border-white/10">
        
        <div className="flex justify-center items-center gap-3 mb-4">
          <ClockIcon className="w-10 h-10 text-cyan-400" />
          <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            16時間後タイマー
          </h1>
        </div>

        <p className="text-gray-400 mb-8">現在の時刻から16時間後の日時を計算します。</p>

        <div className="bg-black/20 rounded-lg p-6 mb-8 border border-white/10 shadow-inner">
          <p className="text-lg text-gray-300 mb-2">現在時刻</p>
          <p className="text-4xl font-mono tracking-wider">{formatDateTime(currentTime)}</p>
        </div>

        <button
          onClick={calculateFutureTime}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-4 px-6 rounded-lg text-xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-300/50 shadow-lg"
        >
          <span className="flex items-center justify-center gap-2">
            <CalendarIcon className="w-6 h-6" />
            16時間後を計算する
          </span>
        </button>

        {futureTime && (
          <div className="mt-8 bg-green-500/10 border border-green-400/30 rounded-lg p-6 animate-fade-in">
            <p className="text-lg text-green-300 mb-2">16時間後の予定時刻</p>
            <p className="text-4xl font-mono tracking-wider text-green-200">
              {formatDateTime(futureTime)}
            </p>
          </div>
        )}
      </div>
      <footer className="absolute bottom-5 text-gray-600 text-sm">
        Powered by React &amp; Tailwind CSS
      </footer>
    </main>
  );
};

export default App;
