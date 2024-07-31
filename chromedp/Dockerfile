# syntax=docker/dockerfile:1
# -- build stage start --
FROM golang:1.22 AS build-image
# RUN apt update && apt -y upgrade

# RUN apt -y install chromium

WORKDIR /app

COPY . .

RUN mkdir -p bin

RUN go mod download

RUN CGO_ENABLED=0 GOOS=linux go build -o bin/chromedp-test ./...

# -- build stage ends --

#FROM chromedp/headless-shell:93.0.4535.3 AS final  ## stock-indexer:v0.0.6-chromedp-1
#stock-indexer:v0.0.6-chromedp-2
FROM chromedp/headless-shell AS final
WORKDIR /app
COPY --from=build-image /app ./

ENV SYMBOL="TRACXN"
ENV APP_TYPE="temporal-worker"
EXPOSE 9222
ENTRYPOINT ./bin/chromedp-test
