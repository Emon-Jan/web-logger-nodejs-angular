# Net Usages API (Backend) &  Web Logger v0.1 (Frontend)

## This project is based on net usages data API.

# Installation and Setup Guide:
Node: v8.12.0 (LTS) or greater and npm v6.4.1 or greater.
Angular: 7. check if these are install on machine by running

* `node -v`
* `npm -v`
* `ng version`

### If these are not installed then run commands:

* `sudo apt install curl`
* `curl -sL https://deb.nodesource.com/setup_8.x | sudo bash -`
* `sudo apt install nodejs`
* `npm install -g @angular/cli`

### If all version are as specified then

* First go to `~/weblog/weblog-backend/` and run `npm install`
* After successful installation of packages run `npm start`
* Then go to `~/weblog/weblog-frontent` and run `npm install`
* After successful installation of packages run `ng serve --host hostname --port portnumber`.
* Then go to http://hostname:portnumber


# Web Logger v0.1 (Frontend) Workflow
* After page loaded: There are two panel 
  1. Date-Time panel
  2. Status panel

* From date-time panel:
    * After setting date-time from and to field >>> Get Mac >>>>> Machine address panel ===> Select any one Mac address >>> Chart Panel
    * OR, Today/Week/Last Hour >>>>> Mac address panel ===> Select any one Mac address >>> Chart Panel


# API Document (Backend)
* /summary # returns timestamp start, end, number of rows, number of uniq mac
    * GET Method: Get overall status of net usages
    * API: http://hostname:3000/api/summary
    * Details:
        * Returns summary of weblog db's startTime, endTime, number of rows, number of uniq mac in Json, response: 200 or 304 , Content-Type: application/json; charset=utf-8
            * e.g. ```{
                        "startTime": int (Number: int of Unix timestamp in second),
                        "endTime": int   (Number: int of Unix timestamp in second),
                        "rowNum": int,
                        "uniqueMac": int
                    } ```
* /mac?from=A&to=B # returns uniq list of mac addresses with datetime limit
    * GET Method: Get mac addresses and coresponding visit numbers in a given date-time range as parameter
    * API: http://hostname:3000/api/mac?from='1538363117'&to='1538399117'
    * Query parameter: from , to
    * Details:
        * returns a list of mac addresses within the given date-time in unix timestamp format in json.
            * e.g. ```[
                        {
                            "mac" :"00:00:00:00:00:00", 
                            "num": 1234
                        }, 
                        { ... }
                    ]```
* /ip?from=A&to=B&mac=M # retuns {mac: ip} with datetime limit
    * GET Method: Get organization name, percentage num, timestamp in a preset date-time range as and a mac address parameter
    * API: http://hostname:3000/api/ip?from='1538363117'&to='1538399117'&mac='00:00:00:00:00:00'
    * Query parameter: from , to
    * Details:
        * returns a list of organization name with a value within the given date-time or only date with 'yyyy-MM-dd' or 'yyyy-mm-dd hh:mm:ss' format in json.
            * e.g. ```[ 
                        { name: 'Google LLC', y: 37.16, startTime: 1538363117, endTime: 1538399117 }, 
                        { ... }
                    ]```



