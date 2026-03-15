import React from "react";
import { Button, Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";

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
      className="common-sidebar-offcanvas p-3 gap-3"
    >
      <OffcanvasHeader toggle={toggle} className="space-between m-0 p-0">
        {/* <div className="heading">
          <span className="title mb-1">{headerTitle}</span>
          <span className="sub-title">{headerSubTitle}</span>
        </div> */}
        <div className="d-flex gap-3 m-0">
          <div
            className="pending-line"
            style={{ background: "var(--habit-1)", width: "5px" }}
          ></div>

          <div className="form-header d-flex flex-column justify-content-between">
            <h3 className="title m-0">{headerTitle}</h3>
            <p
              className="sub-title form-sub-title m-0"
              style={{ color: "var(--text-placeholder)" }}
            >
              {headerSubTitle}
            </p>
          </div>
        </div>
      </OffcanvasHeader>

      <OffcanvasBody className="offcanvas-body-wrapper p-0 d-flex flex-column gap-3">
        {/* Scrollable Form Content */}
        <div className="offcanvas-scrollable-content">{bodyContent}</div>

        {/* Fixed Footer */}
        <div className="offcanvas-footer d-flex justify-content-end gap-3 flex-row-reverse mt-3">
          <Button
            className="w-100 form-btn"
            style={{
              color: "var(--habit-1)",
              background: "none",
              border: "0.5px solid var(--btn-border)",
            }}
            onClick={secondaryAction}
          >
            {secondaryBtnTxt}
          </Button>

          <Button
            disabled={disableCompletion}
            color="primary"
            className="w-100 form-btn border-0"
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
