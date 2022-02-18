import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import sys

# Use the application default credentials
#cred = credentials.ApplicationDefault()
#firebase_admin.initialize_app(cred, {
#  'projectId': project_id,
#})


cred = credentials.Certificate("creds.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

key = sys.argv[1] + ',' + sys.argv[2]
filename = 'tmp/' + key

with open(filename, 'r') as file:
    value = file.read()

data = {
    str(key) : str(value)
}

# Add a new doc in collection 'app' with ID 'grid'
# merge=True tells to update existing, not replace
db.collection(u'app').document(u'grid').set(data, merge=True)
