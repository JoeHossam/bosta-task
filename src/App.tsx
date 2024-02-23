import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AppWrapper from "./pages/AppWrapper";
import TrackingPage from "./pages/TrackingPage";
import { useTranslation } from "react-i18next";

function App() {
  const { i18n } = useTranslation();
  return (
    <Router>
      <Routes>
        <Route path="/:lang/:shipmentNumber" element={<AppWrapper />}>
          <Route index element={<TrackingPage />} />
        </Route>
        <Route
          path="*"
          element={<Navigate to={`/${i18n.language}/7234258`} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
