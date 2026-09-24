# Cartyators project notes

Internal provenance and accuracy notes for the portfolio assets. The Cartyators
source repository is private and is not linked from the public portfolio.
Screenshots were sourced from local Windows and Mac checkouts on September 23,
2026. They are authentic UI captures with fictional/demo data. The iPhone
capture displays its demo-data label. Published images are WebP versions in
`public/projects/saas-autohandel/`; they contain no source code or credentials.

## Verified features

- The mobile.de Seller API supports inventory import, listing publication and
  updates, image uploads, and listing sales insights. Published screenshots
  display local demo fixtures; no live provider validation is claimed.
- MCP adapter and opt-in LangChain4j backend are independent integration paths.
  They share authenticated business operations and preserve permissions.
  LangChain4j calls Spring business controllers in-process and proposals for
  changes require explicit confirmation. No shipped chat or voice interface is
  claimed.
- A native SwiftUI app for iPhone and iPad covers inventory, customers,
  appointments and daily tasks. The app is in development; no App Store release
  is claimed.

## Architecture diagram

`architecture.excalidraw` is the editable Visio-style Excalidraw scene and
`architecture.svg` is its accessible website image. The diagram deliberately
uses component-level labels and contains no source code, hostnames, credentials
or private filesystem paths. It describes current local implementations; it
makes no claim that the components ship together in production. The separate MCP
adapter calls authenticated HTTP APIs; the LangChain4j agent invokes backend
business controllers. Neither path calls the other or accesses the database
from the model.

The scene is reproducible with `python scripts/generate-cartyators-architecture.py`
when Pillow is installed. The published SVG was rendered using the official
`@excalidraw/utils` `exportToSvg` function.

## Other project image notes

- Ekko images use preview/demo data. Spotify live analytics are future work; its
  local editor currently customizes the companion screen, not the HDMI display.
- Grano Bar and Sattari Automobile image files are current local website previews.
  Each may differ from its publicly deployed version.
- Pulse's project entry uses its architecture diagrams; the system-overview
  screenshot is intentionally excluded.
