# Create the CA
openssl genrsa -out root.key 4096
openssl req -x509 -new -nodes -key root.key -sha256 -days 3650 -out root.crt -subj "/CN=MyCA"

# Create the server key and certificate signing request (CSR)
openssl genrsa -out server.key 2048
openssl req -new -key server.key -out server.csr -subj "/CN=your.server.com"

# Sign the server certificate with the CA
openssl x509 -req -in server.csr -CA root.crt -CAkey root.key -CAcreateserial -out server.crt -days 365 -sha256
