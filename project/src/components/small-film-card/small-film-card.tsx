import { useEffect, useRef } from 'react';

import { Link } from 'react-router-dom';

import { Film } from '../../types/film';

type SmallFilmCardProps = {
  film: Film;
  isActive: boolean;
  setActiveId: (id: number | null) => void;
};

function SmallFilmCard({ film, isActive, setActiveId }: SmallFilmCardProps): JSX.Element {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  let timerId: NodeJS.Timeout | undefined = undefined;

  useEffect(() => {
    if (videoRef.current === null) {
      return;
    }

    if (isActive) {
      videoRef.current.play();
      return;
    }

    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    videoRef.current.load();
  }, [isActive]);

  const handlerMouseOver = () => {
    timerId = setTimeout(() => setActiveId(film.id), 1000);
  };

  const handlerMouseOut = () => {
    if (timerId) {
      clearTimeout(timerId);
    }

    setActiveId(null);
  };

  return (
    <article className="small-film-card catalog__films-card" onMouseOver={handlerMouseOver} onMouseOut={handlerMouseOut}>
      <Link to={`/films/${film.id}`} className="small-film-card__link">
        <video height="175" ref={videoRef} src={film.previewVideoLink} muted poster={film.previewImage} />
        <h3 className="small-film-card__title">
          {film.name}
        </h3>
      </Link>
    </article>
  );
}

export default SmallFilmCard;
