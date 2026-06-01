docker rm -f sandwich
docker build -t sandwich-app .
docker run -d -p 3000:3000 --name sandwich sandwich-app
