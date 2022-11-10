type ShowMoreButtonProps = {
  onClick(): void;
};

function ShowMoreButton({ onClick }: ShowMoreButtonProps): JSX.Element {
  return (
    <div className="catalog__more" onClick={onClick}>
      <button className="catalog__button" type="button">Show more</button>
    </div>
  );
}

export default ShowMoreButton;
