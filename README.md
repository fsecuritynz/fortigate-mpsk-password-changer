**Screenshots**
![alt text](https://github.com/fsecuritynz/fortigate-mpsk-password-changer/blob/main/ui-screenshot.png)


![alt text](https://github.com/fsecuritynz/fortigate-mpsk-password-changer/blob/main/fortigate_mpsk_profile.png)


![alt text](https://github.com/fsecuritynz/fortigate-mpsk-password-changer/blob/main/ui-populated_list.png)


![alt text](https://github.com/fsecuritynz/fortigate-mpsk-password-changer/blob/main/ui-updated_password.png)

**Capability**
- Leverages FortiGate API to pull MPSK group-list from a group file into the UI
- Enables simple password changing per group-list object 


**Environment Overview**
- Test hadware/software
- FortiGate 90G running FortiOS 7.4.9
  - VDOM mode - `root` vdom
  - Self-signed certificate on FortiGate
  - API key generated with role of super-admin
- FortiAP 441K running 7.6.3
  - bridge mode (controller mode untested)

- Tested on:
  - macOS Tahoe 26.1
  - Debian 12 (bookworm)
  

**Requirements**
***macOS***
- homebrew installed
  - https://brew.sh/
- npm
  - `brew install npm`
- node
  - `brew install node`

***Debian***
- npm
  - `apt install npm -y`
- node
  - `apt install node -y`
   
***macOS + Debian***
- npm libraries
  - `npm init -y`
  - `npm install express
  - `npm install node-fetch@2`
  - `npm install body-parser`


**Operation**
- edit the `server.js` file
  - insert your firewall IP or hostname
  - add your API key
  - ensure that the URL path includes the name of the target mpsk-profile (i.e. `https://192.168.1.1/api/v2/cmdb/wireless-controller/mpsk-profile/guest-hotel-wifi`)
- replace the logo.png file in public folder with your chosen graphic for branding


***macOS***
- run the server
  - `node server.js`
- open browser to `http://localhost:3000`


***Debian 12***
- clone the git repo into `/opt`
  - `/opt/fortigate-mpsk-password-changer`
- run the server
  - install the systemd file
    - `cp /opt/fortigate-mpsk-password-changer/forti-mpsk-web.service /etc/systemd/system/`
    - `systemctl daemon-reload`
    - `systemctl restart forti-mpsk-web.service`
    - `systemctl status forti-mpsk-web.service`
- open browser to `http://server-ip:3000`
