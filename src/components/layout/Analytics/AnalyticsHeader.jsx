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
        <div className="d-flex flex-column gap-3 mt-4">
          <ProgressBar progressVal={progressVal} />
          <div className="d-flex justify-content-between align-items-center" style={{ fontSize: "15px", fontWeight: 500, color: "var(--text-secondary)" }}>
            <div>
              {showProgressComparison && comparisonValue !== undefined ? (
                <div className="d-flex align-items-center gap-2">
                  {/* use text colors for arrow */}
                  <div style={{ color: comparisonValue >= 0 ? "var(--success-500)" : "var(--error-500)", display: "flex", alignItems: "center" }}>
                   <Image
                      src={`/assets/images/arrowsAndChevrons/${
                        comparisonValue >= 0 ? "arrow-up" : "arrow-down"
                      }.svg`}
                      width="18"
                      height="18"
                      alt="arw"
                      /* Apply a CSS filter or use react-icons if SVG does not inherit color.  Assuming these SVGs are pure black and can be filtered or are strictly strokes. For now, since user says "arrow should be red or green", we will retain the image but apply the correct class. */
                      className={comparisonValue >= 0 ? "success-svg-color" : "error-svg-color"}
                      style={{ 
                        filter: comparisonValue >= 0 
                          ? "invert(48%) sepia(87%) saturate(1212%) hue-rotate(99deg) brightness(98%) contrast(93%)" // approx green
                          : "invert(40%) sepia(91%) saturate(2222%) hue-rotate(338deg) brightness(98%) contrast(92%)" // approx red
                      }}
                    />
                  </div>
                  <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>
                    {comparisonValue >= 0 ? "Up " : "Down "}
                    {Math.abs(comparisonValue).toFixed(0)}% from the {pageName || "period"} before
                  </span>
                </div>
              ) : (
                " "
              )}
            </div>
            
            <div style={{ color: "var(--text-primary)", fontWeight: 500 }}>{progressVal.toFixed(0)}% achieved</div>
          </div>
        </div>
      )}

      <div className="nav-seperator mt-3"></div>
    </div>
  );
}
