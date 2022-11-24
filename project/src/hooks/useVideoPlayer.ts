import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { checkFullscreen, enterFullscreen, exitFullscreen } from '../utils';
dayjs.extend(duration);

const useVideoPlayer = (videoPlayer: React.MutableRefObject<HTMLVideoElement | null>) => {
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    progress: 0,
    duration: '',
  });

  useEffect(() => {
    playerState.isPlaying
      ? videoPlayer?.current?.play()
      : videoPlayer?.current?.pause();
  }, [playerState.isPlaying, videoPlayer]);

  const togglePlay = () => {
    setPlayerState({
      ...playerState,
      isPlaying: !playerState.isPlaying,
    });
  };

  const toggleFullScreen = () => {
    if (checkFullscreen()) {
      exitFullscreen();
    } else {
      enterFullscreen(videoPlayer.current);
    }
  };

  const setDuration = (value: number) =>
    setPlayerState({
      ...playerState,
      duration: dayjs.duration(value, 'seconds').format('HH:mm:ss'),
    });

  const handleOnTimeUpdate = () => {
    if (videoPlayer.current !== null) {
      const progress = (videoPlayer.current.currentTime / videoPlayer.current.duration) * 100;
      const timeLeft = Number(videoPlayer.current?.duration) - Number(videoPlayer.current.currentTime);
      if (progress !== 100) {
        return setPlayerState({
          ...playerState,
          progress,
          duration: dayjs.duration(timeLeft, 'seconds').format('HH:mm:ss'),
        });
      }
      setPlayerState({
        ...playerState,
        progress: 100,
        isPlaying: false
      });
    }
  };
  return {
    playerState,
    togglePlay,
    toggleFullScreen,
    handleOnTimeUpdate,
    setDuration,
  };
};

export default useVideoPlayer;
