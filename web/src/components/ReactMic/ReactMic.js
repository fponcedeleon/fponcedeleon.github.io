import React, { useState, useEffect } from 'react';
import { ReactMic } from 'react-mic';

export const ReactMicComponent = ({ onStop, style, recording }) => {
  const [record, setRecord] = useState(false);
  const [recorded, setRecorded] = useState(null);

  useEffect(() => {
    setRecord(recording);
  }, [recording]);
 
  const onStop2 = (recordedBlob) => {
    setRecorded(recordedBlob);
    onStop(recordedBlob);
  }

  return (
    <div>
      <ReactMic
        style={style}
        record={record}
        className="sound-wave"
        onStop={(recordedBlob) => onStop && onStop2(recordedBlob)}
        strokeColor="#000000"
        backgroundColor="#A3CDD6" />
      {recorded && 
        <audio controls>
        <source src={recorded.blobURL} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      }
    </div>
  );
};