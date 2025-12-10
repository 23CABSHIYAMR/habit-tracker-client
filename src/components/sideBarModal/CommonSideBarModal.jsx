import React from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'

const CommonSideBarModal = ({ disableCompletion, isOpen, toggle, headerTitle, headerSubTitle, bodyContent, primaryBtnTxt, secondaryBtnTxt, primaryAction, primaryActionLoading, secondaryAction }) => {
  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      className="right-side-modal"
      backdrop={true}
      fade={false}
    >
      <ModalHeader toggle={toggle}>
        <div className='heading'>
          <span className='title'>{headerTitle}</span>
          <span className='sub-title'>{headerSubTitle}</span>
        </div>
      </ModalHeader>
      <ModalBody>
        {bodyContent}
      </ModalBody>
      <ModalFooter className="d-flex gap-2">
        <div style={{ flex: 1 }}>
          <Button
            className="btn-secondary w-100"
            style={{ color: "black" }}
            onClick={secondaryAction}
          >
            {secondaryBtnTxt}
          </Button>
        </div>
        <div style={{ flex: 1 }}>
          <Button
            disabled={disableCompletion}
            color="primary"
            className="w-100"
            onClick={primaryAction}
          >
            {primaryActionLoading && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            {primaryBtnTxt}
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  )
}

export default CommonSideBarModal
