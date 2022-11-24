export const enterFullscreen = (element: HTMLElement | null): void => {
  if (!element) {
    return;
  }

  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
};

export const exitFullscreen = (): void => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
};

export const checkFullscreen = (): Element | null =>
  document.fullscreenElement ||
  document.mozFullScreenElement ||
  document.webkitFullscreenElement ||
  document.msFullscreenElement;
