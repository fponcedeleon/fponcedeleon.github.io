import React, { useState } from "react";
import { ModalComponent } from "components/Modal";
import { Button } from "react-bootstrap";
import { ReactMicComponent } from "components/ReactMic";
import useTranslate from "hooks/useTranslate";

export const VoiceModal = ({ onClose, show, onRecord }) => {
  const t = useTranslate();
  const [recording, setRecording] = useState(false);
  const [record, setRecord] = useState(null);

  const handleConfirm = () => {
    onRecord(record);
    onClose();
  };
  return (
    <ModalComponent
      title={t("components.voiceModal.title")}
      onClose={() => onClose()}
      show={show}
    >
      <div>
        <ReactMicComponent
          recording={recording}
          onStop={(record) => setRecord(record)}
        />
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <div style={{ margin: "10px" }}>
            <Button onClick={() => setRecording(true)} variant="info">
              {t("components.voiceModal.startRecord")}
            </Button>
          </div>
          <div style={{ margin: "10px" }}>
            {" "}
            <Button onClick={() => setRecording(false)} variant="info">
              {t("components.voiceModal.finishRecord")}
            </Button>
          </div>

          <div style={{ margin: "10px" }}>
            <Button onClick={() => handleConfirm()} variant="success">
              {t("components.voiceModal.confirm")}
            </Button>
          </div>
          <div style={{ margin: "10px" }}>
            <Button onClick={() => onClose()} variant="danger">
              {t("components.voiceModal.cancel")}
            </Button>
          </div>
        </div>
      </div>
    </ModalComponent>
  );
};
