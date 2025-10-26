import React from 'react';
import Spline from '@splinetool/react-spline';

const HeroCover = ({ message }) => {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/zhZFnwyOYLgqlLWk/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Soft gradient overlay for readability without blocking interaction */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/80" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center justify-center px-6 pt-24 pb-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white/70 px-3 py-1 text-xs font-medium text-red-600 shadow-sm backdrop-blur">
          <span>Faith · Hope · Love</span>
        </div>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          A Place to Share Your Story
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-gray-700 sm:text-lg">
          {message || 'Welcome. Share your journey and be encouraged by others.'}
        </p>
        <div className="mt-8 h-1 w-24 rounded bg-red-500/70" />
        {/* Subtle cross motif */}
        <div className="mt-6 flex items-center gap-2 text-sm text-gray-600">
          <span className="inline-block h-5 w-[2px] bg-gray-400" />
          <span className="inline-block h-[2px] w-5 bg-gray-400" />
          <span className="sr-only">Cross motif</span>
        </div>
      </div>
    </section>
  );
};

export default HeroCover;
