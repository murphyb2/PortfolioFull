import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useWindowWidth } from "@react-hook/window-size";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const DocModal = ({ doc, title = "Document" }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => {
    if (show) setShow(false);
    else setShow(true);
  };

  const [docSize, setSize] = useState(1000);

  const windowWidth = useWindowWidth();

  useEffect(() => {
    if (windowWidth > 991) {
      setSize(1000);
    } else if (windowWidth > 576) setSize(600);
    else setSize(370);
  }, [windowWidth]);

  return (
    <>
      <button type="button" className="btn btn-primary" onClick={handleShow}>
        View {title}
      </button>
      <Modal show={show} centered size="lg" onHide={handleShow}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Document file={doc}>
            <Page
              scale={0.75}
              width={docSize}
              renderMode="canvas"
              renderTextLayer={false}
              pageNumber={1}
            />
          </Document>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleShow}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
