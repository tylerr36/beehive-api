#!/bin/bash

API="http://localhost:4741"
URL_PATH="/listings"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
    "listing": {
      "listing_name": "'"${NAME}"'"
    }
  }'

echo
