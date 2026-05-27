import { DocPage } from '@/components/doc-page';
import { PlaceholderImage } from '@/components/placeholder-image';
import Image from 'next/image';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';

export default async function ApiIntegrationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <DocPage
      title="Data Export & API Integration"
      description="Get your TreeMapper data out of the platform, either as a one click Excel export from the web dashboard or through a read only API for live integrations."
      pageId="api-integration"
    >
      <h2>Your data belongs to you</h2>
      <p>
        All data you collect in TreeMapper is yours. This includes your projects, sites,
        species, interventions, trees, measurements, images, and team details. You can take
        this data out at any time, in full, with no lock in.
      </p>
      <p>You can move your data out in two ways:</p>
      <ol>
        <li>
          <strong>Excel export</strong> from the web dashboard, for reports, backups, and
          offline analysis.
        </li>
        <li>
          <strong>The TreeMapper API</strong>, for live, automated integration with other
          platforms.
        </li>
      </ol>

      <h2>Option 1: Export to Excel from the web dashboard</h2>
      <p>
        From the web dashboard you can export your data directly as an Excel file
        (<code>.xlsx</code>). No code is needed.
      </p>
      <p>You can export:</p>
      <ul>
        <li>
          <strong>Interventions</strong> (planting and other restoration activity, with trees
          and measurements)
        </li>
        <li>
          <strong>Species</strong> (the species used across your project)
        </li>
        <li>
          <strong>Site details</strong> (each site, its boundary, area, and status)
        </li>
        <li>
          <strong>Team details</strong> (members and their roles)
        </li>
      </ul>

      <div className="my-6 flex flex-col items-center justify-center">
        <div className="relative w-full max-w-4xl">
          <Image
            src="https://pub-261389c3bd084eb3a62686b2f08ce42b.r2.dev/docs/1779925283821-Data_export.png"
            alt="Excel export from the web dashboard"
            width={1920}
            height={1080}
            className="rounded-lg w-full h-auto"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
          />
        </div>
      </div>

      <h3>Custom filters</h3>
      <p>
        Before you export, you can narrow the data down to exactly what you need. For example,
        you can filter by date range so the file only contains records from a chosen period.
        Only the rows that match your filters are written to the Excel file, so the export
        stays focused and small.
      </p>

      <h3>Format</h3>
      <ul>
        <li>
          Exports are delivered as Excel (<code>.xlsx</code>) files.
        </li>
        <li>
          Each data type (interventions, species, sites, team) can be exported on its own.
        </li>
      </ul>

      <blockquote>
        Use Excel export when you want a snapshot for a report, an audit, or a backup. Use the
        API when you want another system to stay in sync automatically.
      </blockquote>

      <h2>Option 2: The TreeMapper API</h2>
      <p>
        The API lets another platform read your project data directly, on demand, without
        manual exports. It is designed for <strong>server to server</strong> integration:
        dashboards, data warehouses, GIS tools, or any backend that needs your latest
        TreeMapper data.
      </p>
      <p>Key points:</p>
      <ul>
        <li>
          <strong>Read only.</strong> The API only reads data. It cannot change or delete
          anything in your project.
        </li>
        <li>
          <strong>Scoped to one project.</strong> An API key belongs to a single project and
          can only read that project&apos;s data.
        </li>
        <li>
          <strong>Authenticated by API key.</strong> Every request must send a valid key in
          the <code>x-api-key</code> header.
        </li>
      </ul>
      <p>
        <strong>Base URL</strong>
      </p>
      <pre>
        <code>https://dash.treemapper.app/api/v1/public</code>
      </pre>

      <h3>Authentication</h3>
      <p>
        Send your API key in the <code>x-api-key</code> request header on every call.
      </p>
      <pre>
        <code>{`curl https://dash.treemapper.app/api/v1/public/project \\
  -H "x-api-key: tm_Xa9bQ2mKp7vL3nR8sT1wY6zD4fG0hJ5k"`}</code>
      </pre>
      <p>An API key looks like this:</p>
      <pre>
        <code>tm_Xa9bQ2mKp7vL3nR8sT1wY6zD4fG0hJ5k</code>
      </pre>
      <ul>
        <li>
          It always starts with the prefix <code>tm_</code>.
        </li>
        <li>
          The full key is shown to you <strong>only once</strong>, at the moment you generate
          it. Store it somewhere safe.
        </li>
        <li>
          After that, the dashboard only ever shows the first few characters (for example{' '}
          <code>tm_Xa9bQ2mKp••••••••</code>) so you can recognise which key is in use.
        </li>
      </ul>

      <h3>Managing your API key</h3>
      <p>
        You manage the key from the web dashboard, under{' '}
        <strong>Project Settings → API Access</strong>. Only project <strong>owners</strong>{' '}
        and <strong>admins</strong> can do this.
      </p>

  <div className="my-6 flex flex-col items-center justify-center">
        <div className="relative w-full max-w-4xl">
          <Image
            src="https://pub-261389c3bd084eb3a62686b2f08ce42b.r2.dev/docs/1779924382187-API.png"
            alt="Excel export from the web dashboard"
            width={1920}
            height={1080}
            className="rounded-lg w-full h-auto"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
          />
        </div>
      </div>

      <div className="overflow-x-auto my-6">
        <table className="w-full">
          <thead>
            <tr>
              <th>Action</th>
              <th>What it does</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Enable / Disable API</strong>
              </td>
              <td>
                A single toggle. When the API is disabled, every API request is rejected, even
                with a valid key. You can turn it on or off at any time.
              </td>
            </tr>
            <tr>
              <td>
                <strong>Generate</strong>
              </td>
              <td>Creates a new API key. The full key is shown once.</td>
            </tr>
            <tr>
              <td>
                <strong>Regenerate</strong>
              </td>
              <td>
                Replaces the current key with a new one. The old key stops working immediately.
                Use this if you rotate keys on a schedule or suspect a key was exposed.
              </td>
            </tr>
            <tr>
              <td>
                <strong>Revoke</strong>
              </td>
              <td>
                Deletes the key completely. All API access stops until you generate a new one.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        Because <strong>Enable/Disable</strong>, <strong>Regenerate</strong>, and{' '}
        <strong>Revoke</strong> all take effect instantly, you stay in full control. If you
        ever need to cut off access right away, disable the API or revoke the key.
      </p>

      <h3>Security</h3>
      <p>The API is built so that your key and your data stay protected.</p>
      <ul>
        <li>
          <strong>Keys are never stored in plain text.</strong> When you generate a key, the
          platform keeps only an irreversible <strong>SHA-256 hash</strong> of it. The original
          key cannot be recovered from what is stored, not even by Plant-for-the-Planet staff.
          This is why the full key is shown to you only once.
        </li>
        <li>
          <strong>Encrypted in transit.</strong> All API traffic uses{' '}
          <strong>HTTPS (TLS)</strong>, so the key and the data are encrypted while moving
          between your system and TreeMapper.
        </li>
        <li>
          <strong>Keep keys server side.</strong> Treat an API key like a password. Use it from
          your backend or scripts, not from browser or mobile client code where it could be
          read by others.
        </li>
        <li>
          <strong>You can cut off access at any time.</strong> Disabling the API, revoking the
          key, or regenerating it all take effect immediately.
        </li>
        <li>
          <strong>Usage is tracked.</strong> Each key records when it was last used, so you can
          spot a key that is active when it should not be.
        </li>
      </ul>
      <p>
        If a key is ever exposed, regenerate or revoke it from the dashboard. The old key stops
        working at once.
      </p>

      <h3>The three endpoints</h3>
      <p>
        All three are <code>GET</code> requests. None of them need any parameters in the URL:
        the project is identified automatically from your API key.
      </p>
      <div className="overflow-x-auto my-6">
        <table className="w-full">
          <thead>
            <tr>
              <th>Endpoint</th>
              <th>Returns</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>GET /api/v1/public/project</code>
              </td>
              <td>Information about the project the key belongs to</td>
            </tr>
            <tr>
              <td>
                <code>GET /api/v1/public/sites</code>
              </td>
              <td>All sites in the project</td>
            </tr>
            <tr>
              <td>
                <code>GET /api/v1/public/interventions</code>
              </td>
              <td>All interventions in the project, with trees, species, and geometry</td>
            </tr>
          </tbody>
        </table>
      </div>
      <blockquote>
        Note: interventions data is cached for up to 5 minutes for performance, so a brand new
        record may take a few minutes to appear.
      </blockquote>

      <h2>Response format</h2>
      <p>
        Every response is wrapped in a standard envelope. The real payload is always inside the{' '}
        <code>data</code> field.
      </p>
      <pre>
        <code>{`{
  "statusCode": 200,
  "message": "Success",
  "error": null,
  "data": { },
  "code": "success"
}`}</code>
      </pre>
      <p>The examples below show the <code>data</code> payload for each endpoint.</p>

      <h3>1. GET /api/v1/public/project</h3>
      <p>Returns a single project object.</p>
      <p>
        <strong>Request</strong>
      </p>
      <pre>
        <code>{`curl https://dash.treemapper.app/api/v1/public/project \\
  -H "x-api-key: tm_Xa9bQ2mKp7vL3nR8sT1wY6zD4fG0hJ5k"`}</code>
      </pre>
      <p>
        <strong>Response</strong>
      </p>
      <pre>
        <code>{`{
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
}`}</code>
      </pre>

      <h3>2. GET /api/v1/public/sites</h3>
      <p>Returns an array of sites.</p>
      <p>
        <strong>Request</strong>
      </p>
      <pre>
        <code>{`curl https://dash.treemapper.app/api/v1/public/sites \\
  -H "x-api-key: tm_Xa9bQ2mKp7vL3nR8sT1wY6zD4fG0hJ5k"`}</code>
      </pre>
      <p>
        <strong>Response</strong>
      </p>
      <pre>
        <code>{`{
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
}`}</code>
      </pre>

      <h3>3. GET /api/v1/public/interventions</h3>
      <p>
        Returns an array of interventions. This is the richest response. Each intervention
        includes its type, dates, geometry, the species planted (<code>plantedSpecies</code>),
        and, for multi tree interventions, the individual sample trees
        (<code>sampleInterventions</code>).
      </p>
      <p>The two most common types are:</p>
      <ul>
        <li>
          <code>single-tree-registration</code> — one tree. Tree level fields such as{' '}
          <code>tag</code>, <code>measurements</code>, and <code>scientificName</code> are
          filled in directly on the intervention.
        </li>
        <li>
          <code>multi-tree-registration</code> (and <code>enrichment-planting</code>) — many
          trees. The planted species are listed in <code>plantedSpecies</code>, and measured
          sample trees are listed in <code>sampleInterventions</code>.
        </li>
      </ul>
      <p>
        <strong>Request</strong>
      </p>
      <pre>
        <code>{`curl https://dash.treemapper.app/api/v1/public/interventions \\
  -H "x-api-key: tm_Xa9bQ2mKp7vL3nR8sT1wY6zD4fG0hJ5k"`}</code>
      </pre>
      <p>
        <strong>Response</strong>
      </p>
      <pre>
        <code>{`{
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
}`}</code>
      </pre>

      <h4>Field notes for interventions</h4>
      <div className="overflow-x-auto my-6">
        <table className="w-full">
          <thead>
            <tr>
              <th>Field</th>
              <th>Meaning</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>id</code></td>
              <td>Unique ID of the intervention (or sample tree).</td>
            </tr>
            <tr>
              <td><code>hid</code></td>
              <td>Short human readable ID.</td>
            </tr>
            <tr>
              <td><code>type</code></td>
              <td>
                Intervention type, for example <code>single-tree-registration</code> or{' '}
                <code>multi-tree-registration</code>.
              </td>
            </tr>
            <tr>
              <td><code>scientificName</code></td>
              <td>
                Species name. Filled for single tree interventions; for multi tree, see{' '}
                <code>plantedSpecies</code>.
              </td>
            </tr>
            <tr>
              <td><code>otherSpecies</code></td>
              <td>
                <code>&quot;Unknown&quot;</code> when the species was not identified, otherwise{' '}
                <code>null</code>.
              </td>
            </tr>
            <tr>
              <td><code>tag</code></td>
              <td>Physical tag on the tree, if any.</td>
            </tr>
            <tr>
              <td><code>measurements</code></td>
              <td>
                <code>{`{ height, width }`}</code> in metres. <code>null</code> for multi tree
                interventions.
              </td>
            </tr>
            <tr>
              <td><code>sampleTreeCount</code></td>
              <td>Number of sample trees recorded for a multi tree intervention.</td>
            </tr>
            <tr>
              <td><code>plantProject</code></td>
              <td>UID of the project.</td>
            </tr>
            <tr>
              <td><code>plantProjectSite</code></td>
              <td>UID of the site, or <code>null</code> if not tied to a site.</td>
            </tr>
            <tr>
              <td><code>plantedSpecies</code></td>
              <td>List of species planted, each with its own <code>treeCount</code>.</td>
            </tr>
            <tr>
              <td><code>sampleInterventions</code></td>
              <td>Individual sample trees measured inside a multi tree intervention.</td>
            </tr>
            <tr>
              <td><code>geometry</code> / <code>originalGeometry</code></td>
              <td>GeoJSON location of the intervention.</td>
            </tr>
            <tr>
              <td><code>deviceLocation</code></td>
              <td>GeoJSON point of the device when the record was captured.</td>
            </tr>
            <tr>
              <td><code>captureMode</code> / <code>captureStatus</code></td>
              <td>How and in what state the record was captured.</td>
            </tr>
            <tr>
              <td><code>coordinates</code></td>
              <td>Array holding the tree image URL(s).</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Error responses</h2>
      <div className="overflow-x-auto my-6">
        <table className="w-full">
          <thead>
            <tr>
              <th>Status</th>
              <th>When it happens</th>
              <th>Meaning</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>401 Unauthorized</code></td>
              <td>The <code>x-api-key</code> header is missing</td>
              <td><code>Missing API key</code></td>
            </tr>
            <tr>
              <td><code>401 Unauthorized</code></td>
              <td>The key does not match any active key</td>
              <td><code>Invalid API key</code></td>
            </tr>
            <tr>
              <td><code>403 Forbidden</code></td>
              <td>
                The key is valid but the API is turned off for the project, or the project was
                deleted
              </td>
              <td><code>API access is disabled for this project</code></td>
            </tr>
            <tr>
              <td><code>404 Not Found</code></td>
              <td>The project or resource cannot be found</td>
              <td><code>Project not found</code></td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>Example error body:</p>
      <pre>
        <code>{`{
  "statusCode": 401,
  "message": "Invalid API key",
  "error": "Unauthorized",
  "data": null,
  "code": "error"
}`}</code>
      </pre>

      <h2>Key management endpoints (reference)</h2>
      <p>
        These are the endpoints behind the dashboard buttons. They are called by the web
        dashboard on your behalf and require you to be signed in as a project{' '}
        <strong>owner</strong> or <strong>admin</strong> (they use your normal login, not the
        API key). They are listed here for completeness.
      </p>
      <div className="overflow-x-auto my-6">
        <table className="w-full">
          <thead>
            <tr>
              <th>Method</th>
              <th>Path</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>GET</code></td>
              <td><code>/api/projects/{'{projectUid}'}/api-key</code></td>
              <td>Get key status. Never returns the secret key.</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/projects/{'{projectUid}'}/api-key</code></td>
              <td>Generate or regenerate the key. Returns the plaintext key once.</td>
            </tr>
            <tr>
              <td><code>DELETE</code></td>
              <td><code>/api/projects/{'{projectUid}'}/api-key</code></td>
              <td>Revoke the key.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>Status response (GET)</strong>
      </p>
      <pre>
        <code>{`{
  "exists": true,
  "keyPrefix": "tm_Xa9bQ2mKp",
  "lastUsedAt": "2026-05-27T18:42:09.000Z",
  "createdAt": "2026-05-01T10:00:00.000Z"
}`}</code>
      </pre>
      <p>
        <strong>Generate / regenerate response (POST)</strong>
      </p>
      <pre>
        <code>{`{
  "apiKey": "tm_Xa9bQ2mKp7vL3nR8sT1wY6zD4fG0hJ5k",
  "keyPrefix": "tm_Xa9bQ2mKp",
  "createdAt": "2026-05-28T08:15:30.000Z"
}`}</code>
      </pre>
      <blockquote>
        <code>apiKey</code> is the only time the full key is returned. Copy it immediately.
      </blockquote>
      <p>
        <strong>Revoke response (DELETE)</strong>
      </p>
      <pre>
        <code>{`{
  "revoked": true
}`}</code>
      </pre>

      <h2>Quick checklist for connecting another platform</h2>
      <ol>
        <li>
          In the web dashboard, open <strong>Project Settings → API Access</strong>.
        </li>
        <li>
          Turn the <strong>API toggle on</strong>.
        </li>
        <li>
          Click <strong>Generate API key</strong> and copy the full key.
        </li>
        <li>Store the key as a secret in your other platform (server side).</li>
        <li>
          Call the endpoints with the <code>x-api-key</code> header.
        </li>
        <li>
          To rotate, click <strong>Regenerate</strong>. To stop access,{' '}
          <strong>Disable</strong> the toggle or <strong>Revoke</strong> the key.
        </li>
      </ol>

      <h2>Related topics</h2>
      <ul>
        <li>
          <Link href={`/${locale}/docs/concepts/data-export`}>Data Export</Link>
        </li>
        <li>
          <Link href={`/${locale}/docs/web/reports`}>Reports &amp; Analytics</Link>
        </li>
      </ul>
    </DocPage>
  );
}
