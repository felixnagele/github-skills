import ResourceView from "./ResourceView";

const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard`
  : "http://localhost:8000/api/leaderboard";

function Leaderboard() {
  return (
    <ResourceView
      resourceKey="leaderboard"
      title="Leaderboard"
      emptyMessage="No leaderboard entries found."
      apiUrl={apiUrl}
    />
  );
}

export default Leaderboard;
