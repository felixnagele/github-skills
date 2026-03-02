# 📘 Assignment: FastAPI REST APIs

## 🎯 Objective

In dieser Aufgabe lernst du, eine REST API mit FastAPI zu entwerfen, Daten mit Pydantic zu validieren und typische CRUD-Endpunkte umzusetzen.

## 📝 Tasks

### 🛠️	API-Grundgerüst erstellen

#### Description
Erstelle eine FastAPI-Anwendung mit einem einfachen Datenmodell für „Books“. Implementiere Endpunkte zum Erstellen und Auslesen von Datensätzen in einer In‑Memory-Liste.

#### Requirements
Completed program should:

- eine FastAPI-App mit `app = FastAPI()` enthalten
- ein Pydantic-Modell `Book` mit den Feldern `id` (int), `title` (str) und `author` (str) definieren
- Endpunkte `POST /books` und `GET /books` bereitstellen

Beispiel:

```http
POST /books
{
  "id": 1,
  "title": "Der Prozess",
  "author": "Franz Kafka"
}
```

```json
[
  {
    "id": 1,
    "title": "Der Prozess",
    "author": "Franz Kafka"
  }
]
```


### 🛠️	CRUD erweitern und Fehler behandeln

#### Description
Erweitere die API um Endpunkte zum Lesen, Aktualisieren und Löschen einzelner Einträge. Behandle typische Fehlerfälle sauber mit passenden Statuscodes.

#### Requirements
Completed program should:

- `GET /books/{id}`, `PUT /books/{id}` und `DELETE /books/{id}` implementieren
- bei nicht gefundenen Einträgen einen `404`-Fehler zurückgeben
- bei erfolgreichem Löschen eine kurze Bestätigung im JSON-Format zurückgeben
