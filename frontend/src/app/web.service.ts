import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class WebService {
  private host = window.location.hostname

  constructor(private _http: HttpClient) { }

  /**
   * GET Method: Get overall status of net usages
   * 
   * api: http://localhost:3000/api/summary
   * 
   * return Observable of status Json Object
   * 
   * Object format: 
   *   {
   *      rowNum (Number: int),
   *      uniqueMac (Number: int),
   *      startTime (Number: int of Unix timestamp in second), 
   *      endTime (Number: int of Unix timestamp in second)
   *    }
   */
  getWebLogSummary() {
    return this._http.get("http://" + this.host + ":3000/api/summary");
  }



  /**
   * GET Method: Get mac addresses and coresponding visit numbers in a given date-time range as parameter
   *
   * parameter: sdate (Number: int of Unix timestamp in second), 
   *            edate (Number: int of Unix timestamp in second)
   * 
   * api: http://localhost:3000/api/mac?from=sdate&to=edate
   * 
   * return Observable of Array of Json Object
   * 
   * Format: 
   *   [
   *    {
   *      mac (Number: int),
   *      num (Number: int, Total number of visit),
   *    },
   *     { ... }
   *   ]
   * 
   */
  getMacAddressesWithTime(sDate: Date, eDate: Date) {
    if (sDate == undefined && eDate == undefined) {
      return this._http.get("http://" + this.host + ":3000/api/mac?from='1538360857'&to='1538922457'");
    } else {
      let sdate = parseInt((sDate.getTime() / 1000).toString());
      let edate = parseInt((eDate.getTime() / 1000).toString());
      return this._http.get("http://" + this.host + ":3000/api/mac?from='" + sdate + "'&to='" + edate + "'");
    }
  }

  /**
   * GET Method: Get organization name, percentage num, timestamp 
   * in a preset date-time range as and a mac address parameter
   *
   * parameter: sdate (Number: int of Unix timestamp in second), 
   *            edate (Number: int of Unix timestamp in second)
   * 
   * api: http://localhost:3000/api/ip?from=sdate&to=edate&mac=m
   * 
   * return Observable of Array of Json Object
   * 
   * Format: 
   *   [
   *    {
   *      name      (String),
   *      y         (Number: float, Percent number of visit),
   *      startTime (Number: int of Unix timestamp in second),
   *      endTime   (Number: int of Unix timestamp in second),
   *    },
   *     { ... }
   *   ]
   * 
   */
  getWebUsages(m: any, sDate?: Date, eDate?: Date) {
    if (sDate == undefined && eDate == undefined) {
      return this._http.get("http://" + this.host + ":3000/api/ip?from='1538360857'&to='1538922457'&mac='" + m + "'");
    } else {
      let sdate = parseInt((sDate.getTime() / 1000).toString());
      let edate = parseInt((eDate.getTime() / 1000).toString());
      return this._http.get("http://" + this.host + ":3000/api/ip?from='" + sdate + "'&to='" + edate + "'&mac='" + m + "'");
    }
  }
}
