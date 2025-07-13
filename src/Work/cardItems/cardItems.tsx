import React from "react";
import "./cardItems.css";

interface CardDataType {
  title: string;
  backgroundIcon: string;
  svg: React.ReactNode;
  number: number;
  percentage: string;
  percentageColor: string;
}

interface CardDataProp {
  data?: CardDataType[];
}

const CardItems: React.FC<CardDataProp> = ({data}) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "18px",
        gap: "28px",
        backgroundColor: "#D9D9D933",
      }}
    >
      {data?.map((item, index) => (
        <div className="scl--card-item-container" key={index}>
          <div className="scl--card-item">
            <div className="scl--card-item-header">
              <div className="scl--card-item-icon">
                <div
                  className="scl--card-item-icon-svg"
                  style={{
                    backgroundColor: item?.backgroundIcon,
                  }}
                >
                  {item?.svg}
                </div>
                <span className="scl--card-item-icon-title">{item?.title}</span>
              </div>
              <div className="scl--login-item-action-cell">
                <svg
                  width="3"
                  height="12"
                  viewBox="0 0 3 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.5 3C2.325 3 3 2.325 3 1.5C3 0.675 2.325 0 1.5 0C0.675 0 0 0.675 0 1.5C0 2.325 0.675 3 1.5 3ZM1.5 4.5C0.675 4.5 0 5.175 0 6C0 6.825 0.675 7.5 1.5 7.5C2.325 7.5 3 6.825 3 6C3 5.175 2.325 4.5 1.5 4.5ZM1.5 9C0.675 9 0 9.675 0 10.5C0 11.325 0.675 12 1.5 12C2.325 12 3 11.325 3 10.5C3 9.675 2.325 9 1.5 9Z"
                    fill="#5B6B79"
                  />
                </svg>
              </div>
            </div>
            <div className="scl--card-item-footer">
              <div className="scl--card-item-footer-number">
                <h4>{item?.number}</h4>
              </div>
              <div className="scl--card-item-footer-persentage">
                <svg
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.4"
                    d="M14.167 14.668H2.83366"
                    stroke={item?.percentageColor}
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M13.167 2.33203L3.83366 11.6654"
                    stroke={item?.percentageColor}
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M13.167 9.1787V2.33203H6.32033"
                    stroke={item?.percentageColor}
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span
                  className="scl--card-item-footer-persentage-number"
                  style={{ color: item?.percentageColor }}
                >
                  {item?.percentage}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardItems;
