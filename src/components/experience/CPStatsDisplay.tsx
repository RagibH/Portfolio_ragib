import { competitiveProgrammingInfo } from "./data";

function getValue(label: string) {
  const item = competitiveProgrammingInfo.find((entry) => entry.label === label);
  if (!item) return "";
  return Array.isArray(item.value) ? item.value.join(", ") : item.value;
}

function getList(label: string) {
  const item = competitiveProgrammingInfo.find((entry) => entry.label === label);
  if (!item || !Array.isArray(item.value)) return [];
  return item.value;
}

export default function CPStatsDisplay() {
  const platforms = getList("Platforms");

  return (
    <div className="cp-stats-display">
      <div className="cp-stats-grid">
        <article className="cp-stat-block cp-stat-block--featured">
          <p className="cp-stat-block__value">{getValue("Solved Problems")}</p>
          <p className="cp-stat-block__label">Solved Problems</p>
        </article>

        <article className="cp-stat-block cp-stat-block--featured">
          <p className="cp-stat-block__value">{getValue("Highest Rating")}</p>
          <p className="cp-stat-block__label">Highest Rating</p>
        </article>

        <article className="cp-stat-block">
          <p className="cp-stat-block__value">{getValue("Programming Language")}</p>
          <p className="cp-stat-block__label">Programming Language</p>
        </article>
      </div>

      <div className="cp-platforms">
        <p className="cp-platforms__label">Platforms</p>
        <ul className="cp-platforms__list">
          {platforms.map((platform) => (
            <li key={platform}>
              <span className="cp-platform-pill">{platform}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
