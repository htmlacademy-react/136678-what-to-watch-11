import { useEffect } from 'react';

import './spinner.css';

type SpinnerProps = {
  isLoading: boolean;
}

function Spinner({ isLoading }: SpinnerProps) {

  useEffect(() => {
    const body = document.querySelector('body');

    if (isLoading) {
      body?.classList.add('overflow-hidden');
    } else {
      body?.classList.remove('overflow-hidden');
    }
  }, [isLoading]);

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
