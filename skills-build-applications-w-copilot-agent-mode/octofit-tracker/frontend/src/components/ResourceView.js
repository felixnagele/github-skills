import { useCallback, useEffect, useMemo, useState } from "react";

function ResourceView({ resourceKey, title, emptyMessage, apiUrl }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const endpoint = useMemo(() => {
    if (apiUrl) {
      return apiUrl.endsWith("/") ? apiUrl : `${apiUrl}/`;
    }
    const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
    const apiBaseUrl = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api`
      : "http://localhost:8000/api";

    return `${apiBaseUrl}/${resourceKey}/`;
  }, [apiUrl, resourceKey]);

  const fetchItems = useCallback(() => {
    console.log(`[${title}] REST API endpoint:`, endpoint);
    setLoading(true);
    setError("");

    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        console.log(`[${title}] fetched data:`, data);
        const normalizedData = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
            ? data.results
            : [];
        setItems(normalizedData);
      })
      .catch((fetchError) => {
        console.error(`[${title}] fetch error:`, fetchError);
        setError(fetchError.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [endpoint, title]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return items;
    }

    return items.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(normalizedQuery),
    );
  }, [items, query]);

  return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-body-tertiary d-flex flex-wrap gap-2 justify-content-between align-items-center">
        <div>
          <h2 className="h4 mb-1">{title}</h2>
          <a
            className="link-primary text-decoration-none"
            href={endpoint}
            target="_blank"
            rel="noreferrer"
          >
            Open REST endpoint
          </a>
        </div>
        <button type="button" className="btn btn-primary" onClick={fetchItems}>
          Refresh Data
        </button>
      </div>

      <div className="card-body">
        <form
          className="row g-2 mb-3"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <div className="col-12 col-md-8 col-lg-6">
            <label
              htmlFor={`${resourceKey}-search`}
              className="form-label mb-1"
            >
              Filter rows
            </label>
            <input
              id={`${resourceKey}-search`}
              className="form-control"
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Type to filter table data"
            />
          </div>
          <div className="col-12 col-md-auto align-self-end">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setQuery("")}
            >
              Clear Filter
            </button>
          </div>
        </form>

        {error && (
          <div className="alert alert-danger" role="alert">
            Failed to load: {error}
          </div>
        )}

        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th scope="col" style={{ width: "72px" }}>
                  #
                </th>
                <th scope="col" style={{ width: "180px" }}>
                  ID
                </th>
                <th scope="col">Summary</th>
                <th scope="col" className="text-end" style={{ width: "140px" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {!error && loading && (
                <tr>
                  <td colSpan={4} className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              )}

              {!error && !loading && filteredItems.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-4">
                    {emptyMessage}
                  </td>
                </tr>
              )}

              {!error &&
                !loading &&
                filteredItems.map((item, index) => {
                  const id = item.id ?? item._id ?? "-";
                  const keys = Object.keys(item).slice(0, 3);
                  const summary = keys
                    .map((key) => `${key}: ${String(item[key])}`)
                    .join(" | ");

                  return (
                    <tr key={item.id ?? item._id ?? index}>
                      <td>{index + 1}</td>
                      <td className="text-break">{id}</td>
                      <td className="text-break">{summary || "No summary"}</td>
                      <td className="text-end">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => setSelectedItem(item)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {selectedItem && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div
              className="modal-dialog modal-lg modal-dialog-scrollable"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="modal-title h5 mb-0">{title} Details</h3>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setSelectedItem(null)}
                  />
                </div>
                <div className="modal-body">
                  <pre className="mb-0 json-preview">
                    {JSON.stringify(selectedItem, null, 2)}
                  </pre>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setSelectedItem(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" />
        </>
      )}
    </div>
  );
}

export default ResourceView;
