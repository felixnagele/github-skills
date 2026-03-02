import ResourceView from "./ResourceView";

const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts`
  : "http://localhost:8000/api/workouts";

function Workouts() {
  return (
    <ResourceView
      resourceKey="workouts"
      title="Workouts"
      emptyMessage="No workouts found."
      apiUrl={apiUrl}
    />
  );
}

export default Workouts;
