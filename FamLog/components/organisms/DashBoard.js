// ダッシュボードコンポーネント
import React from "react";

// 静的なダミーデータ
const dummyData = [
  { name: "月", value: 10 },
  { name: "火", value: 15 },
  { name: "水", value: 8 },
  { name: "木", value: 20 },
  { name: "金", value: 12 },
  { name: "土", value: 5 },
  { name: "日", value: 18 },
];

const ContributionChart = () => {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", height: "200px", gap: "10px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
      {dummyData.map((item) => (
        <div key={item.name} style={{ textAlign: "center" }}>
          <div
            style={{
              height: `${item.value * 10}px`,
              width: "30px",
              backgroundColor: "#4caf50",
              borderRadius: "4px",
              marginBottom: "5px",
              transition: "all 0.3s ease",
            }}
          />
          <div>{item.name}</div>
        </div>
      ))}
    </div>
  );
};

export default ContributionChart;
