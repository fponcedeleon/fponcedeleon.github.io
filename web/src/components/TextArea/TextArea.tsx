import React, { useState, useEffect } from "react";
import "./TextArea.css";
import { Micro } from "../UI/Microphone/index";
import { Button } from "react-bootstrap";
import { VoiceModal } from "../VoiceModal";
import { ReactMicComponent } from "../ReactMic";
import { faRecordVinyl } from "../../../node_modules/@fortawesome/free-solid-svg-icons";

type Props = {
  name: string;
  placeholder?: string;
  rows?: number;
  onChange: Function;
  includeMicro: boolean;
  onRecord: Function;
  value: string;
};

type BlobProps = {
  blobURL: string;
};

export const TextArea = ({
  name,
  placeholder,
  rows,
  onChange,
  includeMicro,
  onRecord,
  value,
}: Props) => {
  const [data, setData] = useState(value);

  useEffect(() => {
    setData(value);
  }, [value]);

  return (
    <div className="input-group area-container">
      <textarea
        className="form-control"
        aria-label="With textarea"
        onChange={(e) => onChange(e)}
        placeholder={placeholder}
        value={data}
      ></textarea>
      {includeMicro && (
        <MicroComponent onRecord={(record: any) => onRecord(record)} />
      )}
    </div>
  );
};

const MicroComponent = ({ onRecord }: any) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Button onClick={() => setShowModal(true)}>
        <Micro size="lg" />
      </Button>
      <VoiceModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onRecord={(record: any) => onRecord(record)}
      />
    </>
  );
};
