import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Recipes from "./components/recipes/recipes";
import ReactDOM from "react-dom/client";
import { datadogRum } from "@datadog/browser-rum";
import Navbar from "./components/nav_bar/nav_bar";
import About from "./components/about/about";
import Services from "./components/services/services";
import config from "./config";

datadogRum.init({
  applicationId: config.DD_APP_ID,
  clientToken: config.DD_CLIENT_TOKEN,
  // `site` refers to the Datadog site parameter of your organization
  // see https://docs.datadoghq.com/getting_started/site/
  site: "us5.datadoghq.com",
  service: "recipe-app",
  env: config.ENVIRONMENT,
  // Specify a version number to identify the deployed version of your application in Datadog
  // version: '1.0.0',
  sessionSampleRate: 100,
  sessionReplaySampleRate: 20,
  trackUserInteractions: true,
  trackResources: true,
  trackLongTasks: true,
  defaultPrivacyLevel: "mask-user-input",
});

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Recipes />,
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/services",
        element: <Services />
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
export default App;
