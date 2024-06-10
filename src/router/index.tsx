import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
import {
  Category,
  Create,
  Login,
  Error,
  Brand,
  Settings,
  SingleCategory,
  SingleBrand,
  Product,
  ProductDetail,
  Stock,
} from "@pages";
import MainLayout from "@layout";

export default function Router() {
  const root = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<Login />} />
        <Route path="/signup" element={<Create />} />
        <Route path="/main/*" element={<MainLayout />}>
          <Route index element={<Category />} />
          <Route path="category/:id" element={<SingleCategory />} />
          <Route path="brands" element={<Brand />} />
          <Route path="brands/:id" element={<SingleBrand />} />
          <Route path="product" element={<Product />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="stock" element={<Stock />} />
          <Route path="settings" element={<Settings />} />
          {/* <Route path="*" element={<Error />} /> */}
        </Route>
        <Route path="*" element={<Error />} />
      </Route>
    )
  );

  return <RouterProvider router={root} />;
}
