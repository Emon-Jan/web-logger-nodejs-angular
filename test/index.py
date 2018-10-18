import requests
import unittest

class TestStringMethods(unittest.TestCase):
    
    def setUp(self):
        self.r = requests.get("http://localhost:3000/api/summary")

    def test_weblog_summary_meta(self):
        self.assertEqual(self.r.status_code, 200)
        self.assertEqual(self.r.headers['Content-Type'], 'application/json; charset=utf-8')
        self.assertEqual(self.r.encoding, 'utf-8')
        
    def test_weblog_summary_json(self):
        data = self.r.json()
        self.assertEqual(data['startTime'], 1538372781)
        self.assertEqual(data['endTime'], 1539756951)
        self.assertEqual(data['rowNum'], 950273)
        self.assertEqual(data['uniqueMac'], 145)
        assert(data['startTime'] < data['endTime'])



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