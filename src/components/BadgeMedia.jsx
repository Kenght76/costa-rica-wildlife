import React, { useState, useEffect } from 'react';

export default function BadgeMedia({ badge, size = 400, style = {} }) {
  const [mediaType, setMediaType] = useState('loading');
  const [videoFailed, setVideoFailed] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [randomVariant] = useState(() => Math.random() < 0.5 ? '' : '2');
  
  const videoPath = `/badges/videos/${badge.id}.mp4`;
  
  const getImagePath = () => {
    if (badge.id === 'vervet_mischief') {
      return `/badges/moments/vervet_mischief${randomVariant}.png`;
    }
    return badge.image;
  };
  const imagePath = getImagePath();
  
  useEffect(() => {
    setVideoFailed(false);
    setImageFailed(false);
    setMediaType('loading');
  }, [badge.id]);
  
  // Try video first
  if (mediaType === 'loading' && !videoFailed) {
    return (
      <>
        <video
          src={videoPath}
          autoPlay loop muted playsInline
          onCanPlay={() => setMediaType('video')}
          onError={() => setVideoFailed(true)}
          style={{ width: size, height: size, objectFit: 'contain', display: 'none', ...style }}
        />
        <div style={{ width: size, height: size, ...style }} />
      </>
    );
  }
  
  // Video confirmed working
  if (mediaType === 'video') {
    return (
      <video
        src={videoPath}
        autoPlay loop muted playsInline
        style={{ width: size, height: size, objectFit: 'contain', ...style }}
      />
    );
  }
  
  // Try image if video failed
  if (videoFailed && !imageFailed && imagePath) {
    return (
      <>
        <img
          src={imagePath}
          alt={badge.name}
          onLoad={() => setMediaType('image')}
          onError={() => setImageFailed(true)}
          style={{ width: size, height: size, objectFit: 'contain', display: mediaType === 'image' ? 'block' : 'none', ...style }}
        />
        {mediaType !== 'image' && (
          <div style={{ fontSize: size * 0.16, ...style }}>{badge.icon}</div>
        )}
      </>
    );
  }
  
  // Image confirmed working
  if (mediaType === 'image') {
    return (
      <img
        src={imagePath}
        alt={badge.name}
        style={{ width: size, height: size, objectFit: 'contain', ...style }}
      />
    );
  }
  
  // Fallback to emoji
  return <div style={{ fontSize: size * 0.16, ...style }}>{badge.icon}</div>;
}
