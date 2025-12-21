

import pytest
from fastapi.testclient import TestClient
from src.app import app, activities
import copy

client = TestClient(app)

TEST_ACTIVITY = "Art Club"
TEST_EMAIL = "testuser@mergington.edu"

@pytest.fixture(autouse=True)
def setup_test_activity():
    # Setze nur die Teilnehmerliste der Test-Aktivität zurück
    activities[TEST_ACTIVITY]["participants"] = []

def test_get_activities():
    response = client.get("/activities")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, dict)
    assert TEST_ACTIVITY in data

