import { CSSProperties } from 'react';
import './loader.css';

const boxStyle: CSSProperties = {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

function Loader() {
  return (
    <div style={boxStyle}>
      <div className="paw-print-1">
        <div className="pad large" />
        <div className="pad small-1" />
        <div className="pad small-2" />
        <div className="pad small-3" />
        <div className="pad small-4" />
      </div>

      <div className="paw-print-2">
        <div className="pad large" />
        <div className="pad small-1" />
        <div className="pad small-2" />
        <div className="pad small-3" />
        <div className="pad small-4" />
      </div>

      <div className="paw-print-3">
        <div className="pad large" />
        <div className="pad small-1" />
        <div className="pad small-2" />
        <div className="pad small-3" />
        <div className="pad small-4" />
      </div>

      <div className="paw-print-4">
        <div className="pad large" />
        <div className="pad small-1" />
        <div className="pad small-2" />
        <div className="pad small-3" />
        <div className="pad small-4" />
      </div>

      <div className="paw-print-5">
        <div className="pad large" />
        <div className="pad small-1" />
        <div className="pad small-2" />
        <div className="pad small-3" />
        <div className="pad small-4" />
      </div>

      <div className="paw-print-6">
        <div className="pad large" />
        <div className="pad small-1" />
        <div className="pad small-2" />
        <div className="pad small-3" />
        <div className="pad small-4" />
      </div>

      <div className="paw-print-7">
        <div className="pad large" />
        <div className="pad small-1" />
        <div className="pad small-2" />
        <div className="pad small-3" />
        <div className="pad small-4" />
      </div>

      <div className="paw-print-8">
        <div className="pad large" />
        <div className="pad small-1" />
        <div className="pad small-2" />
        <div className="pad small-3" />
        <div className="pad small-4" />
      </div>
    </div>
  );
}

export default Loader;
