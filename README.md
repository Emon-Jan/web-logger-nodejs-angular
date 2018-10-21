# Net Usages API

    This project is based on net usages data API.

# API Document
* /summary # returns timestamp start, end, number of rows, number of uniq mac
    * http://localhost:3000/api/summary
    * Details:
        * returns summary of weblog db's startTime, endTime, number of rows, number of uniq mac in json 
            * e.g. {
                        "startTime": int,
                        "endTime": int,
                        "rowNum": int,
                        "uniqueMac": int
                    } 
* /mac?from=A&to=B # returns uniq list of mac addresses with datetime limit
    * http://localhost:3000/api/mac?from='2018-10-01 16:00:00'&to='2018-10-12 16:00:00'
    * Details:
        * returns a list of mac addresses within the given date-time or only date with 'yyyy-MM-dd' or 'yyyy-mm-dd hh:mm:ss' format in json.
            * e.g. [
                        {"mac" :"00:00:00:00:00:00"}, 
                        ...
                    ]
* /ip?from=A&to=B&mac=M # retuns {mac: ip} with datetime limit
    * http://localhost:3000/api/ip?from='2018-10-01 16:00:00'&to='2018-10-3 16:00:00'&mac='00:00:00:00:00:00'
    * Details:
        * returns a list of organization name with a value within the given date-time or only date with 'yyyy-MM-dd' or 'yyyy-mm-dd hh:mm:ss' format in json.
            * e.g. [ 
                        { name: 'Google LLC', y: '37.16' }, 
                        ...
                    ]