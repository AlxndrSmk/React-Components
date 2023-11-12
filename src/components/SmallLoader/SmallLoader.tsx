import './SmallLoader.scss';

const SmallLoader: React.FC = () => {
  return (
    <h1 data-testid="small-loader" className="loader">
      <span>L</span>
      <span>O</span>
      <span>A</span>
      <span>D</span>
      <span>I</span>
      <span>N</span>
      <span>G</span>
    </h1>
  );
};

export default SmallLoader;
