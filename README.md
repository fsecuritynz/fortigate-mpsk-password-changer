Inline-style: 
![alt text](https://github.com/fsecuritynz/fortigate-mpsk-password-changer/blob/main/ui-screenshot.png "UI Screenshot")

**Capability**
- Leverages FortiGate API to pull MPSK group-list form a group file into the UI
- Enables simple password changing per group-list object 


**Environment Overview**
- Tested on FortiOS 7.4.9 [FortiGate 90G + FortiAP 441K]
- Configuration performed in root vdom
- API key generated with role of super-admin
- Tested on macOS Tahoe 26.1
  - Linux & windows un-tested
- Self-signed certificate on FortiGate 


**Requirements**
- homebrew installed
  - https://brew.sh/
- npm
  - brew install npm
- node
  - brew install node


**Limitations**
- Does not work with a proxy-server in-path



**Operation**
- npm init -y
- npm install express node-fetch
- edit the server.js file
  - insert your firewall IP or hostname
  - add your API key
  - ensure that the URL path includes the name of the target mpsk-profile (i.e. https://192.168.1.1/api/v2/cmdb/wireless-controller/mpsk-profile/guest-hotel-wifi)
- replace the logo.png file in public folder with your chosen graphic for branding
- node server.js
- open browser to http://localhost:3000
