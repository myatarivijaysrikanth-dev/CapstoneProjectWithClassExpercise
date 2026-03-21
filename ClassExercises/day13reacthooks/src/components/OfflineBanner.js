import { useState, useEffect } from "react";

function OfflineBanner() {

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {

    const online = () => setIsOnline(true);
    const offline = () => setIsOnline(false);

    window.addEventListener("online", online);
    window.addEventListener("offline", offline);

    return () => {
      window.removeEventListener("online", online);
      window.removeEventListener("offline", offline);
    };

  }, []);

  if (isOnline) return null;

  return (
    <div style={{
      background:"red",
      color:"white",
      padding:"10px",
      textAlign:"center"
    }}>
      ⚠ You are Offline
    </div>
  );
}

export default OfflineBanner;