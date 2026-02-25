import ResourceView from "./ResourceView";

const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users`
  : "http://localhost:8000/api/users";

function Users() {
  return (
    <ResourceView
      resourceKey="users"
      title="Users"
      emptyMessage="No users found."
      apiUrl={apiUrl}
    />
  );
}

export default Users;
