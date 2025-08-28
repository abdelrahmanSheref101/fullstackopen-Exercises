echo " "
echo "testing: fetching all persons"
curl -i http://localhost:3001/api/persons
echo " "
echo "expected:"

echo " "
echo "testing: fetching person with valid id (2)"
curl -i http://localhost:3001/api/persons/2
echo " "
echo "expected:"

echo " "
echo "testing: fetching person with invalid id (21)"
curl -i http://localhost:3001/api/persons/21
echo " "
echo "expected:"

echo " "
