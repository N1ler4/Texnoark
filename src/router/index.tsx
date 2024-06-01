import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
import { Create, Login } from "@pages";
import MainLayout from "@layout"

export default function Router() {
  const root = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<Login/>}/>
        <Route path="/signup" element={<Create/>}/>
        <Route path="/main/*" element={<MainLayout/>}>
          
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={root} />;
}
