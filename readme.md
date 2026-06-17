docker rm -f sandwich 2>/dev/null
docker build -t sandwich-app .
docker run -d -p 3000:3000 --name sandwich sandwich-app

<!-- if need to seeing logs from backend, remove -d flag from run command -->
