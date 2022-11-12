function Spinner() {
  return (
    <div className="spinner">
      {Array.from({ length: 8}, (_, i) => <span key={i + 1} className={`ball-${ i + 1}`} />)}
    </div>
  );
}

export default Spinner;
