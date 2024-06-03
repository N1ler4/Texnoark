import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
import { Category, Create, Login , Error, Brand} from "@pages";
import MainLayout from "@layout"

export default function Router() {
  const root = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<Login/>}/>
        <Route path="/signup" element={<Create/>}/>
        <Route path="/main/*" element={<MainLayout/>}>
          <Route index element={<Category/>}/>
          <Route path="brands" element={<Brand/>}/>
        </Route>
        <Route path="*" element={<Error/>}/>
      </Route>
    )
  );

  return <RouterProvider router={root} />;
}
