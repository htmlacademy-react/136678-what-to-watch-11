import React, { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import NotFoundScreen from '../not-found-screen/not-found-screen';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFilm, getFilmDataLoadingStatus } from '../../store/film-process/selectors';
import { getFilmAction } from '../../store/api-actions';
import useVideoPlayer from '../../hooks/useVideoPlayer';
import Spinner from '../../components/spinner/spinner';


function PlayerScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const film = useAppSelector(getFilm);
  const isLoading = useAppSelector(getFilmDataLoadingStatus);

  const videoElement = useRef<HTMLVideoElement | null>(null);
  const {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    toggleFullScreen,
    setDuration,
  } = useVideoPlayer(videoElement);

  useEffect(() => {
    if (params.id) {
      dispatch(getFilmAction(params.id));
    }
  }, [dispatch, params.id]);

  if (!film && !isLoading) {
    return <NotFoundScreen />;
  }

  const onExitButtonClickHandler = () => {
    if (film) {
      const path = `/films/${film.id}`;
      navigate(path);
    }
  };

  return (
    <div className="player">
      <Spinner isLoading={isLoading} />
      <Helmet>
        <title>WTW. Player</title>
      </Helmet>
      <video
        ref={videoElement}
        src={film?.previewVideoLink}
        className="player__video"
        poster={film?.previewImage}
        onTimeUpdate={handleOnTimeUpdate}
        onLoadedData={() => {
          if (videoElement.current?.duration) {
            setDuration(videoElement.current?.duration);
          }
        }}
      />

      <button onClick={onExitButtonClickHandler} type="button" className="player__exit">Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={playerState.progress} max="100" />
            <div className="player__toggler" style={{left: `${playerState.progress}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{playerState.duration}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={togglePlay}>
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref={playerState.isPlaying ? '#pause' : '#play-s'} />
            </svg>
            <span>{playerState.isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <div className="player__name">{film?.name}</div>

          <button type="button" className="player__full-screen" onClick={toggleFullScreen}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen" />
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlayerScreen;
