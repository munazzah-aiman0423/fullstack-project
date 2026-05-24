import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000")
      .then((res) => {
        setMessage(res.data);
      })
      .catch((err) => {
        console.log(err);
        setMessage("Connection failed");
      });
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>{message}</h1>
    </div>
  );
}

export default App;