import "./App.css";
import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { LoadingScreen, appRoutes } from "./routes";

function App() {
  const routes = useRoutes(appRoutes);

  return (
    <Suspense fallback={<LoadingScreen />}>{routes}</Suspense>
  );
}

export default App;
