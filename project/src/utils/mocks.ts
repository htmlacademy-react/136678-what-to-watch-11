import { date, image, internet, lorem, music, name, random } from 'faker';
import { Film } from '../types/film';
import { Comment } from '../types/comment';
import { UserInfo } from '../types/user-info';

const getRandomNumber = (max: number): number => Math.floor(Math.random() * max);
const getRandomColor = () => Math.floor(Math.random() * 16777215).toString(16);
const getRandomFullName = () => `${ name.firstName() } ${ name.lastName() }`;
const getRandomDate = (start: Date, end: Date): number => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).getFullYear();

export const makeFakeFilm = (): Film => ({
  id: getRandomNumber(100),
  name: random.words(3),
  posterImage: image.imageUrl(),
  previewImage: image.imageUrl(),
  backgroundImage: image.imageUrl(),
  backgroundColor: getRandomColor(),
  videoLink: image.imageUrl(),
  previewVideoLink: image.imageUrl(),
  description: lorem.paragraph(),
  rating: getRandomNumber(10),
  scoresCount: getRandomNumber(1000),
  director: getRandomFullName(),
  starring: Array.from({ length: 3 }, getRandomFullName),
  runTime: getRandomNumber(240),
  genre: music.genre(),
  released: getRandomDate(new Date(1970, 0, 1), new Date()),
  isFavorite: Math.random() < 0.5,
} as Film);

export const makeFakeFilmComment = (): Comment => ({
  comment: lorem.sentence(),
  date: String(date.recent()),
  id: getRandomNumber(100),
  rating: getRandomNumber(10),
  user: {
    id: getRandomNumber(1000),
    name: getRandomFullName(),
  }
} as Comment);

export const makeFakeUser = (): UserInfo => ({
  id: getRandomNumber(1000),
  avatarUrl: image.imageUrl(),
  email: internet.email(),
  token: random.alpha({ count: 10 }),
} as UserInfo);
