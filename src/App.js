import logo from './logo.svg';
import './App.css';

const {ipcRenderer} = window.require('electron')
function App() {
  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={()=>{
         ipcRenderer.send('asynchronous-message', 'ping')
         }}>Com</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
