import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App bg-dark-blue">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="text-dark-purple">
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div className="mt-10 ml-10 text-light-gray">
          Click the following button
        </div>
        <button className="mb-10 mt-10 ml-10 p-2 rounded-lg bg-gold text-dark-purple">
          Click me!
        </button>
      </header>
    </div>
  );
}

export default App;
