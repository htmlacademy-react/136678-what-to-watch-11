import './spinner.css';

type SpinnerProps = {
  isLoading: boolean;
}

function Spinner({ isLoading }: SpinnerProps) {
  if (!isLoading) {
    return null;
  }

  return (
    <div className="spinner-bg">
      <div className="spinner">
        {Array.from({ length: 8}, (_, i) => <span key={i + 1} className={`ball-${ i + 1}`} />)}
      </div>
    </div>
  );
}

export default Spinner;
