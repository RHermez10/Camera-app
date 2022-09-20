import './App.css';
import Camera from './Components/camera/Camera';
import Login from './Components/signup-login/Login';
import SignUp from './Components/signup-login/SignUp';

function App() {
  return (
    <div className="App">
      <h2>Sign up:</h2>
      <SignUp />
      <h2>Log in:</h2>
      <Login />
      <h2>Camera</h2>
      <Camera />

    </div>
  );
};

export default App;
