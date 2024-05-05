#!/bin/zsh

docker run -v "./:/app" -w "/app" node:22.1.0-alpine npx replexica@latest auth
docker run -v "./:/app" -w "/app" node:22.1.0-alpine npx replexica@latest i18n

