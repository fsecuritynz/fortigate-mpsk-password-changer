Environment Overview
- Tested on FortiOS 7.4.9 [FortiGate 90G + FortiAP 441K]
- Configuration performed in root vdom
- API key generated with role of super-admin
- Tested on macOS Tahoe 26.1


Requirements
- npm 
- node


Limitations
- Does not work with a proxy-server in-path


Operation
- npm init -y
- npm install express node-fetch
- node server.js
- open browser to http://localhost:3000
