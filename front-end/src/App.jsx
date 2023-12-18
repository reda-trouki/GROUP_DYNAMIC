import HomePage from "./pages/HomePage";
import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./components/login/login";
import SignUp from "./components/signup/SignUp";
import Courses from "./components/courses/Courses";
import InProgress from "./components/courses/elements/InProgress";
import Completed from "./components/courses/elements/Completed";
import Elements from "./components/courses/elements/Elements";
import Section from "./components/sections/Section";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<SignUp />} />
        {/* <Route path="*" element={<NotFound/>}/> */}
      </Route>
      <Route path="courses" element={<Courses />}>
        <Route path="elements" element={<Elements />}>
          <Route index element={<InProgress />} />
          <Route path="inProgress" element={<InProgress />} />
          <Route path="completed" element={<Completed />} />
        </Route>
        <Route path=":id" element={<Section/>}/>
      </Route>
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={routes} />;
};

export default App;
