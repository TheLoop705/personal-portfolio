"""Build the editable Excalidraw scene for the public architecture overview.

Export this scene with Excalidraw's exportToSvg utility or its SVG export dialog.
Use solid fills, zero roughness, Helvetica and orthogonal connectors for the
requested Visio-style presentation. The scene contains public summary text only.
"""
import json
from pathlib import Path

from PIL import ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/projects/saas-autohandel/architecture.excalidraw'
ELEMENTS = []
INK = '#19364d'
MUTED = '#526779'
BLUE = '#386485'
GREEN = '#326f60'
PURPLE = '#715999'


def shape(kind, key, x, y, width, height, **extra):
    element = {
        'id': key, 'type': kind, 'x': x, 'y': y, 'width': width,
        'height': height, 'angle': 0, 'strokeColor': BLUE,
        'backgroundColor': '#ffffff', 'fillStyle': 'solid',
        'strokeWidth': 1.5, 'strokeStyle': 'solid', 'roughness': 0,
        'opacity': 100, 'groupIds': [], 'frameId': None,
        'roundness': None, 'seed': 1000 + len(ELEMENTS),
        'version': 1, 'versionNonce': 10000 + len(ELEMENTS),
        'isDeleted': False, 'boundElements': [], 'updated': 1790121600000,
        'link': None, 'locked': False, **extra,
    }
    ELEMENTS.append(element)
    return element


def text(key, x, y, content, size=23, color=INK, group=None):
    font = ImageFont.truetype('arial.ttf', size)
    lines = content.split('\n')
    return shape('text', key, x, y,
                 max(font.getlength(line) for line in lines) + 2,
                 len(lines) * size * 1.25,
                 text=content, originalText=content, fontSize=size,
                 fontFamily=2, lineHeight=1.25, textAlign='left',
                 verticalAlign='top', containerId=None, autoResize=True,
                 backgroundColor='transparent', strokeColor=color,
                 groupIds=[group] if group else [])


def box(key, x, y, width, height, title, detail, fill='#edf4fa', color=BLUE):
    node = shape('rectangle', key, x, y, width, height,
                 backgroundColor=fill, strokeColor=color, groupIds=[key+'-group'])
    text(key+'-title', x+20, y+18, title, 25, color, key+'-group')
    text(key+'-detail', x+20, y+56, detail, 21, MUTED, key+'-group')
    return node


def connector(key, points, color=BLUE, dashed=False, start=None, end=None):
    x, y = points[0]
    local = [[px-x, py-y] for px, py in points]
    arrow = shape('arrow', key, x, y,
                  max(p[0] for p in local)-min(p[0] for p in local),
                  max(p[1] for p in local)-min(p[1] for p in local),
                  points=local, backgroundColor='transparent',
                  strokeColor=color, strokeWidth=2,
                  strokeStyle='dashed' if dashed else 'solid',
                  startArrowhead=None, endArrowhead='arrow',
                  startBinding=None, endBinding=None, lastCommittedPoint=None)
    for side, node in [('start', start), ('end', end)]:
        if node:
            arrow[side+'Binding'] = {'elementId': node['id'], 'focus': 0, 'gap': 1}
            node['boundElements'].append({'id': key, 'type': 'arrow'})
    return arrow


# Overall canvas and section rules.
shape('rectangle', 'canvas', 0, 0, 1580, 1260,
      strokeColor='#ffffff', backgroundColor='#ffffff', locked=True)
text('title', 52, 32, 'Cartyators architecture', 40)
text('subtitle', 52, 87, 'Private repository  /  Implementation overview', 22, MUTED)
text('application-label', 52, 144, 'Application flow', 25)
shape('rectangle', 'application-boundary', 405, 188, 785, 414,
      backgroundColor='#f8fafc', strokeColor='#c5d3dd', strokeStyle='dashed')
text('application-boundary-label', 429, 199, 'Web application & business backend', 18, MUTED)

# Main application flow.
browser = box('browser', 52, 228, 280, 100, 'Web browser', 'Dealership workspace')
ios = box('ios', 52, 402, 280, 120, 'Native iOS app', 'SwiftUI • iPhone / iPad\nIn development')
caddy = box('caddy', 438, 312, 270, 126, 'Caddy', 'HTTPS / mTLS\nPage and API routing')
nextjs = box('nextjs', 828, 247, 330, 108, 'Next.js + React', 'Web UI & server rendering')
spring = box('spring', 828, 451, 330, 124, 'Spring Boot', 'Modular monolith\nCRM, inventory, sales & ERP')
mobilede = box('mobilede', 1260, 237, 268, 155, 'mobile.de Seller API',
               'Inventory import\nListing publication\nSales insights', '#ecf5f0', GREEN)
database = box('postgresql', 1260, 455, 268, 120, 'PostgreSQL',
               'Business data\nJPA / Hibernate', '#ecf5f0', GREEN)

connector('browser-caddy', [(332, 278), (385, 278), (385, 346), (438, 346)], start=browser, end=caddy)
connector('ios-caddy', [(332, 462), (385, 462), (385, 404), (438, 404)], start=ios, end=caddy)
connector('caddy-next', [(708, 344), (766, 344), (766, 301), (828, 301)], start=caddy, end=nextjs)
text('pages-label', 730, 269, 'Pages', 18, MUTED)
connector('caddy-spring', [(708, 404), (766, 404), (766, 513), (828, 513)], start=caddy, end=spring)
text('api-label', 696, 465, '/api/*', 18, MUTED)
connector('next-spring', [(993, 355), (993, 451)], start=nextjs, end=spring)
text('internal-api-label', 1007, 392, 'Internal API', 18, MUTED)
connector('spring-mobilede', [(1158, 482), (1212, 482), (1212, 315), (1260, 315)], GREEN, start=spring, end=mobilede)
connector('spring-db', [(1158, 537), (1260, 537)], GREEN, start=spring, end=database)
text('deployment', 438, 618, 'Deployment: Caddy, Next.js, Spring Boot and PostgreSQL on Docker Swarm / Hetzner', 19, MUTED)

# Expanded AI view. Spring remains the same application process as above.
shape('line', 'divider', 52, 676, 1476, 0, points=[[0, 0], [1476, 0]],
      strokeColor='#c5d3dd', backgroundColor='transparent', startArrowhead=None, endArrowhead=None)
text('ai-label', 52, 701, 'AI integration paths', 25)
text('ai-subtitle', 52, 741, 'One business contract. Two ways to use it.', 21, MUTED)
shape('rectangle', 'spring-expanded', 808, 784, 372, 365,
      backgroundColor='#f8fafc', strokeColor='#c5d3dd', strokeStyle='dashed')
text('same-process', 829, 795, 'Inside the same Spring Boot process', 18, MUTED)

contract = box('contract', 438, 842, 300, 128, 'Shared tool contract',
               'Authenticated OpenAPI\nRole-filtered operations', '#f0edf8', PURPLE)
agent = box('langchain', 838, 842, 312, 135, 'LangChain4j',
            'Opt-in assistant backend\nConfirm before changes', '#f0edf8', PURPLE)
model = box('model', 1260, 842, 268, 135, 'Language model',
            'OpenAI-compatible API\nTool-calling model', '#f0edf8', PURPLE)
host = box('mcp-host', 52, 1021, 280, 108, 'External AI host',
           'MCP-compatible assistant', '#f0edf8', PURPLE)
adapter = box('mcp-adapter', 438, 1021, 300, 108, 'MCP adapter',
              'Local Node.js process', '#f0edf8', PURPLE)
controllers = box('business-tools', 838, 1031, 312, 98, 'Business controllers',
                  'Permissions & audit records')

connector('host-adapter', [(332, 1075), (438, 1075)], PURPLE, start=host, end=adapter)
text('stdio-label', 359, 1040, 'stdio', 18, PURPLE)
connector('adapter-contract', [(588, 1021), (588, 970)], PURPLE, start=adapter, end=contract)
text('discovery-label', 601, 986, 'Discover', 17, PURPLE)
connector('contract-agent', [(738, 906), (838, 906)], PURPLE, True, start=contract, end=agent)
text('catalog-label', 749, 871, 'Catalog', 17, PURPLE)
connector('agent-model', [(1150, 909), (1260, 909)], PURPLE, start=agent, end=model)
text('model-label', 1171, 873, 'Model API', 17, PURPLE)
connector('agent-business', [(994, 977), (994, 1031)], PURPLE, start=agent, end=controllers)
text('in-process-label', 1008, 991, 'In-process', 17, PURPLE)
connector('adapter-business', [(738, 1080), (838, 1080)], PURPLE, start=adapter, end=controllers)
text('http-label', 749, 1046, 'HTTP API', 17, PURPLE)

text('ai-note', 52, 1175,
     'AI paths use the authenticated business API and existing permissions. The MCP adapter and LangChain4j operate independently.',
     20, MUTED)
text('scope-note', 52, 1212,
     'Current local implementations; not a claim of a combined production release. Source code remains private.', 20, MUTED)

scene = {
    'type': 'excalidraw', 'version': 2, 'source': 'https://excalidraw.com',
    'elements': ELEMENTS,
    'appState': {'viewBackgroundColor': '#ffffff', 'gridSize': None,
                 'exportBackground': True, 'exportWithDarkMode': False,
                 'currentItemFontFamily': 2, 'currentItemRoughness': 0},
    'files': {},
}
OUT.write_text(json.dumps(scene, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
print(f'Wrote {OUT.name}: {len(ELEMENTS)} editable elements')
