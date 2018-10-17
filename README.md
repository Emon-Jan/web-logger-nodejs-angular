# Net Usages API

    This project is based on net usages data API.

## TODO
    1. API listing
    2. Creating API
    3. Testing API

# API List
    1. /summary # returns timestamp start, end, number of rows, number of ip, number of uniq mac
    2. /mac?from=A&to=B # returns uniq list of mac addresses with datetime limit
    3. /ip?from=A&to=B&mac=M # retuns {mac: ip} with datetime limit
    4. /today # returns todays mac and ip freq

### Query syntax:

* **select * from log where timestamp between UNIX_TIMESTAMP('2018-10-01 11:00:00') and UNIX_TIMESTAMP('2018-10-01 16:00:00') limit 500;** `(This query is for finding usages data between given timestamp)`.
* **select count(distinct ip) from log;** `(This query is for finding unique ip)`. 
* **select count(distinct ip) from log where timestamp between UNIX_TIMESTAMP('2018-10-01 11:00:00') and UNIX_TIMESTAMP('2018-10-01 16:00:00');** `(This query is for finding unique ip between given timestamp)`. 
* **select min(timestamp) from log;** `(This query is for start time. for regular date-time use after select from_unixtime(timestamp) )`. 
*  **select max(timestamp) from log;** `(This query is for end time. for regular date-time use after select from_unixtime(timestamp) )`.
* **SELECT ip From log where mac='c4:54:44:cf:02:04';** `(This query is for ip address of a given mac)`.
* **SELECT ip From log where mac='c4:85:08:7a:29:52' and timestamp between UNIX_TIMESTAMP('2018-10-01 11:00:00') and UNIX_TIMESTAMP('2018-10-01 16:00:00') limit 100;** `(This query is for ip address of a given mac with given date and time)`.