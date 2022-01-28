#!/bin/bash
ENV_DEV_FILE=".env.dev"
ENV_FILE=".env"

if [[ ! -e "$ENV_FILE" ]]; then
  echo "Creating '.env' file."
  cp "$ENV_DEV_FILE" "$ENV_FILE"
fi

docker compose up
