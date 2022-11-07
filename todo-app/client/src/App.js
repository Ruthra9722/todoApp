import logo from './logo.svg';
import './App.css';
import Login from './componants/Login'
import userContext from './context';
import Register from './componants/Register'
import Profile from './componants/Profile'
import AddTodo from './componants/AddActivity'
import {HashRouter, Route, Routes } from "react-router-dom";
import StopWatch from './componants/Stopwatch';

function App() {
  return (
    <div className="App">
       <HashRouter>
    <userContext.Provider value={{auth:null,user:null}}>
    <Routes>
      <Route exact path='/' element={<Login />}></Route>
      <Route exact path='/register' element={<Register />}></Route>
      <Route exact path='/profile' element={<Profile />}></Route>
      <Route exact path='/add' element={<AddTodo />}></Route>
    </Routes>
    </userContext.Provider>
   </HashRouter>
{/* <StopWatch /> */}
    </div>
  );
}

export default App;
