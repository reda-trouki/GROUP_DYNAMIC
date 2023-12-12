import HomePage from "./pages/HomePage";
import "./App.css";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./components/login/login";

const routes = createBrowserRouter(
  createRoutesFromElements(
      <Route path="/">
        <Route path="/" element={<HomePage/>}/>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login/>} />
        </Route>
      </Route>
  )
);

const App = () =>{
  return (
    <RouterProvider router={routes}/>
  )
}

export default App;
