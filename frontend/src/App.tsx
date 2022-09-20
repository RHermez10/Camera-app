import './App.css';
import Camera from './Components/camera/Camera';
import AccountForm from './Components/signup-login/AccountForm';

function App() {
  return (
    <div className="App">
      <AccountForm buttonText='Sign Up'/>
      <Camera />

    </div>
  );
};

export default App;
