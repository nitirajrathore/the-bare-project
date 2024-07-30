
# build project on local
go mod tidy
mkdir -p logs
mkdir -p bin
go build -o bin/chromedp-test

# run on local
export SYMBOL="TRACXN"
./bin/chromedp-test

# build docker image
docker build . --tag chromedp-test:v1

# run using docker
docker run  --volume ./logs:/app/logs --name chromedp-test chromedp-test:v1

# run using docker compose 
docker compose -f docker-compose.yml up -d 