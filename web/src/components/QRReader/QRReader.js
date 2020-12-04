import React, { useState } from 'react'
import QrReader from 'react-qr-reader';
import { useHistory } from "react-router-dom";

export const QRReader = () => {
  const [result, setResult] = useState(null);
  const history = useHistory();

  const handleScan = (data) => {
    if (data) {
      setResult(data);
      history.push(data);
    }
  }

  const handleError = (error) => {
    console.log(error);
  }

  return (
    <div>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '20%' }}
      />
      <p style={{fontSize: "50px"}}>{result}</p>
    </div>
  );
}