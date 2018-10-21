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
        # print(data[0]['mac'])
        self.assertRegexpMatches(data[0]['mac'], "[0-9a-f]{2}([-:]?)[0-9a-f]{2}(\\1[0-9a-f]{2}){4}$")


    # def test_isupper(self):
    #     self.assertTrue('FOO'.isupper())
    #     self.assertFalse('Foo'.isupper())

    # def test_split(self):
    #     s = 'hello world'
    #     self.assertEqual(s.split(), ['hello', 'world'])
    #     # check that s.split fails when the separator is not a string
    #     with self.assertRaises(TypeError):
    #         s.split(2)

if __name__ == '__main__':
    # unittest.main()
    suite = unittest.TestLoader().loadTestsFromTestCase(TestStringMethods)
    unittest.TextTestRunner(verbosity=2).run(suite)