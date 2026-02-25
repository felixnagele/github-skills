import ResourceView from "./ResourceView";

function Users() {
  return (
    <ResourceView
      resourceKey="users"
      title="Users"
      emptyMessage="No users found."
    />
  );
}

export default Users;
