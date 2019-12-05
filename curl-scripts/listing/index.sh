#!/bin/sh

API="http://localhost:4741"
URL_PATH="/listings"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  # Use this to require ownership, Change the route as well to
  # include requireToken
  # --header "Authorization: Bearer ${TOKEN}"

echo
