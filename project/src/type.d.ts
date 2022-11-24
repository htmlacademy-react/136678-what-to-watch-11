type ExitFullscreen = typeof document.exitFullscreen
type RequestFullscreen = typeof document.documentElement.requestFullscreen

interface Document {
  webkitExitFullscreen: ExitFullscreen;
  mozCancelFullScreen: ExitFullscreen;
  msExitFullscreen: ExitFullscreen;
  msFullscreenElement: Element;
  mozFullScreenElement: Element;
  webkitFullscreenElement: Element;
}

interface HTMLElement {
  webkitRequestFullscreen: RequestFullscreen;
  mozRequestFullScreen: RequestFullscreen;
  msRequestFullscreen: RequestFullscreen;
}
