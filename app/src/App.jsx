import { useEffect, useState } from "react";
import axios from "axios";
import TastingList from "./components/TastingList/TastingList";

function App() {
  const [tastings, setTastings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/tastings")
      .then(({ data }) => setTastings(data))
      .catch(console.error);
  }, []);

  return (
    <>
      <h1>Whiskey tasting</h1>

      <TastingList tastings={tastings} />
    </>
  );
}

export default App;
