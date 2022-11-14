import { useState } from 'react';

import FilmOverview from '../film-overview/film-overview';
import FilmDetails from '../film-details/film-details';
import FilmReviews from '../film-reviews/film-reviews';

import { Film } from '../../types/film';
import { Comment } from '../../types/comment';
import { FilmTab } from '../../const';

type FilmTabsProps = {
  film: Film;
  reviews: Comment[];
}

function FilmTabs({ film, reviews }: FilmTabsProps): JSX.Element {
  const [activeTab, setActiveTab] = useState<string>(FilmTab.Overview);

  const renderContent = () => {
    switch (activeTab) {
      case FilmTab.Overview:
        return <FilmOverview film={film} />;
      case FilmTab.Details:
        return <FilmDetails film={film} />;
      case FilmTab.Reviews:
        return <FilmReviews reviews={reviews} />;
    }
  };

  return (
    <>
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {Object.values(FilmTab).map((tab) => (
            <li key={tab} className={`film-nav__item ${activeTab === tab ? 'film-nav__item--active' : ''}`} onClick={() => setActiveTab(tab)}>
              <a className="film-nav__link">{tab}</a>
            </li>
          ))}
        </ul>
      </nav>
      {renderContent()}
    </>
  );
}

export default FilmTabs;
