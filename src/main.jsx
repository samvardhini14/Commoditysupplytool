import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./styles.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
);

const tabs = [
  "Home",
  "Ownership",
  "Plant Matrix",
  "Variety",
  "Forecast",
  "Finance",
  "Admin",
];
const rows = {
  Home: [
    [
      "Wheat",
      "BELOIT PLANT",
      "4,820 MT",
      "4,850 MT",
      "4,900 MT",
      "98.37%",
      "On Plan",
    ],
    [
      "Oats",
      "CAMBRIDGE PLANT",
      "2,180 MT",
      "2,160 MT",
      "2,150 MT",
      "101.40%",
      "Review",
    ],
    [
      "Oil",
      "CASA GRANDE PLANT",
      "1,750 MT",
      "1,770 MT",
      "1,780 MT",
      "98.31%",
      "On Plan",
    ],
  ],
  Ownership: [
    [
      "Wheat",
      "John Carter",
      "North Grain Co.",
      "BELOIT PLANT",
      "East - US",
      "4,820 MT",
      7,
      "Active",
    ],
    [
      "Oil",
      "Maria Lopez",
      "Agri Oils LLC",
      "CASA GRANDE PLANT",
      "West - US",
      "1,750 MT",
      1,
      "Active",
    ],
    [
      "Oats",
      "Daniel Brown",
      "Maple Oats Ltd.",
      "CAMBRIDGE PLANT",
      "Canada",
      "2,180 MT",
      10,
      "Review",
    ],
  ],
  "Plant Matrix": [
    ["BELOIT PLANT", "East - US", "Wheat-38", "Wheat-7", "Oats-12", "Complete"],
    [
      "CASA GRANDE PLANT",
      "West - US",
      "Oats-19",
      "Wheat-14",
      "Oil-8",
      "Complete",
    ],
    ["CAMBRIDGE PLANT", "Canada", "Oats-22", "Wheat-9", "Wheat-11", "Review"],
    ["OMAHA PLANT", "Central - US", "Wheat-31", "Oil-6", "Oats-10", "Complete"],
  ],
  Variety: [
    ["Wheat", "WH-HRW", "Hard Red Winter", "Premium", "1.04", "Active"],
    ["Oats", "OA-ST", "Standard Oats", "Standard", "1.02", "Active"],
    ["Oil", "OL-CR", "Crude Vegetable Oil", "Standard", "0.98", "Review"],
  ],
  Forecast: [
    [
      "Wheat",
      "18,050 MT",
      "18,100 MT",
      "17,920 MT",
      "-180 MT",
      "99.01%",
      "Approved",
    ],
    [
      "Oats",
      "9,500 MT",
      "9,450 MT",
      "9,530 MT",
      "+80 MT",
      "100.85%",
      "Pending",
    ],
    [
      "Oil",
      "8,510 MT",
      "8,563 MT",
      "8,329 MT",
      "-234 MT",
      "97.27%",
      "Approved",
    ],
  ],
  Finance: [
    [
      "Wheat",
      "WH-001",
      "BELOIT / East - US",
      "$286.50",
      "$280.00",
      "+2.32%",
      "Review",
    ],
    [
      "Oats",
      "OA-014",
      "CAMBRIDGE / Canada",
      "$412.20",
      "$420.00",
      "-1.86%",
      "On Budget",
    ],
    [
      "Oil",
      "OL-008",
      "CASA GRANDE / West - US",
      "$1,025.80",
      "$1,010.00",
      "+1.56%",
      "On Budget",
    ],
    [
      "Corn",
      "CR-021",
      "OMAHA / Central - US",
      "$224.75",
      "$218.00",
      "+3.10%",
      "Exception",
    ],
  ],
  Admin: [
    ["BELOIT PLANT", "Wheat", "East - US", "USA", "Active", "07-Sep-2026"],
    ["CAMBRIDGE PLANT", "Oats", "Canada", "Canada", "Active", "06-Sep-2026"],
    ["OMAHA PLANT", "Oil", "Central - US", "USA", "Inactive", "01-Sep-2026"],
  ],
};
const headers = {
  Home: [
    "Commodity",
    "Plant",
    "Actual",
    "Actual / Forecast",
    "Plan",
    "Index",
    "Status",
  ],
  Ownership: [
    "Commodity",
    "Market",
    "Supplier",
    "Plant",
    "Region",
    "Demand",
    "Position",
    "Status",
  ],
  "Plant Matrix": [
    "Plant",
    "Region",
    "P10 | W1",
    "P10 | W2",
    "P10 | W3",
    "Status",
  ],
  Variety: ["Commodity", "Code", "Variety", "Grade", "Conversion", "Status"],
  Forecast: [
    "Commodity",
    "Actual",
    "Plan",
    "Actual / Forecast",
    "Variance",
    "Index",
    "Approval",
  ],
  Finance: [
    "Commodity",
    "Rate Code",
    "Plant / Region",
    "Current",
    "Budget",
    "Variance",
    "Status",
  ],
  Admin: ["Plant", "Category", "Region", "Country", "Status", "Last Updated"],
};
const adminSections = [
  {
    title: "Plant Details",
    headers: [
      "Plant Name",
      "Category",
      "Region",
      "Country",
      "Status",
      "Last Updated",
    ],
    rows: [
      ["BELOIT PLANT", "Wheat", "East - US", "USA", "Active", "07-Sep-2026"],
      ["CAMBRIDGE PLANT", "Oats", "Canada", "Canada", "Active", "06-Sep-2026"],
      [
        "CASA GRANDE PLANT",
        "Wheat",
        "West - US",
        "USA",
        "Active",
        "05-Sep-2026",
      ],
      ["OMAHA PLANT", "Oil", "Central - US", "USA", "Inactive", "01-Sep-2026"],
    ],
  },
  {
    title: "Growing Areas",
    headers: ["Area Name", "Region", "Primary Crop", "Acres", "Status"],
    rows: [
      ["North Valley", "East - US", "Wheat", "12,400", "Active"],
      ["Prairie South", "Central - US", "Oats", "8,750", "Active"],
      ["Maple Ridge", "Canada", "Oats", "6,200", "Review"],
    ],
  },
  {
    title: "Growers",
    headers: [
      "Grower ID",
      "Grower Name",
      "Growing Area",
      "Region",
      "Primary Crop",
      "Status",
    ],
    rows: [
      [
        "GR-1001",
        "John Carter Farms",
        "North Valley",
        "East - US",
        "Wheat",
        "Active",
      ],
      [
        "GR-1002",
        "Prairie Harvest Co.",
        "Prairie South",
        "Central - US",
        "Oats",
        "Active",
      ],
      [
        "GR-1003",
        "Maple Fields Ltd.",
        "Maple Ridge",
        "Canada",
        "Oats",
        "Pending",
      ],
    ],
  },
  {
    title: "User Access",
    headers: [
      "Full Name",
      "Username",
      "Email",
      "Role",
      "Region",
      "Status",
      "Last Login",
    ],
    rows: [
      [
        "Admin User",
        "admin",
        "admin@cst.local",
        "Administrator",
        "All Regions",
        "Active",
        "09-Sep-2026",
      ],
      [
        "Tiger Thomas",
        "tiger",
        "tiger@cst.local",
        "Supply Planner",
        "East - US",
        "Active",
        "08-Sep-2026",
      ],
      [
        "Daniel Brown",
        "dbrown",
        "daniel.brown@cst.local",
        "Commodity Owner",
        "Canada",
        "Pending",
        "Never",
      ],
    ],
  },
  {
    title: "Commodity Master",
    headers: ["Code", "Name", "Unit", "Status"],
    rows: [
      ["WH", "Wheat", "MT", "Active"],
      ["OA", "Oats", "MT", "Active"],
      ["OL", "Oil", "MT", "Active"],
    ],
  },
  {
    title: "System Configuration",
    headers: ["Setting", "Value", "Status"],
    rows: [
      ["Planning tolerance", "2%", "Active"],
      ["Default unit", "MT", "Active"],
      ["Data refresh", "Daily 06:00", "Active"],
    ],
  },
];

function Login({ onLogin }) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const submit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user, password }),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        setError(body.message || "Invalid username or password.");
        return;
      }
      onLogin();
    } catch {
      setError("Unable to reach the application server. Start npm run dev:server.");
    }
  };
  return (
    <main className="login-screen">
      <form className="login-card" onSubmit={submit}>
        <div className="login-brand">
          CBT <small>Commodity Buying Tool</small>
        </div>
        <h1>Sign in</h1>
        <p>Access commodity supply, forecast and finance modules.</p>
        <label>
          Username
          <input
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="Enter username"
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </label>
        <div className="login-meta">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <button type="button" className="link">
            Forgot password?
          </button>
        </div>
        <button className="login-btn">Sign In</button>
        {error && <div className="login-error">{error}</div>}
        <div className="login-hint">
          Demo: <b>admin / cst@123</b> or <b>tiger / tiger@123</b>
        </div>
      </form>
    </main>
  );
}

function Insight({ tab, onAsk }) {
  const copy = {
    Home: [
      "Index to Plan is 99.08% (35,779 of 36,113 MT).",
      "Commodity cost is up 1.90% week-over-week, mostly driven by wheat.",
      "Oats usage at CAMBRIDGE PLANT is 1.40% over plan.",
    ],
    Ownership: [
      "3 commodities are unassigned, concentrated in West - US.",
      "Oats ownership at CAMBRIDGE PLANT is in Review.",
      "Active coverage is steady at 18 owners across 4 regions.",
    ],
    "Plant Matrix": [
      "CAMBRIDGE PLANT is the only plant flagged Review this period.",
      "OMAHA PLANT carries the second-highest weekly volume at 7,210 MT.",
      "3 of 4 tracked plants are fully allocated.",
    ],
    Variety: [
      "OL-CR is flagged Review with a 0.98 conversion factor.",
      "Wheat is approved across 12 plants.",
      "No new varieties were added in the last 30 days.",
    ],
    Forecast: [
      "Forecast accuracy is 96.4%, up 1.8 points.",
      "Oil is under plan (-234 MT); Oats is ahead (+80 MT).",
      "Wheat is tracking its plan at a 99.01% index.",
    ],
    Finance: [
      "Corn is +3.10% over budget and above the approval threshold.",
      "Overall spend is $18.42M, $0.33M under budget.",
      "Wheat is +2.32% over budget and marked for Review.",
    ],
    Admin: [
      "OMAHA PLANT is currently Inactive.",
      "All other tracked plants were updated within the last week.",
      "Commodity master has had no changes this period.",
    ],
  }[tab];
  return (
    <aside className="insight">
      <div className="insight-icon">✦</div>
      <div>
        <div className="insight-title">
          Business AI Insight <span>LIVE</span>
        </div>
        <ul>
          {copy.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <button
          className="text-button"
          onClick={() => onAsk("Summarize the key exceptions for this page")}
        >
          Ask Natasha
        </button>
      </div>
    </aside>
  );
}

function TimeframeFilter({ value, onChange }) {
  return (
    <select
      aria-label="Comparison period filter"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      <option>2024-2025</option>
      <option>2025-2026</option>
      <option>2023-2024</option>
    </select>
  );
}

function DataTable({ tab, query }) {
  const data = rows[tab].filter((row) =>
    row.join(" ").toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {headers[tab].map((head) => (
              <th key={head}>{head}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.join("-")}>
              {row.map((cell, index) => (
                <td key={cell}>
                  {index === row.length - 1 ? (
                    <span
                      className={`badge ${cell === "Active" || cell === "Approved" || cell === "On Plan" || cell === "On Budget" || cell === "Complete" ? "ok" : cell === "Exception" || cell === "Inactive" ? "off" : "warn"}`}
                    >
                      {cell}
                    </span>
                  ) : (
                    cell
                  )}
                </td>
              ))}
              <td>
                <button className="btn small edit-button">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AdminWorkspace({ query, onAdd }) {
  const normalizedQuery = query.toLowerCase();
  return (
    <div className="admin-sections">
      {adminSections.map((section) => {
        const data = section.rows.filter((row) =>
          row.join(" ").toLowerCase().includes(normalizedQuery),
        );
        return (
          <section className="card admin-card" key={section.title}>
            <div className="card-header">
              <h3>{section.title}</h3>
              <button
                className="btn primary small"
                onClick={() => onAdd(section.title)}
              >
                + Add
              </button>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    {section.headers.map((head) => (
                      <th key={head}>{head}</th>
                    ))}
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row) => (
                    <tr key={row.join("-")}>
                      {row.map((cell, index) => (
                        <td key={cell}>
                          {index === row.length - 1 ? (
                            <span
                              className={`badge ${["Active"].includes(cell) ? "ok" : ["Inactive"].includes(cell) ? "off" : "warn"}`}
                            >
                              {cell}
                            </span>
                          ) : (
                            cell
                          )}
                        </td>
                      ))}
                      <td>
                        <button className="btn small">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        );
      })}
    </div>
  );
}

function FreightManagement({ timeframe, onTimeframeChange }) {
  const [records, setRecords] = useState([
    {
      plant: "BELOIT PLANT",
      growingArea: "North Valley",
      year: "2024-2025",
      period: "P1",
      week: "W1",
      planValue: "1,240",
      actualValue: "1,180",
    },
    {
      plant: "CASA GRANDE PLANT",
      growingArea: "Prairie South",
      year: "2025-2026",
      period: "P2",
      week: "W2",
      planValue: "980",
      actualValue: "1,025",
    },
    {
      plant: "CAMBRIDGE PLANT",
      growingArea: "Maple Ridge",
      year: "2023-2024",
      period: "P3",
      week: "W3",
      planValue: "760",
      actualValue: "720",
    },
  ]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    plant: "",
    growingArea: "",
    planValue: "",
    actualValue: "",
  });
  const updateField = (field, value) =>
    setForm((current) => ({ ...current, [field]: value }));
  const addRecord = (event) => {
    event.preventDefault();
    if (
      !form.plant ||
      !form.growingArea ||
      !form.planValue ||
      !form.actualValue
    )
      return;
    setRecords((current) => [...current, { ...form, year: timeframe }]);
    setForm({ plant: "", growingArea: "", planValue: "", actualValue: "" });
  };
  const filteredRecords = records.filter(
    (record) =>
      record.year === timeframe &&
      Object.values(record)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  return (
    <section className="card">
      <div className="card-header">
        <h3>Freight Management</h3>
        <span className="badge ok">Plan vs Actual</span>
      </div>
      <div className="filters-row">
        <select>
          <option>All Commodities</option>
          <option>Wheat</option>
          <option>Oats</option>
          <option>Oil</option>
          <option>Corn</option>
        </select>
        <select>
          <option>All Regions</option>
          <option>East - US</option>
          <option>West - US</option>
          <option>Central - US</option>
          <option>Canada</option>
        </select>
        <select>
          <option>All Currencies</option>
          <option>USD</option>
          <option>CAD</option>
        </select>
        <TimeframeFilter value={timeframe} onChange={onTimeframeChange} />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Plant or growing area"
        />
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Plant</th>
              <th>Growing Area</th>
              <th>Period</th>
              <th>Week</th>
              <th>Plan Value</th>
              <th>Actual Value</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record) => (
              <tr key={`${record.plant}-${record.growingArea}-${record.week}`}>
                <td>{record.plant}</td>
                <td>{record.growingArea}</td>
                <td>{record.period}</td>
                <td>{record.week}</td>
                <td>{record.planValue}</td>
                <td>{record.actualValue}</td>
                <td>
                  <button className="btn small" type="button">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <form className="form-grid" onSubmit={addRecord}>
        <label>
          Plant
          <input
            value={form.plant}
            onChange={(event) => updateField("plant", event.target.value)}
            placeholder="Plant name"
          />
        </label>
        <label>
          Growing Area
          <input
            value={form.growingArea}
            onChange={(event) => updateField("growingArea", event.target.value)}
            placeholder="Growing area"
          />
        </label>
        <label>
          Period
          <select
            value={form.period || "P1"}
            onChange={(event) => updateField("period", event.target.value)}
          >
            <option>P1</option>
            <option>P2</option>
            <option>P3</option>
            <option>P4</option>
          </select>
        </label>
        <label>
          Week
          <select
            value={form.week || "W1"}
            onChange={(event) => updateField("week", event.target.value)}
          >
            <option>W1</option>
            <option>W2</option>
            <option>W3</option>
            <option>W4</option>
          </select>
        </label>
        <label>
          Plan Value
          <input
            type="number"
            value={form.planValue}
            onChange={(event) => updateField("planValue", event.target.value)}
            placeholder="0"
          />
        </label>
        <label>
          Actual Value
          <input
            type="number"
            value={form.actualValue}
            onChange={(event) => updateField("actualValue", event.target.value)}
            placeholder="0"
          />
        </label>
        <div className="modal-actions full-field">
          <button className="btn primary" type="submit">
            Add Freight Record
          </button>
        </div>
      </form>
    </section>
  );
}

function FinanceWorkspace({ query, onMessage, timeframe, onTimeframeChange }) {
  const financeData = {
    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    datasets: [
      {
        label: "Average Commodity Rate",
        data: [260, 272, 279, 286, 292, 287],
        borderColor: "#3b82f6",
        backgroundColor: "#dbeafe",
        fill: true,
        tension: 0.3,
      },
    ],
  };
  return (
    <>
      <div className="kpi-container finance-kpis">
        <div className="kpi-card">
          <strong>$18.42M</strong>
          <span>Current Spend</span>
          <small>▲ 3.1% vs prior period</small>
        </div>
        <div className="kpi-card">
          <strong>$18.75M</strong>
          <span>Budget</span>
          <small>Remaining $0.33M</small>
        </div>
        <div className="kpi-card">
          <strong>+1.76%</strong>
          <span>Rate Variance</span>
          <small>Within 2% threshold</small>
        </div>
      </div>
      <section className="card">
        <div className="card-header">
          <h3>Commodity Rate Management</h3>
          <span className="badge ok">Finance Period: Sep-2026</span>
        </div>
        <div className="filters-row">
          <select>
            <option>All Commodities</option>
            <option>Wheat</option>
            <option>Oats</option>
            <option>Oil</option>
            <option>Corn</option>
          </select>
          <select>
            <option>All Regions</option>
            <option>East - US</option>
            <option>West - US</option>
            <option>Central - US</option>
            <option>Canada</option>
          </select>
          <select>
            <option>All Currencies</option>
            <option>USD</option>
            <option>CAD</option>
          </select>
          <TimeframeFilter value={timeframe} onChange={onTimeframeChange} />
          <input
            value={query}
            onChange={(event) => onMessage(event.target.value)}
            placeholder="Commodity, plant or code"
          />
        </div>
        <DataTable tab="Finance" query={query} />
      </section>
      <FreightManagement
        timeframe={timeframe}
        onTimeframeChange={onTimeframeChange}
      />
      <div className="finance-grid">
        <section className="card chart-card">
          <h3>Commodity Rate Trend</h3>
          <Line
            data={financeData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </section>
        <section className="card">
          <div className="card-header">
            <h3>Finance Controls</h3>
          </div>
          <table>
            <tbody>
              <tr>
                <td>Approval threshold</td>
                <td>
                  <b>2.00%</b>
                </td>
                <td>
                  <button className="btn small">Edit</button>
                </td>
              </tr>
              <tr>
                <td>Rate refresh</td>
                <td>
                  <b>Daily 06:00</b>
                </td>
                <td>
                  <button className="btn small">Edit</button>
                </td>
              </tr>
              <tr>
                <td>Default currency</td>
                <td>
                  <b>USD</b>
                </td>
                <td>
                  <button className="btn small">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
}

function ForecastWorkspace({ query, onMessage, timeframe, onTimeframeChange }) {
  const forecastData = {
    labels: ["P05", "P06", "P07", "P08", "P09", "P10"],
    datasets: [
      {
        label: "Plan",
        data: [34500, 34800, 35100, 35400, 35700, 36113],
        borderColor: "#1e3a8a",
        tension: 0.3,
      },
      {
        label: "Forecast",
        data: [34100, 35000, 34950, 35600, 35950, 35779],
        borderColor: "#3b82f6",
        tension: 0.3,
      },
    ],
  };
  return (
    <>
      <div className="kpi-container finance-kpis">
        <div className="kpi-card">
          <strong>35,779 MT</strong>
          <span>Forecast Volume</span>
          <small>99.08% to plan</small>
        </div>
        <div className="kpi-card">
          <strong>334 MT</strong>
          <span>Variance to Plan</span>
          <small>Favorable</small>
        </div>
        <div className="kpi-card">
          <strong>96.4%</strong>
          <span>Forecast Accuracy</span>
          <small>▲ 1.8 pts</small>
        </div>
      </div>
      <section className="card">
        <div className="card-header">
          <h3>Forecast Submissions</h3>
          <div className="search">
            <TimeframeFilter value={timeframe} onChange={onTimeframeChange} />
            <input
              value={query}
              onChange={(event) => onMessage(event.target.value)}
              placeholder="Search records"
            />
          </div>
        </div>
        <DataTable tab="Forecast" query={query} />
      </section>
      <section className="card chart-card forecast-chart">
        <h3>Forecast vs Plan Trend</h3>
        <Line
          data={forecastData}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </section>
    </>
  );
}

function EditPopup({ record, mode = "edit", onClose, onSave }) {
  const [notes, setNotes] = useState(record.notes || "");
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <div className="card-header">
          <h3>
            {mode === "add" ? "Add" : "Edit"} {record.name}
          </h3>
          <button className="close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="form-grid">
          <label>
            Record
            <input
              defaultValue={mode === "add" ? "" : record.name}
              placeholder={record.name}
            />
          </label>
          <label>
            Category
            <input defaultValue={record.category} />
          </label>
          <label>
            Status
            <select defaultValue={record.status}>
              <option>Active</option>
              <option>Approved</option>
              <option>Review</option>
              <option>Pending</option>
              <option>Inactive</option>
              <option>Exception</option>
            </select>
          </label>
          <label>
            Effective From
            <input type="date" />
          </label>
          <label className="full-field">
            Notes
            <textarea
              rows="5"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
            />
          </label>
        </div>
        <div className="modal-actions">
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn primary"
            onClick={() => {
              onSave();
              onClose();
            }}
          >
            {mode === "add" ? "Add Record" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

function exportDashboardCsv(tab, period, region) {
  const tableRows = rows[tab] || [];
  const csvRows = [
    [...(headers[tab] || []), "Period", "Region"],
    ...tableRows.map((row) => [...row, period, region]),
  ];
  const csv = csvRows
    .map((row) =>
      row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(","),
    )
    .join("\n");
  const link = document.createElement("a");
  link.href = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;
  link.download = `cst-${tab.toLowerCase().replaceAll(" ", "-")}-${period.toLowerCase()}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function Dashboard({ tab, setTab, onLogout }) {
  const [query, setQuery] = useState("");
  const [timeframe, setTimeframe] = useState("2024-2025");
  const [copilot, setCopilot] = useState(false);
  const [copilotPrompt, setCopilotPrompt] = useState("");
  const [message, setMessage] = useState("");
  const [modal, setModal] = useState(false);
  const [subView, setSubView] = useState("");
  const [formModal, setFormModal] = useState("");
  const [period, setPeriod] = useState("Period");
  const [region, setRegion] = useState("US");
  const [alertBanner, setAlertBanner] = useState(null);
  const [alertCount, setAlertCount] = useState(3);
  const [editRecord, setEditRecord] = useState(null);
  const [editMode, setEditMode] = useState("edit");
  const [refreshedAt, setRefreshedAt] = useState("Not refreshed yet");
  const [chartMetric, setChartMetric] = useState("Volume");
  const [commodity, setCommodity] = useState("Wheat");
  const ask = (text) => {
    setCopilotPrompt(text);
    setCopilot(true);
  };
  const handleTimeframeChange = (value) => {
    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setTimeframe(value);
    setRefreshedAt(timestamp);
    setMessage(`${value} data refreshed`);
  };
  const periodMetrics = {
    Period: [
      ["35,779", "MT", "Volume Actual / Forecast"],
      ["36,113", "MT", "Plan Volume"],
      ["99.08", "%", "Index to Plan"],
      ["103.07", "%", "Index to Prior Year"],
      ["3.36", "%", "CY Conversion Factor"],
      ["10,633", "$", "Impact vs Plan"],
    ],
    Week: [
      ["8,942", "MT", "Volume Actual / Forecast"],
      ["9,120", "MT", "Plan Volume"],
      ["98.05", "%", "Index to Plan"],
      ["101.42", "%", "Index to Prior Year"],
      ["3.31", "%", "CY Conversion Factor"],
      ["2,184", "$", "Impact vs Plan"],
    ],
    Month: [
      ["35,779", "MT", "Volume Actual / Forecast"],
      ["36,113", "MT", "Plan Volume"],
      ["99.08", "%", "Index to Plan"],
      ["103.07", "%", "Index to Prior Year"],
      ["3.36", "%", "CY Conversion Factor"],
      ["10,633", "$", "Impact vs Plan"],
    ],
  };
  const chartData = {
    labels: ["W-4", "W-3", "W-2", "W-1", "Current"],
    datasets: [
      {
        label: "Index to Plan",
        data: [98, 99, 98.5, 100, 99.08],
        borderColor: "#004c97",
        backgroundColor: "#3b82f6",
        tension: 0.3,
      },
    ],
  };
  const commodityVolumes = {
    Wheat: { Volume: [8420, 7210, 6830, 5960], Plan: [8600, 7400, 7000, 6100], Variance: [180, 190, 170, 140] },
    Oats: { Volume: [4280, 3960, 3510, 2940], Plan: [4400, 4050, 3600, 3000], Variance: [120, 90, 90, 60] },
    Oil: { Volume: [3150, 2820, 2480, 2190], Plan: [3200, 2900, 2550, 2250], Variance: [50, 80, 70, 60] },
  };
  const volumeData = {
    labels: ["East - US", "Central - US", "West - US", "Canada"],
    datasets: [
      {
        label: `${chartMetric} · ${period}`,
        data: commodityVolumes[commodity][chartMetric],
        backgroundColor: ["#004c97", "#3b82f6", "#f4b000", "#138a4b"],
      },
    ],
  };
  const indexData = {
    labels: ["W1", "W2", "W3", "W4", "W5"],
    datasets: [
      {
        label: "Plan",
        data: [2.8, 2.8, 2.9, 2.8, 2.9],
        backgroundColor: "#d1d5db",
      },
      {
        label: "Actual",
        data: [2.9, 2.7, 2.8, 2.9, 2.8],
        backgroundColor: "#60a5fa",
      },
    ],
  };
  const usageData = {
    labels: ["W1", "W2", "W3", "W4", "W5"],
    datasets: [
      {
        label: "Plan Usage",
        data: [2847, 2586, 2397, 2674, 3068],
        backgroundColor: "#1e3a8a",
      },
      {
        label: "Raw Usage",
        data: [2875, 2729, 2383, 2876, 3075],
        backgroundColor: "#60a5fa",
      },
    ],
  };
  const handleEditClick = (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    const action = button.textContent.trim();
    if (action === "Edit") {
      const row = button.closest("tr");
      setEditMode("edit");
      setEditRecord({
        name: row?.cells?.[0]?.textContent || "Record",
        category: row?.cells?.[1]?.textContent || tab,
        status: "Active",
        notes: row?.textContent || "",
      });
    }
    if (action === "+ Add") {
      const card = button.closest(".card");
      setEditMode("add");
      setEditRecord({
        name: card?.querySelector("h3")?.textContent || tab,
        category: tab,
        status: "Active",
        notes: "",
      });
    }
  };
  const handleAdd = (listName) => {
    setEditMode("add");
    setEditRecord({
      name: listName,
      category: tab,
      status: "Active",
      notes: "",
    });
  };
  const refreshDashboard = () => {
    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setRefreshedAt(timestamp);
    setMessage(`${region} ${period} data refreshed`);
  };
  const handleChartClick = (_, elements) => {
    if (elements.length)
      setMessage(
        `${chartMetric} selected for ${volumeData.labels[elements[0].index]}`,
      );
  };
  return (
    <div className="app-shell" onClick={handleEditClick}>
      <header className="header">
        <div className="header-logo">
          <span>CBT</span>Commodity Buying Tool
        </div>
        <nav>
          {tabs.map((item) => (
            <button
              className={tab === item ? "active" : ""}
              key={item}
              onClick={() => {
                setTab(item);
                setQuery("");
              }}
            >
              {item}
            </button>
          ))}
          <button
            onClick={() => {
              setCopilotPrompt("");
              setCopilot(true);
            }}
          >
            ✦ Natasha
          </button>
        </nav>
        <button
          className={`alert-bell${alertCount > 0 ? " has-alert" : ""}`}
          aria-label={`${alertCount} data alerts`}
          title="Data alerts"
          onClick={() => {
            setSubView("exceptions");
            setAlertCount(0);
          }}
        >
          🔔
          {alertCount > 0 && <span className="alert-count">{alertCount}</span>}
        </button>
        <div className="user-menu">
          <img
            src={`${import.meta.env.BASE_URL}admin-profile.png`}
            alt="Admin profile"
            style={{
              width: 28,
              height: 28,
              marginRight: 8,
              verticalAlign: "middle",
              objectFit: "cover",
              border: "1px solid #ffffff80",
              borderRadius: "50%",
            }}
          />
          Admin <button onClick={onLogout}>Logout</button>
        </div>
      </header>
      <div className="sub-nav">
        <div>
          {["US", "US-Core", "Co-Man", "Canada"].map((item) => (
            <button
              className={region === item ? "active" : ""}
              key={item}
              onClick={() => {
                setRegion(item);
                setQuery("");
                setMessage(`${item} data refreshed`);
              }}
            >
              {item}
            </button>
          ))}
          <button onClick={() => setSubView("details")}>Details</button>
          <button onClick={() => setSubView("exceptions")}>Exceptions</button>
        </div>
        <div className="toolbar">
          <button className="outline" onClick={() => setModal(true)}>
            PC Volume Plan
          </button>
          <button className="outline" onClick={() => setFormModal("feedback")}>
            Feedback
          </button>
          <button className="outline" onClick={() => setFormModal("alert")}>
            Alerts
          </button>
          <select
            value={period}
            onChange={(event) => {
              setPeriod(event.target.value);
              setMessage(`${event.target.value} data refreshed for ${region}`);
            }}
          >
            <option>Period</option>
            <option>Week</option>
            <option>Month</option>
          </select>
        </div>
      </div>
      <main key={`${tab}-${region}-${period}`} className="page">
        <div className="page-head">
          <div>
            <p className="eyebrow">CBT / OPERATIONS</p>
            <h2>{tab === "Home" ? "Home Dashboard" : tab}</h2>
            <p>
              Commodity supply overview for <b>{region}</b> and <b>{period}</b>{" "}
              with current performance and recent trends. Last refreshed:{" "}
              {refreshedAt}
            </p>
          </div>
          <div className="actions">
            <button className="btn" onClick={refreshDashboard}>
              Refresh
            </button>
            <button
              className="btn primary"
              onClick={() => {
                exportDashboardCsv(tab, period, region);
                setMessage(`${region} ${period} export downloaded`);
              }}
            >
              Export
            </button>
          </div>
        </div>
        {alertBanner && (
          <div className="alert-banner" role="status">
            <div>
              <strong>Alert created</strong>
              <span>
                {alertBanner.type} · {alertBanner.frequency} · Recipient:{" "}
                {alertBanner.recipient || "CBT team"}
              </span>
              <p>
                {alertBanner.message ||
                  "The alert has been scheduled successfully."}
              </p>
            </div>
            <button
              className="close"
              aria-label="Dismiss alert"
              onClick={() => setAlertBanner(null)}
            >
              ×
            </button>
          </div>
        )}
        <Insight tab={tab} onAsk={ask} />
        {tab === "Home" && (
          <div className="alert-banner" role="status">
            <div>
              <strong>Daily ERP refresh</strong>
              <span>In Progress</span>
              <p>ERP data synchronization is running.</p>
            </div>
          </div>
        )}
        {tab === "Home" && (
          <section className="card chart-card interactive-chart">
            <div className="card-header">
              <h3>Interactive Position View</h3>
              <div className="chart-switcher">
                {["Volume", "Plan", "Variance"].map((metric) => (
                  <button
                    className={chartMetric === metric ? "active" : ""}
                    key={metric}
                    onClick={() => setChartMetric(metric)}
                  >
                    {metric}
                  </button>
                ))}
              </div>
            </div>
            <Bar
              data={volumeData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                onClick: handleChartClick,
                plugins: { legend: { display: false } },
              }}
            />
          </section>
        )}
        {tab === "Home" && (
          <>
            <div className="kpi-container">
              {periodMetrics[period].map(([value, unit, label]) => (
                <div className="kpi-card" key={label}>
                  <strong>
                    {value} <small>{unit}</small>
                  </strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <section className="card">
              <div className="card-header">
                <h3>Alerts &amp; Upcoming Updates</h3>
                <button
                  className="btn primary small"
                  onClick={() => setFormModal("alert")}
                >
                  + Create Alert
                </button>
              </div>
              <div className="stat-grid">
                <div className="stat-box">
                  <span>Next data refresh</span>
                  <strong>Daily 06:00</strong>
                  <small>Scheduled system refresh</small>
                </div>
                <div className="stat-box">
                  <span>Next feedback review</span>
                  <strong>Pending</strong>
                  <small>No review date set</small>
                </div>
                <div className="stat-box">
                  <span>Open exceptions</span>
                  <strong>2</strong>
                  <small>Finance and Plant Matrix</small>
                </div>
              </div>
            </section>
            <section className="card">
              <div className="card-header">
                <h3>Allocation Forecast</h3>
                <span className="badge ok">2026 vs 2025</span>
              </div>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>List</th>
                      <th>Previous Year Allocation</th>
                      <th>Current Year Forecast</th>
                      <th>Variance</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Co-Man</td>
                      <td>10,850 MT</td>
                      <td>11,420 MT</td>
                      <td className="positive">+570 MT / +5.25%</td>
                      <td>
                        <span className="badge ok">Ahead</span>
                      </td>
                    </tr>
                    <tr>
                      <td>US-Core</td>
                      <td>18,900 MT</td>
                      <td>18,540 MT</td>
                      <td className="negative">-360 MT / -1.90%</td>
                      <td>
                        <span className="badge warn">Review</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Canada</td>
                      <td>6,740 MT</td>
                      <td>7,020 MT</td>
                      <td className="positive">+280 MT / +4.15%</td>
                      <td>
                        <span className="badge ok">Ahead</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            <div className="chart-grid">
              <section className="card chart-card">
                <div className="card-header"><h3>US Position / {commodity} · {period}</h3><select aria-label="Commodity selector" value={commodity} onChange={(event) => setCommodity(event.target.value)}><option>Wheat</option><option>Oats</option><option>Oil</option></select></div>
                <Bar
                  data={volumeData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                  }}
                />
              </section>
              <section className="card chart-card">
                <h3>Production &amp; Commodity Usage Ratio / US</h3>
                <Line
                  data={chartData}
                  options={{ responsive: true, maintainAspectRatio: false }}
                />
              </section>
              <section className="card chart-card">
                <h3>Raw Index vs Plan / US</h3>
                <Bar
                  data={indexData}
                  options={{ responsive: true, maintainAspectRatio: false }}
                />
              </section>
              <section className="card chart-card">
                <h3>Raw Usage vs Plan / US</h3>
                <Bar
                  data={usageData}
                  options={{ responsive: true, maintainAspectRatio: false }}
                />
              </section>
            </div>
            <section className="card">
              <div className="card-header">
                <h3>Recent Trends</h3>
                <span className="badge ok">Last 30 Days</span>
              </div>
              <div className="grid-trends">
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Metric</th>
                        <th>Current</th>
                        <th>Previous</th>
                        <th>Trend</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Commodity Cost</td>
                        <td>$486.72 / MT</td>
                        <td>$477.65 / MT</td>
                        <td className="positive">▲ 1.90%</td>
                      </tr>
                      <tr>
                        <td>Actual / Forecast</td>
                        <td>35,779 MT</td>
                        <td>34,940 MT</td>
                        <td className="positive">▲ 2.40%</td>
                      </tr>
                      <tr>
                        <td>Index to Plan</td>
                        <td>99.08%</td>
                        <td>97.86%</td>
                        <td className="positive">▲ 1.22 pts</td>
                      </tr>
                      <tr>
                        <td>Finance Spend</td>
                        <td>$18.42M</td>
                        <td>$17.91M</td>
                        <td className="positive">▲ 2.85%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="trend-chart">
                  <Line
                    data={chartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                      scales: { y: { min: 95, max: 102 } },
                    }}
                  />
                </div>
              </div>
            </section>
          </>
        )}
        {tab === "Admin" ? (
          <>
            <div className="card admin-search">
              <div className="card-header">
                <h3>Administration Lists</h3>
                <div className="search">
                  <TimeframeFilter
                    value={timeframe}
                    onChange={handleTimeframeChange}
                  />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search users, plants or growers"
                  />
                </div>
              </div>
            </div>
            <AdminWorkspace query={query} onAdd={handleAdd} />
          </>
        ) : tab === "Finance" ? (
          <FinanceWorkspace
            query={query}
            onMessage={setQuery}
            timeframe={timeframe}
            onTimeframeChange={handleTimeframeChange}
          />
        ) : tab === "Forecast" ? (
          <ForecastWorkspace
            query={query}
            onMessage={setQuery}
            timeframe={timeframe}
            onTimeframeChange={handleTimeframeChange}
          />
        ) : (
          <section className="card">
            <div className="card-header">
              <h3>
                {tab === "Home"
                  ? "Recent Commodity Activity"
                  : `${tab} Records`}
              </h3>
              <div className="search">
                <TimeframeFilter
                  value={timeframe}
                  onChange={handleTimeframeChange}
                />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search records"
                />
              </div>
            </div>
            <DataTable tab={tab} query={query} />
          </section>
        )}
        {tab !== "Home" && (
          <div className="stat-grid">
            <div className="stat-box">
              <span>Records in view</span>
              <strong>{rows[tab].length}</strong>
            </div>
            <div className="stat-box">
              <span>Needs attention</span>
              <strong>
                {
                  rows[tab].filter((row) =>
                    ["Review", "Pending", "Exception", "Inactive"].includes(
                      row[row.length - 1],
                    ),
                  ).length
                }
              </strong>
            </div>
            <div className="stat-box">
              <span>Last refresh</span>
              <strong>06:00</strong>
            </div>
          </div>
        )}
      </main>
      <footer>© 2026 Commodity Buying Tool</footer>
      {message && (
        <div className="toast" onClick={() => setMessage("")}>
          {message}
        </div>
      )}
      {editRecord && (
        <EditPopup
          record={editRecord}
          mode={editMode}
          onClose={() => setEditRecord(null)}
          onSave={() =>
            setMessage(
              `${editMode === "add" ? "Record added to" : "Updated"} ${editRecord.name}`,
            )
          }
        />
      )}
      {formModal && (
        <div className="modal-backdrop" onClick={() => setFormModal("")}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="card-header">
              <h3>
                {formModal === "feedback" ? "Share Feedback" : "Create Alert"}
              </h3>
              <button className="close" onClick={() => setFormModal("")}>
                ×
              </button>
            </div>
            <div className="form-grid">
              <label>
                {formModal === "feedback" ? "Feedback Type" : "Alert Type"}
                <select>
                  <option>
                    {formModal === "feedback"
                      ? "General feedback"
                      : "Data refresh reminder"}
                  </option>
                  <option>
                    {formModal === "feedback"
                      ? "Bug report"
                      : "Exception notification"}
                  </option>
                </select>
              </label>
              <label>
                {formModal === "feedback" ? "Rating" : "Frequency"}
                <select>
                  <option>
                    {formModal === "feedback" ? "5 - Excellent" : "Daily"}
                  </option>
                  <option>
                    {formModal === "feedback" ? "4 - Good" : "Weekly"}
                  </option>
                </select>
              </label>
              <label>
                {formModal === "feedback" ? "Your Name" : "Recipient"}
                <input
                  id="alertRecipient"
                  placeholder={
                    formModal === "feedback" ? "Name" : "Email or team name"
                  }
                />
              </label>
              <label>
                {formModal === "feedback" ? "Email" : "Alert Time"}
                <input
                  type={formModal === "feedback" ? "email" : "time"}
                  defaultValue={formModal === "alert" ? "06:00" : undefined}
                  placeholder={
                    formModal === "feedback" ? "name@example.com" : undefined
                  }
                />
              </label>
              <label className="full-field">
                {formModal === "feedback" ? "Comments" : "Message"}
                <textarea
                  id="alertMessage"
                  rows="5"
                  placeholder={
                    formModal === "feedback"
                      ? "Tell us what would improve your experience"
                      : "Enter the alert message"
                  }
                />
              </label>
            </div>
            <div className="modal-actions">
              <button className="btn" onClick={() => setFormModal("")}>
                Cancel
              </button>
              <button
                className="btn primary"
                onClick={() => {
                  const recipient =
                    document.getElementById("alertRecipient")?.value;
                  const alertMessage =
                    document.getElementById("alertMessage")?.value;
                  setFormModal("");
                  if (formModal === "alert")
                    setAlertBanner({
                      type: "Data refresh reminder",
                      frequency: "Daily at 06:00",
                      recipient,
                      message: alertMessage,
                    });
                  setMessage(
                    formModal === "feedback"
                      ? "Thank you for your feedback"
                      : "Alert created successfully",
                  );
                }}
              >
                {formModal === "feedback" ? "Submit Feedback" : "Create Alert"}
              </button>
            </div>
          </div>
        </div>
      )}
      {subView && (
        <div className="modal-backdrop" onClick={() => setSubView("")}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="card-header">
              <h3>{subView === "exceptions" ? "Exceptions" : "Details"}</h3>
              <button className="close" onClick={() => setSubView("")}>
                ×
              </button>
            </div>
            {subView === "exceptions" ? (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Severity</th>
                      <th>Area</th>
                      <th>Issue</th>
                      <th>Owner</th>
                      <th>Due Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <span className="badge off">High</span>
                      </td>
                      <td>Finance</td>
                      <td>Corn rate above threshold</td>
                      <td>Finance Team</td>
                      <td>12-Sep-2026</td>
                      <td>
                        <span className="badge warn">Open</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="badge warn">Medium</span>
                      </td>
                      <td>Plant Matrix</td>
                      <td>CAMBRIDGE allocation below plan</td>
                      <td>Supply Planning</td>
                      <td>15-Sep-2026</td>
                      <td>
                        <span className="badge warn">In Review</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="badge warn">Medium</span>
                      </td>
                      <td>ERP</td>
                      <td>Daily ERP refresh in progress</td>
                      <td>ERP Operations</td>
                      <td>10-Sep-2026</td>
                      <td>
                        <span className="badge warn">In Progress</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Record ID</th>
                      <th>Record</th>
                      <th>Category</th>
                      <th>Owner</th>
                      <th>Updated</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>DT-1001</td>
                      <td>Wheat allocation</td>
                      <td>Plant Matrix</td>
                      <td>Supply Planning</td>
                      <td>09-Sep-2026</td>
                      <td>
                        <span className="badge ok">Active</span>
                      </td>
                    </tr>
                    <tr>
                      <td>DT-1002</td>
                      <td>Oats ownership</td>
                      <td>Ownership</td>
                      <td>Daniel Brown</td>
                      <td>08-Sep-2026</td>
                      <td>
                        <span className="badge ok">Active</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
      {modal && (
        <div className="modal-backdrop" onClick={() => setModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="card-header">
              <h3>PC Volume Plan</h3>
              <button className="close" onClick={() => setModal(false)}>
                ×
              </button>
            </div>
            <div className="form-grid">
              <label>
                Period
                <select>
                  <option>P10</option>
                  <option>P11</option>
                </select>
              </label>
              <label>
                Week
                <select>
                  <option>W1</option>
                  <option>W2</option>
                </select>
              </label>
              <label>
                Plant
                <select>
                  <option>All Plants</option>
                  <option>BELOIT PLANT</option>
                </select>
              </label>
              <label>
                Commodity
                <select>
                  <option>Wheat</option>
                  <option>Oats</option>
                  <option>Oil</option>
                </select>
              </label>
              <label>
                Plan Volume (MT)
                <input type="number" placeholder="0" />
              </label>
              <label>
                Forecast Volume (MT)
                <input type="number" placeholder="0" />
              </label>
            </div>
            <button
              className="btn primary"
              onClick={() => {
                setModal(false);
                setMessage("PC volume plan saved");
              }}
            >
              Save Plan
            </button>
          </div>
        </div>
      )}
      {copilot && (
        <Copilot
          initialMessage={copilotPrompt}
          activeTab={tab}
          period={period}
          onClose={() => {
            setCopilot(false);
            setCopilotPrompt("");
          }}
        />
      )}
    </div>
  );
}

function Copilot({ initialMessage, activeTab, period, onClose }) {
  const [input, setInput] = useState(initialMessage || "");
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi, I'm Natasha. Ask about plan variance, plant allocations, forecast accuracy or commodity rates.",
    },
  ]);
  useEffect(() => {
    if (initialMessage)
      setMessages((current) => [
        ...current,
        { role: "user", text: initialMessage },
        {
          role: "bot",
          text: "CAMBRIDGE PLANT is the only plant flagged Review. Finance also has one exception: Corn is +3.10% over budget.",
        },
      ]);
  }, [initialMessage]);
  const replyFor = (question) => {
    const normalized = question.toLowerCase();
    if (
      normalized.includes("finance") ||
      normalized.includes("rate") ||
      normalized.includes("budget")
    )
      return `Finance context: Corn (CR-021) is +3.10% over budget, above the 2% approval threshold. Wheat is +2.32% over budget. Current view: ${activeTab}, ${period}.`;
    if (
      normalized.includes("plant") ||
      normalized.includes("allocation") ||
      normalized.includes("behind")
    )
      return `Allocation context: CAMBRIDGE PLANT is the only plant flagged Review, while OMAHA PLANT carries 7,210 MT. You are viewing ${activeTab} for ${period}.`;
    if (normalized.includes("forecast") || normalized.includes("accuracy"))
      return `Forecast context: accuracy is 96.4%. Wheat is at 99.01% to plan, Oats at 100.85%, and Oil at 97.27%. The active period is ${period}.`;
    if (normalized.includes("ownership") || normalized.includes("owner"))
      return "Ownership context: Oats at CAMBRIDGE PLANT is assigned to Daniel Brown and remains in Review. Active coverage is 18 owners across 4 regions.";
    if (normalized.includes("exception") || normalized.includes("issue"))
      return "There are 3 open exceptions: Corn rate above the Finance threshold, CAMBRIDGE allocation below plan, and the Daily ERP refresh in progress. Open the Exceptions view for owners and due dates.";
    if (
      normalized.includes("user") ||
      normalized.includes("admin") ||
      normalized.includes("grower")
    )
      return "Admin context: OMAHA PLANT is Inactive, Daniel Brown is Pending, and Maple Fields Ltd. is awaiting grower certification.";
    if (
      normalized.includes("period") ||
      normalized.includes("week") ||
      normalized.includes("month")
    )
      return `The active dashboard period is ${period}. Change the selector in the toolbar and ask again to compare the refreshed context.`;
    return `I’m looking at ${activeTab} for ${period}. Ask about allocations, finance rates, forecast accuracy, ownership, exceptions, users, or growers.`;
  };
  const send = () => {
    if (!input.trim()) return;
    setMessages((current) => [
      ...current,
      { role: "user", text: input },
      { role: "bot", text: replyFor(input) },
    ]);
    setInput("");
  };
  return (
    <>
      <div className="copilot-overlay" onClick={onClose}></div>
      <section className="copilot">
        <div className="copilot-head">
          <img
            className="natasha-avatar"
            src={`${import.meta.env.BASE_URL}natasha-wand.png`}
            alt="Natasha holding a wand"
            style={{
              width: 28,
              height: 28,
              flex: "0 0 28px",
              objectFit: "cover",
              objectPosition: "50% 12%",
            }}
          />
          <div>
            <b>Natasha</b>
            <small>Connected to operational data</small>
          </div>
          <button className="close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="messages">
          {messages.map((item, index) => (
            <div
              className={`message ${item.role}`}
              key={`${item.text}-${index}`}
            >
              {item.text}
            </div>
          ))}
        </div>
        <div className="suggestions">
          <button
            onClick={() => setInput("Which plants are behind allocation?")}
          >
            Plants behind allocation
          </button>
          <button onClick={() => setInput("Summarize finance exceptions")}>
            Finance exceptions
          </button>
        </div>
        <div className="copilot-input">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask Natasha"
          />
          <button onClick={send}>Send</button>
        </div>
      </section>
    </>
  );
}

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [tab, setTab] = useState("Home");
  return authenticated ? (
    <Dashboard
      tab={tab}
      setTab={setTab}
      onLogout={() => setAuthenticated(false)}
    />
  ) : (
    <Login onLogin={() => setAuthenticated(true)} />
  );
}

createRoot(document.getElementById("root")).render(<App />);
