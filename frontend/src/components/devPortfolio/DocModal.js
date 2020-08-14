import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const DocModal = ({ doc }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => {
    if (show) setShow(false);
    else setShow(true);
  };

  return (
    <>
      <button type="button" className="btn btn-primary" onClick={handleShow}>
        View
      </button>
      <Modal show={show} centered size="lg">
        <Modal.Header>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Document file={doc} className="mx-auto" renderMode="svg">
            <Page pageNumber={1} />
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
