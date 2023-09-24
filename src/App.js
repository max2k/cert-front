import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Login from "./features/user/Login";


const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [{
      path: '/',
      element: <Login />,
    },
    ],
  }
]
)

function App() {
  return (
     <RouterProvider router={router}/>
  );
}

export default App;
