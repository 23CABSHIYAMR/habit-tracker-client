"use client";
import DisplayType from "@/components/ui/DisplayType";
import ImgInBtn from "@/components/ui/ImgInBtn";
import ProgressBar from "../../ui/ProgressBar";
import Image from "next/image";
export default function AnalyticsHeader({
  title,
  pageName,
  dateLabel,
  canMovePrev = false,
  canMoveNext = false,
  onPrev = () => {},
  onNext = () => {},
  showDisplayType = false,
  isBarGraphActive,
  setBarGraphActive,
  progressVal,
  showProgressComparison = false,
  comparisonValue, // positive = increase, negative = decrease
}) {
  return (
    <div className="d-flex flex-column gap-3 mt-3">
      {/* Top row: date + navigation + display mode */}
      <div className="space-between">
        <div className="d-flex gap-2 align-items-center">
          {pageName !== "all-time" && (
            <div className="d-flex gap-3">
              {onPrev && (
                <ImgInBtn
                  className={`chevron-btn ${
                    canMovePrev ? "" : "chevron-disabled"
                  }`}
                  dir="arrowsAndChevrons/chevron-left.svg"
                  clickEvent={canMovePrev ? onPrev : null}
                />
              )}
              {onNext && (
                <ImgInBtn
                  className={`chevron-btn ${
                    canMoveNext ? "" : "chevron-disabled"
                  }`}
                  dir="arrowsAndChevrons/chevron-right.svg"
                  clickEvent={canMoveNext ? onNext : null}
                />
              )}
            </div>
          )}
          <h3 className="m-0 dateLabel">{dateLabel ?? title}</h3>
        </div>

        {showDisplayType && (
          <DisplayType
            grid={true}
            setBarGraphActive={setBarGraphActive}
            isBarGraphActive={isBarGraphActive}
          />
        )}
      </div>

      {/* Progress bar */}
      {progressVal !== undefined && pageName !== "all-time" && (
        <>
          <ProgressBar progressVal={progressVal} />
          <div className="space-between progressComparison">
            <div>
              {showProgressComparison && comparisonValue !== undefined ? (
                <span className="center-items">
                  <Image
                    src={`/assets/images/arrowsAndChevrons/${
                      comparisonValue >= 0 ? "arrow-up" : "arrow-down"
                    }.svg`}
                    width="16"
                    height="16"
                    alt="arw"
                    className={comparisonValue ? "green-color" : "red-color"}
                  />
                  {comparisonValue >= 0 ? "Up " : "Down "}
                  {Math.abs(comparisonValue).toFixed(1)}% from the{" "}
                  {pageName || "period"} before
                </span>
              ) : (
                " "
              )}
            </div>
            <div>{progressVal.toFixed(1)}% achieved</div>
          </div>
        </>
      )}

      <div className="nav-seperator"></div>
    </div>
  );
}
