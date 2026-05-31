import { Route, Routes } from "react-router-dom";
import EventListPage from "./pages/EventListPage";
import EventDetailPage from "./pages/EventDetailPage";
import CreateEventPage from "./pages/CreateEventPage";
import EditEventPage from "./pages/EditEventPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<EventListPage />} />

      <Route path="/events/:id" element={<EventDetailPage />} />

      <Route path="/create-event" element={<CreateEventPage />} />

      <Route path="/edit-event/:id" element={<EditEventPage />} />
    </Routes>
  );
}

export default App;
