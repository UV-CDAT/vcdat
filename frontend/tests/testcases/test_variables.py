import unittest
import os 

this_dir = os.path.abspath(os.path.dirname(__file__))
lib_dir = os.path.join(this_dir, '..', 'lib')
sys.path.append(lib_dir)

# from BaseTestCase import BaseTestCase
import BaseTestCase


class AddVariableTest(BaseTestCase):
    def testAddVariable(self):
        print("xxx testAddVariable xxx")

if __name__ == '__main__':
    unittest.main(verbosity=2)

