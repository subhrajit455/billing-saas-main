import App from "@/App";
import {
  AddCustomer,
  // AddLedger,
  AuthLayout,
  Dashboard,
  FetchCustomer,
  // LeadgerLayout,
  Login,
  Register,
  // ViewLeadger,
  AddCategories ,
  FetchCategories,
} from "@/pages";
import AddCategory from "@/pages/Categories/AddCategory";
import AddProduct from "@/pages/Product/AddProduct";
import FetchProducts from "@/pages/Product/FetchProducts";
// import from "@/pages/Categories/AddCategories";
// import FetchCategories from "@/pages/Categories/FetchCategories";
import { createBrowserRouter } from "react-router";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "add-customer",
        element: <AddCustomer />,
      },
      {
        path: "customer",
        element: <FetchCustomer />,
      },
      {
      path: "categories",
      element: <FetchCategories />,
      },
      {
        path: "add-categories",
        element: <AddCategory />,
        },
      {
        path: "categories",
        element: <FetchCategories />,
        },
      
        {
          path: "products",
          element: <FetchProducts />,
          },
          {
            path: "add-product",
            element: <AddProduct />,
            },
    
      // {
      //   path: "ledger",
      //   element: <LeadgerLayout />,
      //   children: [
      //     {
      //       path: "",
      //       element: <ViewLeadger />,
      //     },
      //     {
      //       path: "add",
      //       element: <AddLedger />,
      //     },
      //   ],
      // },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
