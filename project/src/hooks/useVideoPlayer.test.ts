import React from 'react';
import { act, renderHook } from '@testing-library/react';
import useVideoPlayer, { VideoRef } from './useVideoPlayer';

const video: VideoRef = {
  requestFullscreen: jest.fn(),
  pause: jest.fn(),
  play: jest.fn(),
  currentTime: 0,
  duration: 90,
};

const ref: React.MutableRefObject<VideoRef | null> = { current: video };

describe('Hook: useVideoPlayer', () => {
  it('should set isPlaying to true when call togglePlay', () => {
    const { result } = renderHook(() =>
      useVideoPlayer(ref),
    );

    act(() => {
      result.current.togglePlay();
    });

    expect(result.current.playerState.isPlaying).toBe(true);
  });

  it('should set duration when call setVideoDuration', () => {
    const { result } = renderHook(() =>
      useVideoPlayer(ref),
    );

    act(() => {
      result.current.setDuration(30);
    });

    expect(result.current.playerState.duration).toBe('00:00:30');
  });

  it('should call requestFullscreen when user call full screen', () => {
    const { result } = renderHook(() =>
      useVideoPlayer(ref),
    );
    if (ref.current) {
      ref.current.requestFullscreen = jest.fn();
    }

    act(() => {
      result.current.toggleFullScreen();
    });

    expect(ref?.current?.requestFullscreen).toBeCalled();
  });

  it('should update duration while video is playing', () => {
    const { result } = renderHook(() =>
      useVideoPlayer(ref),
    );

    if (ref.current) {
      ref.current.currentTime = 60;
      ref.current.duration = 120;
    }

    act(() => {
      result.current.handleOnTimeUpdate();
    });

    expect(result.current.playerState.duration).toBe('00:01:00');
  });

  it('should stop playing if video ended', () => {
    const { result } = renderHook(() =>
      useVideoPlayer(ref),
    );

    if (ref.current) {
      ref.current.currentTime = 120;
      ref.current.duration = 120;
    }

    act(() => {
      result.current.handleOnTimeUpdate();
    });

    expect(result.current.playerState.isPlaying).toBe(false);
    expect(result.current.playerState.progress).toBe(100);
  });
});
