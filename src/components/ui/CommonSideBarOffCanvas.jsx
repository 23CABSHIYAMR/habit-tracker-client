import React from "react";
import {
  Button,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
} from "reactstrap";

const CommonSideBarOffcanvas = ({
  disableCompletion,
  isOpen,
  toggle,
  headerTitle,
  headerSubTitle,
  bodyContent,
  primaryBtnTxt,
  secondaryBtnTxt,
  primaryAction,
  primaryActionLoading,
  secondaryAction,
}) => {
  return (
    <Offcanvas
      isOpen={isOpen}
      toggle={toggle}
      direction="end"
      scrollable={false}
      className="common-sidebar-offcanvas"
    >
      <OffcanvasHeader toggle={toggle} className="p-20">
        <div className="heading">
          <span className="title mb-1">{headerTitle}</span>
          <span className="sub-title">{headerSubTitle}</span>
        </div>
      </OffcanvasHeader>

      <OffcanvasBody className="offcanvas-body-wrapper">
        {/* Scrollable Form Content */}
        <div className="offcanvas-scrollable-content">{bodyContent}</div>

        {/* Fixed Footer */}
        <div className="offcanvas-footer">
          <Button
            className="btn-secondary w-100"
            style={{ color: "black" }}
            onClick={secondaryAction}
          >
            {secondaryBtnTxt}
          </Button>

          <Button
            disabled={disableCompletion}
            color="primary"
            className="w-100"
            onClick={primaryAction}
          >
            {primaryActionLoading && (
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            {primaryBtnTxt}
          </Button>
        </div>
      </OffcanvasBody>
    </Offcanvas>
  );
};

export default CommonSideBarOffcanvas;
