
import { Provider } from "react-redux";
import {
  Route,
  createBrowserRouter,
  createRoutesFromChildren,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./components/login/login";
import SignUp from "./components/signup/SignUp";
import Courses from "./components/courses/Courses";
import InProgress from "./components/courses/elements/InProgress";
import Completed from "./components/courses/elements/Completed";
import Elements from "./components/courses/elements/Elements";
import Section from "./components/sections/Section";
import { Navigate } from "react-router-dom";
import { store, setAccessToken } from "./store/store";
import { useSelector } from "react-redux";
import "typeface-roboto";
import './App.css';
function ProtectedRoute({ children }) {
  const token = useSelector((state) => state.accessToken);

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
}
const routes = createBrowserRouter(
  createRoutesFromChildren(
    <Route path="/">
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthLayout />}>
        <Route
          path="login"
          element={<Login setAccessToken={setAccessToken} />}
        />
        <Route
          path="sign-up"
          element={<SignUp setAccessToken={setAccessToken} />}
        />
      </Route>
      <Route
        path="courses"
        element={
          <ProtectedRoute>
            <Courses setAccessToken={setAccessToken} />
          </ProtectedRoute>
        }
      >
        <Route path="elements" element={<Elements />}>
          <Route index element={<InProgress />} />
          <Route path="inProgress" element={<InProgress />} />
          <Route path="completed" element={<Completed />} />
        </Route>
        <Route path=":id" element={<Section />} />
      </Route>
    </Route>
  )
);
const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  );
};

export default App;
