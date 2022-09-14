import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
/* import Create from "./components/create/Create";
import Detail from "./components/detalle/Detail";
import Home from "./components/home/Home";
import Nav from "./components/nav/NavBar"; */
import Inicio from "./components/landingPage/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Inicio} />
          {/*       <Route path="/dogs" component={Nav} />
      <Route path="/home" component={Home} />
      <Route path="/detail/:id" component={Detail} />
      <Route path="/create" component={Create} /> */}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
