import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
/* import Create from "./components/create/Create"; */
/* import Detail from "./components/detalle/Detail"; */
import Home from "./components/home/Home";
import Inicio from "./components/landingPage/LandingPage";
import Nav from "./components/nav/NavBar";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Inicio} />
          <Route path="/home" component={Home} />
          <Route path="/" component={Nav} />
          {/*  <Route path="/detail/:id" component={Detail} /> */}
          {/*  <Route path="/create" component={Create} /> */}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
