import React from 'react';
import RollingGallery from './RollingGallery';
import CircularGallery from './CircularGallery';

export default function About() {
  return (
    <div style={{ padding: 20, color: '#e6eef8' }}>
      <h2>About This App</h2>
      <p>
        This is an interactive vegetarian recipe app built with React, Vite,
        React Three Fiber, and Framer Motion.
      </p>
      <p>
        It features multi-page navigation, animated 3D food previews,
        hover/click effects, page transitions, and more!
      </p>

      {/* Added RollingGallery */}
      <RollingGallery autoplay={true} pauseOnHover={true} />

      {/* Added CircularGallery at the bottom */}
      <div style={{ height: '600px', position: 'relative', marginTop: 40 }}>
        <CircularGallery
          bend={3}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollEase={0.02}
        />
      </div>
    </div>
  );
}
