echo " "
echo "testing: creating a resource"
curl -i -X POST http://localhost:3001/api/notes \
  -H "Content-Type: application/json" \
  -d '{"content":"Learn REST with curl","important":true}'
echo " "
