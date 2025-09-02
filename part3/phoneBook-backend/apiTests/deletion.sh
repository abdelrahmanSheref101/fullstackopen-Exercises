echo ""
echo "testing deleteing a person with url parameter (id:2)"
curl -i -X DELETE http://localhost:3001/api/persons/2
echo "::::validating current state of data (get all)"
curl -i http://localhost:3001/api/persons

echo ""
echo ""
echo "testing deleteing a person with invalid id (id:212)"
curl -i -X DELETE http://localhost:3001/api/persons/212
