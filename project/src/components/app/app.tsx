import MainScreen from '../../pages/main-screen/main-screen';
import { Film } from '../../types/film';

type AppScreenProps = {
  filmPromo: {
    title: string;
    genre: string;
    year: number;
  };
  cards: Film[];
};

function App(props: AppScreenProps): JSX.Element {
  return <MainScreen {...props} />;
}

export default App;
