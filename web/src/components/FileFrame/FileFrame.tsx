import "./FileFrame.css";
import { X } from "react-bootstrap-icons";
import { File } from "types";
import PDFViewer from "pdf-viewer-reactjs";
import React, { useState } from "react";
import { FileEarmarkTextFill } from "react-bootstrap-icons";
// This component is introduced
// import FileViewer from 'react-file-viewer';


interface IProps {
  file: File;
  onClick?: Function;
  onClose?: Function;
}

const displayContent = (file: File) => {
  const fileType = file.type;
  console.log(fileType);
  let content;
  switch (fileType) {
    case "image":
      content = <img src={file.url} />;
      break;
    case "csv":
      content = <img src={'/assets/csv.png'} width={130} height={130} />;
      break;
    case "docx":
      content = <img src={'/assets/word.png'} width={130} height={130} />;
      break;
    case "pdf":
      content = (
        <div>
          <PDFViewer
            document={{
              url: file.url,
            }}
          />
        </div>
      );
      break;
  }
  return content;
};

export const FileFrame = ({ file, onClick, onClose }: IProps) => {
  return (
    <div className="Container">
      <div className="FrameHeader">
        <div
          onClick={() => onClose && onClose()}
          style={{
            cursor: "pointer",
            background: "white",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            position: "absolute",
            top: "5px",
            right: "5px",
          }}
        >
          <X color={"black"} size={20} />
        </div>
      </div>
      <div className="Content" onClick={() => onClick && onClick()}>
        {displayContent(file)}
      </div>
      <div className="FrameFooter">
        <span> {file.name}</span>
      </div>
    </div>
  );
};
