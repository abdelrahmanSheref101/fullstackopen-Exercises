echo " "
echo "testing: creating a valid resource"
curl -i -X POST http://localhost:3001/api/persons \
  -H "Content-Type: application/json" \
  -d '{"name":"elsayd elbadawy","number":"123456789"}'
echo " "

echo " "
echo "testing: creating an invalid resource (missing name)"
curl -i -X POST http://localhost:3001/api/persons \
  -H "Content-Type: application/json" \
  -d '{"number":"123456789"}'
echo " "
echo "expected: 400 error:'missing' "

