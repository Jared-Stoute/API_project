import sys
import os

# Absolute path to this package directory
BASE_DIR = os.path.abspath(os.path.dirname(__file__))

# Add this package directory to sys.path
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

# Add the parent directory (project root) to sys.path
PARENT_DIR = os.path.abspath(os.path.join(BASE_DIR, '..'))
if PARENT_DIR not in sys.path:
    sys.path.insert(0, PARENT_DIR)