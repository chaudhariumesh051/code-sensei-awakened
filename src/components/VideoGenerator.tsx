
import React from 'react';

interface VideoGeneratorProps {
  onVideoGenerated: (video: any) => void;
}

export const VideoGenerator: React.FC<VideoGeneratorProps> = ({ onVideoGenerated }) => {
  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Video generation feature coming soon...
      </p>
    </div>
  );
};
