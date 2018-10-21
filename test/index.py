import requests
import unittest
import re

class TestStringMethods(unittest.TestCase):
    
    def test_weblog_summary_meta(self):
        r = requests.get("http://localhost:3000/api/summary")
        self.assertEqual(r.status_code, 200)
        self.assertEqual(r.headers['Content-Type'], 'application/json; charset=utf-8')
        self.assertEqual(r.encoding, 'utf-8')
        
    def test_weblog_summary_json(self):
        r = requests.get("http://localhost:3000/api/summary")
        data = r.json()
        self.assertTrue(data['startTime'] < data['endTime'])
        self.assertTrue(data['rowNum'] > 0)
        self.assertTrue(data['uniqueMac'] > 0)

    def test_weblog_mac(self):
        r = requests.get("http://localhost:3000/api/mac?from='2018-10-01 16:00:00'&to='2018-10-012 16:00:00'")
        data = r.json()
        # print(data[1])
        for ob in data:
            try:
                self.assertRegexpMatches(ob['mac'], "[0-9a-f]{2}([-:]?)[0-9a-f]{2}(\\1[0-9a-f]{2}){4}$")
            except AssertionError:
                self.assertRegexpMatches(ob['mac'], "^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$")
            

    def test_weblog_org_percent(self):
        r = requests.get("http://localhost:3000/api/ip?from='2018-10-01 16:00:00'&to='2018-10-03 16:00:00'&mac='c4:85:08:7a:29:52'")
        data = r.json()
        for ob in data:
            self.assertIsInstance(ob["name"], str)
            self.assertIsInstance(float(ob["y"]), float)


if __name__ == '__main__':
    # unittest.main()
    suite = unittest.TestLoader().loadTestsFromTestCase(TestStringMethods)
    unittest.TextTestRunner(verbosity=2).run(suite)