echo " "
echo "testing: fetching all notes"
curl -I http://localhost:3001/api/notes
echo " "
echo "expected:"

echo " "
echo "testing: fetching note with valid id (2)"
curl -I http://localhost:3001/api/notes/2
echo " "
echo "expected:"

echo " "
echo "testing: fetching note with invalid id (21)"
curl -I http://localhost:3001/api/notes/21
echo " "
echo "expected:"

echo " "
echo "testing: deleting a note with valid id (1)"
curl -I -X DELETE http://localhost:3001/api/notes/1
echo " "
echo "expected:"

echo " "
echo "testing: deleting a note with invalid id (11)"
curl -I -X DELETE http://localhost:3001/api/notes/11
echo " "
echo "expected:"


