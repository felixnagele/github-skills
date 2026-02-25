import ResourceView from "./ResourceView";

const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams`
  : "http://localhost:8000/api/teams";

function Teams() {
  return (
    <ResourceView
      resourceKey="teams"
      title="Teams"
      emptyMessage="No teams found."
      apiUrl={apiUrl}
    />
  );
}

export default Teams;
