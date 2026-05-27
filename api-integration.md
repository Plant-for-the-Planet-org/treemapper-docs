# TreeMapper Data Export and API Integration

This page explains how to get your TreeMapper data out of the platform. There are two ways: a one click Excel export from the web dashboard, and a read only API for live integrations with other platforms.

---

## Your data belongs to you

All data you collect in TreeMapper is yours. This includes your projects, sites, species, interventions, trees, measurements, images, and team details. You can take this data out at any time, in full, with no lock in.

You can move your data out in two ways:

1. **Excel export** from the web dashboard, for reports, backups, and offline analysis.
2. **The TreeMapper API**, for live, automated integration with other platforms.

---

## Option 1: Export to Excel from the web dashboard

From the web dashboard you can export your data directly as an Excel file (`.xlsx`). No code is needed.

You can export:

- **Interventions** (planting and other restoration activity, with trees and measurements)
- **Species** (the species used across your project)
- **Site details** (each site, its boundary, area, and status)
- **Team details** (members and their roles)

### Custom filters

Before you export, you can narrow the data down to exactly what you need. For example, you can filter by date range so the file only contains records from a chosen period. Only the rows that match your filters are written to the Excel file, so the export stays focused and small.

### Format

- Exports are delivered as Excel (`.xlsx`) files.
- Each data type (interventions, species, sites, team) can be exported on its own.

> Use Excel export when you want a snapshot for a report, an audit, or a backup. Use the API when you want another system to stay in sync automatically.

---

## Option 2: The TreeMapper API

The API lets another platform read your project data directly, on demand, without manual exports. It is designed for **server to server** integration: dashboards, data warehouses, GIS tools, or any backend that needs your latest TreeMapper data.

Key points:

- **Read only.** The API only reads data. It cannot change or delete anything in your project.
- **Scoped to one project.** An API key belongs to a single project and can only read that project's data.
- **Authenticated by API key.** Every request must send a valid key in the `x-api-key` header.

**Base URL**

```
https://dash.treemapper.app/api/v1/public
```

---

### Authentication

Send your API key in the `x-api-key` request header on every call.

```bash
curl https://dash.treemapper.app/api/v1/public/project \
  -H "x-api-key: tm_Xa9bQ2mKp7vL3nR8sT1wY6zD4fG0hJ5k"
```

An API key looks like this:

```
tm_Xa9bQ2mKp7vL3nR8sT1wY6zD4fG0hJ5k
```

- It always starts with the prefix `tm_`.
- The full key is shown to you **only once**, at the moment you generate it. Store it somewhere safe.
- After that, the dashboard only ever shows the first few characters (for example `tm_Xa9bQ2mKp••••••••`) so you can recognise which key is in use.

---

### Managing your API key

You manage the key from the web dashboard, under **Project Settings → API Access**. Only project **owners** and **admins** can do this.

| Action | What it does |
| --- | --- |
| **Enable / Disable API** | A single toggle. When the API is disabled, every API request is rejected, even with a valid key. You can turn it on or off at any time. |
| **Generate** | Creates a new API key. The full key is shown once. |
| **Regenerate** | Replaces the current key with a new one. The old key stops working immediately. Use this if you rotate keys on a schedule or suspect a key was exposed. |
| **Revoke** | Deletes the key completely. All API access stops until you generate a new one. |

Because **Enable/Disable**, **Regenerate**, and **Revoke** all take effect instantly, you stay in full control. If you ever need to cut off access right away, disable the API or revoke the key.

---

### Security

The API is built so that your key and your data stay protected.

- **Keys are never stored in plain text.** When you generate a key, the platform keeps only an irreversible **SHA-256 hash** of it. The original key cannot be recovered from what is stored, not even by Plant-for-the-Planet staff. This is why the full key is shown to you only once.
- **Encrypted in transit.** All API traffic uses **HTTPS (TLS)**, so the key and the data are encrypted while moving between your system and TreeMapper.
- **Keep keys server side.** Treat an API key like a password. Use it from your backend or scripts, not from browser or mobile client code where it could be read by others.
- **You can cut off access at any time.** Disabling the API, revoking the key, or regenerating it all take effect immediately.
- **Usage is tracked.** Each key records when it was last used, so you can spot a key that is active when it should not be.

If a key is ever exposed, regenerate or revoke it from the dashboard. The old key stops working at once.

---

### The three endpoints

All three are `GET` requests. None of them need any parameters in the URL: the project is identified automatically from your API key.

| Endpoint | Returns |
| --- | --- |
| `GET /api/v1/public/project` | Information about the project the key belongs to |
| `GET /api/v1/public/sites` | All sites in the project |
| `GET /api/v1/public/interventions` | All interventions in the project, with trees, species, and geometry |

> Note: interventions data is cached for up to 5 minutes for performance, so a brand new record may take a few minutes to appear.

---

## Response format

Every response is wrapped in a standard envelope. The real payload is always inside the `data` field.

```json
{
  "statusCode": 200,
  "message": "Success",
  "error": null,
  "data": { },
  "code": "success"
}
```

The examples below show the `data` payload for each endpoint.

---

### 1. `GET /api/v1/public/project`

Returns a single project object.

**Request**

```bash
curl https://dash.treemapper.app/api/v1/public/project \
  -H "x-api-key: tm_Xa9bQ2mKp7vL3nR8sT1wY6zD4fG0hJ5k"
```

**Response**

```json
{
  "statusCode": 200,
  "message": "Success",
  "error": null,
  "code": "success",
  "data": {
    "uid": "proj_8f2c1a9b4d7e",
    "name": "Yamuna Floodplain Restoration",
    "slug": "yamuna-floodplain-restoration",
    "description": "Restoration of degraded floodplain along the Yamuna river.",
    "purpose": "trees",
    "type": "restoration",
    "ecosystem": "wetland",
    "scale": "medium",
    "classification": "large-scale-planting",
    "target": 250000,
    "country": "IN",
    "website": "https://example.org/yamuna",
    "image": "https://cdn.treemapper.app/projects/proj_8f2c1a9b4d7e/cover.jpg",
    "videoUrl": null,
    "location": {
      "type": "Polygon",
      "coordinates": [
        [
          [77.231, 28.612],
          [77.245, 28.612],
          [77.245, 28.624],
          [77.231, 28.624],
          [77.231, 28.612]
        ]
      ]
    },
    "createdAt": "2025-02-11T09:14:22.000Z",
    "updatedAt": "2026-04-30T16:02:51.000Z"
  }
}
```

---

### 2. `GET /api/v1/public/sites`

Returns an array of sites.

**Request**

```bash
curl https://dash.treemapper.app/api/v1/public/sites \
  -H "x-api-key: tm_Xa9bQ2mKp7vL3nR8sT1wY6zD4fG0hJ5k"
```

**Response**

```json
{
  "statusCode": 200,
  "message": "Success",
  "error": null,
  "code": "success",
  "data": [
    {
      "uid": "site_a1b2c3d4e5f6",
      "name": "North Bank Block A",
      "description": "Upstream block, sandy loam soil.",
      "location": {
        "type": "Polygon",
        "coordinates": [
          [
            [77.232, 28.615],
            [77.236, 28.615],
            [77.236, 28.619],
            [77.232, 28.619],
            [77.232, 28.615]
          ]
        ]
      },
      "area": 12.4,
      "status": "planting",
      "soilType": "sandy-loam",
      "elevation": 198,
      "slope": 3.2,
      "aspect": "NE",
      "plannedPlantingDate": "2026-07-01",
      "actualPlantingDate": "2026-07-05",
      "expectedTreeCount": 18000,
      "image": "https://cdn.treemapper.app/sites/site_a1b2c3d4e5f6/cover.jpg",
      "createdAt": "2025-03-02T07:41:10.000Z",
      "updatedAt": "2026-04-28T11:20:05.000Z"
    },
    {
      "uid": "site_99aa88bb77cc",
      "name": "South Bank Block B",
      "description": null,
      "location": {
        "type": "Polygon",
        "coordinates": [
          [
            [77.238, 28.610],
            [77.242, 28.610],
            [77.242, 28.614],
            [77.238, 28.614],
            [77.238, 28.610]
          ]
        ]
      },
      "area": 8.7,
      "status": "planned",
      "soilType": "clay",
      "elevation": 201,
      "slope": 1.0,
      "aspect": "S",
      "plannedPlantingDate": "2026-08-15",
      "actualPlantingDate": null,
      "expectedTreeCount": 9500,
      "image": null,
      "createdAt": "2025-05-19T13:05:44.000Z",
      "updatedAt": "2026-04-12T09:33:18.000Z"
    }
  ]
}
```

---

### 3. `GET /api/v1/public/interventions`

Returns an array of interventions. This is the richest response. Each intervention includes its type, dates, geometry, the species planted (`plantedSpecies`), and, for multi tree interventions, the individual sample trees (`sampleInterventions`).

The two most common types are:

- `single-tree-registration` — one tree. Tree level fields such as `tag`, `measurements`, and `scientificName` are filled in directly on the intervention.
- `multi-tree-registration` (and `enrichment-planting`) — many trees. The planted species are listed in `plantedSpecies`, and measured sample trees are listed in `sampleInterventions`.

**Request**

```bash
curl https://dash.treemapper.app/api/v1/public/interventions \
  -H "x-api-key: tm_Xa9bQ2mKp7vL3nR8sT1wY6zD4fG0hJ5k"
```

**Response**

```json
{
  "statusCode": 200,
  "message": "Success",
  "error": null,
  "code": "success",
  "data": [
    {
      "id": "intv_5d6e7f8a9b0c",
      "hid": "a1b2c3d4",
      "type": "single-tree-registration",
      "scientificName": "Dalbergia sissoo",
      "otherSpecies": null,
      "tag": "TREE-001",
      "plantDate": "2026-07-05 06:30:00",
      "registrationDate": "2026-07-05 07:10:42",
      "interventionStartDate": "2026-07-05 06:30:00",
      "interventionEndDate": "2026-07-05 06:30:00",
      "measurements": {
        "height": 1.2,
        "width": 0.04
      },
      "sampleTreeCount": null,
      "scientificSpecies": "spec_aa11bb22cc33",
      "plantProject": "proj_8f2c1a9b4d7e",
      "plantProjectSite": "site_a1b2c3d4e5f6",
      "coordinates": [
        { "image": "https://cdn.treemapper.app/trees/tree_001.jpg" }
      ],
      "geometry": {
        "type": "Point",
        "coordinates": [77.2341, 28.6172]
      },
      "originalGeometry": {
        "type": "Point",
        "coordinates": [77.2341, 28.6172]
      },
      "deviceLocation": {
        "type": "Point",
        "coordinates": [77.2340, 28.6171]
      },
      "captureMode": "on-site",
      "captureStatus": "complete",
      "idempotencyKey": "8f0a1c2d-3e4f-5a6b-7c8d-9e0f1a2b3c4d",
      "metadata": {},
      "plantedSpecies": [],
      "sampleInterventions": [],
      "history": [],
      "description": null,
      "statusReason": null,
      "status": null,
      "geometryUpdatesCount": 0,
      "nextMeasurementDate": null,
      "lastMeasurementDate": null
    },
    {
      "id": "intv_77665544aabb",
      "hid": "e5f6a7b8",
      "type": "multi-tree-registration",
      "scientificName": null,
      "otherSpecies": null,
      "tag": null,
      "plantDate": null,
      "registrationDate": "2026-07-06 05:55:11",
      "interventionStartDate": "2026-07-06 05:30:00",
      "interventionEndDate": "2026-07-06 09:45:00",
      "measurements": null,
      "sampleTreeCount": 25,
      "scientificSpecies": null,
      "plantProject": "proj_8f2c1a9b4d7e",
      "plantProjectSite": "site_a1b2c3d4e5f6",
      "coordinates": [
        { "image": "" }
      ],
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [77.2330, 28.6160],
            [77.2350, 28.6160],
            [77.2350, 28.6180],
            [77.2330, 28.6180],
            [77.2330, 28.6160]
          ]
        ]
      },
      "originalGeometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [77.2330, 28.6160],
            [77.2350, 28.6160],
            [77.2350, 28.6180],
            [77.2330, 28.6180],
            [77.2330, 28.6160]
          ]
        ]
      },
      "deviceLocation": {
        "type": "Point",
        "coordinates": [77.2339, 28.6170]
      },
      "captureMode": "on-site",
      "captureStatus": "complete",
      "idempotencyKey": "1b2c3d4e-5f6a-7b8c-9d0e-1f2a3b4c5d6e",
      "metadata": {},
      "plantedSpecies": [
        {
          "id": "ispec_12ab34cd56ef",
          "scientificName": "Dalbergia sissoo",
          "scientificSpecies": "spec_aa11bb22cc33",
          "otherSpecies": null,
          "treeCount": 1500,
          "created": "2026-07-06 05:55:11",
          "updated": "2026-07-06 05:55:11"
        },
        {
          "id": "ispec_98zy76xw54vu",
          "scientificName": null,
          "scientificSpecies": null,
          "otherSpecies": "Unknown",
          "treeCount": 300,
          "created": "2026-07-06 05:55:11",
          "updated": "2026-07-06 05:55:11"
        }
      ],
      "sampleInterventions": [
        {
          "id": "tree_aabbccddeeff",
          "parent": "intv_77665544aabb",
          "hid": "c9d8e7f6",
          "type": "sample-tree-registration",
          "tag": "SAMPLE-12",
          "scientificName": "Dalbergia sissoo",
          "otherSpecies": null,
          "scientificSpecies": "spec_aa11bb22cc33",
          "plantDate": "2026-07-06 06:05:00",
          "registrationDate": "2026-07-06 06:05:30",
          "interventionStartDate": "2026-07-06 05:30:00",
          "interventionEndDate": "2026-07-06 09:45:00",
          "measurements": {
            "height": 0.9,
            "width": 0.03
          },
          "plantProject": "proj_8f2c1a9b4d7e",
          "plantProjectSite": "site_a1b2c3d4e5f6",
          "coordinates": [
            { "image": "https://cdn.treemapper.app/trees/sample_12.jpg" }
          ],
          "geometry": {
            "type": "Point",
            "coordinates": [77.2342, 28.6173]
          },
          "originalGeometry": {
            "type": "Point",
            "coordinates": [77.2342, 28.6173]
          },
          "deviceLocation": {
            "type": "Point",
            "coordinates": [77.2341, 28.6172]
          },
          "captureMode": "on-site",
          "captureStatus": "complete",
          "idempotencyKey": "1b2c3d4e-5f6a-7b8c-9d0e-1f2a3b4c5d6e",
          "metadata": {},
          "profile": "",
          "plantedSpecies": [],
          "sampleInterventions": [],
          "history": [],
          "description": null,
          "statusReason": null,
          "status": null,
          "sampleTreeCount": null,
          "geometryUpdatesCount": 0,
          "nextMeasurementDate": null,
          "lastMeasurementDate": null
        }
      ],
      "history": [],
      "description": null,
      "statusReason": null,
      "status": null,
      "geometryUpdatesCount": 0,
      "nextMeasurementDate": null,
      "lastMeasurementDate": null
    }
  ]
}
```

**Field notes for interventions**

| Field | Meaning |
| --- | --- |
| `id` | Unique ID of the intervention (or sample tree). |
| `hid` | Short human readable ID. |
| `type` | Intervention type, for example `single-tree-registration` or `multi-tree-registration`. |
| `scientificName` | Species name. Filled for single tree interventions; for multi tree, see `plantedSpecies`. |
| `otherSpecies` | `"Unknown"` when the species was not identified, otherwise `null`. |
| `tag` | Physical tag on the tree, if any. |
| `measurements` | `{ height, width }` in metres. `null` for multi tree interventions. |
| `sampleTreeCount` | Number of sample trees recorded for a multi tree intervention. |
| `plantProject` | UID of the project. |
| `plantProjectSite` | UID of the site, or `null` if not tied to a site. |
| `plantedSpecies` | List of species planted, each with its own `treeCount`. |
| `sampleInterventions` | Individual sample trees measured inside a multi tree intervention. |
| `geometry` / `originalGeometry` | GeoJSON location of the intervention. |
| `deviceLocation` | GeoJSON point of the device when the record was captured. |
| `captureMode` / `captureStatus` | How and in what state the record was captured. |
| `coordinates` | Array holding the tree image URL(s). |

---

## Error responses

| Status | When it happens | Meaning |
| --- | --- | --- |
| `401 Unauthorized` | The `x-api-key` header is missing | `Missing API key` |
| `401 Unauthorized` | The key does not match any active key | `Invalid API key` |
| `403 Forbidden` | The key is valid but the API is turned off for the project, or the project was deleted | `API access is disabled for this project` |
| `404 Not Found` | The project or resource cannot be found | `Project not found` |

Example error body:

```json
{
  "statusCode": 401,
  "message": "Invalid API key",
  "error": "Unauthorized",
  "data": null,
  "code": "error"
}
```

---

## Key management endpoints (reference)

These are the endpoints behind the dashboard buttons. They are called by the web dashboard on your behalf and require you to be signed in as a project **owner** or **admin** (they use your normal login, not the API key). They are listed here for completeness.

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/api/projects/{projectUid}/api-key` | Get key status. Never returns the secret key. |
| `POST` | `/api/projects/{projectUid}/api-key` | Generate or regenerate the key. Returns the plaintext key once. |
| `DELETE` | `/api/projects/{projectUid}/api-key` | Revoke the key. |

**Status response (`GET`)**

```json
{
  "exists": true,
  "keyPrefix": "tm_Xa9bQ2mKp",
  "lastUsedAt": "2026-05-27T18:42:09.000Z",
  "createdAt": "2026-05-01T10:00:00.000Z"
}
```

**Generate / regenerate response (`POST`)**

```json
{
  "apiKey": "tm_Xa9bQ2mKp7vL3nR8sT1wY6zD4fG0hJ5k",
  "keyPrefix": "tm_Xa9bQ2mKp",
  "createdAt": "2026-05-28T08:15:30.000Z"
}
```

> `apiKey` is the only time the full key is returned. Copy it immediately.

**Revoke response (`DELETE`)**

```json
{
  "revoked": true
}
```

---

## Quick checklist for connecting another platform

1. In the web dashboard, open **Project Settings → API Access**.
2. Turn the **API toggle on**.
3. Click **Generate API key** and copy the full key.
4. Store the key as a secret in your other platform (server side).
5. Call the endpoints with the `x-api-key` header.
6. To rotate, click **Regenerate**. To stop access, **Disable** the toggle or **Revoke** the key.
