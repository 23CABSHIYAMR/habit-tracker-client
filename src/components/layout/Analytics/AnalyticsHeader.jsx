"use client";
import DisplayType from "@/components/ui/DisplayType";
import ImgInBtn from "@/components/ui/ImgInBtn";
import ProgressBar from "../../ui/ProgressBar";
export default function AnalyticsHeader({
  title,
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
      {progressVal !== undefined && (
        <>
          <ProgressBar progressVal={progressVal} />
          <div className="space-between progressComparison">
            <div >
              {showProgressComparison && comparisonValue !== undefined
                ? `Upto ${Math.abs(comparisonValue).toFixed(2)}% ${
                    comparisonValue >= 0 ? "more than" : "less than"
                  } previous period`
                : " "}
            </div>
            <div>{progressVal.toFixed(2)}% achieved</div>
          </div>
        </>
      )}

      <div className="nav-seperator"></div>
    </div>
  );
}
