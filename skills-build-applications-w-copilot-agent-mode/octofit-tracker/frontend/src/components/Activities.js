import ResourceView from "./ResourceView";

const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities`
  : "http://localhost:8000/api/activities";

function Activities() {
  return (
    <ResourceView
      resourceKey="activities"
      title="Activities"
      emptyMessage="No activities found."
      apiUrl={apiUrl}
    />
  );
}

export default Activities;
