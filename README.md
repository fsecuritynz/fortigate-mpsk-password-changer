**Screenshots**
![alt text](https://github.com/fsecuritynz/fortigate-mpsk-password-changer/blob/main/ui-screenshot.png)


![alt text](https://github.com/fsecuritynz/fortigate-mpsk-password-changer/blob/main/fortigate_mpsk_profile.png)


![alt text](https://github.com/fsecuritynz/fortigate-mpsk-password-changer/blob/main/ui-populated_list.png)


![alt text](https://github.com/fsecuritynz/fortigate-mpsk-password-changer/blob/main/ui-updated_password.png)

**Capability**
- Leverages FortiGate API to pull MPSK group-list from a group file into the UI
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
  - `brew install npm`
- node
  - `brew install node`
- npm libraries
  - `npm init -y`
  - `npm install express node-fetch`
  - `npm install node-fetch@2`


**Operation**

- edit the `server.js` file
  - insert your firewall IP or hostname
  - add your API key
  - ensure that the URL path includes the name of the target mpsk-profile (i.e. `https://192.168.1.1/api/v2/cmdb/wireless-controller/mpsk-profile/guest-hotel-wifi`)
- replace the logo.png file in public folder with your chosen graphic for branding
- run the server
  - `node server.js`
- open browser to `http://localhost:3000`
