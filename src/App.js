import React, { lazy, Suspense, useState } from 'react';
import './styles.css';

const ModuleB = lazy(() => import('./ModuleB'));

const App = () => {

  const [state, setState] = useState(false)
  
  const handleClick1 = () => {
    import('./ModuleA')
    .then(({ ModuleA }) => {
      // Use moduleA
      console.log('moduleA is successfully imported');
    })
    .catch(err => {
      // Handle failure
    });
  };

  const showDetails = () => {
    console.log(state, 'state');
    setState(!state);
  }

  const renderLoader = () => <div className="loader"></div>;

  return (
    <div className="App">
      <button onClick={handleClick1}>Loading moduleA</button>

      { !state && <button onClick={showDetails}>Load moduleB</button> }
      {
        state && (
            <Suspense fallback={renderLoader()}>
              <ModuleB />
            </Suspense>
        )
      }
    </div>
  );
}

export default App;