import React, { useEffect } from "react";

function GoogleMap({ latitude, longitude }) {
  useEffect(() => {
    const iframeData = document.getElementById("iframeId");

    if (latitude && longitude) {
      iframeData.src = `https://maps.google.com/maps?q=${latitude},${longitude}&hl=en&output=embed`;
    }
  }, [latitude, longitude]);

  return (
    <div>
      <iframe id="iframeId" height="500px" width="100%"></iframe>
    </div>
  );
}

export default GoogleMap;
