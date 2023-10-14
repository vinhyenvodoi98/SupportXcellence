#!/bin/bash

addresses=()

for file in broadcast/Deploy.s.sol/534351/run-latest.json broadcast/Deploy.s.sol/5001/run-latest.json broadcast/Deploy.s.sol/5/run-latest.json; do
    address=$(jq -r '.transactions[0].contractAddress' "$file")
    contractName=$(jq -r '.transactions[0].contractName' "$file")
    filename=$(echo "$file" | sed 's/.*\/\([^/]*\)\/[^/]*$/\1/')
    addresses+=("{\"$filename\": {\"$contractName\": \"$address\"}}")
done

echo "[" > output.json
echo -n "${addresses[0]}" >> output.json
for i in "${addresses[@]:1}"; do
    echo -n ", $i" >> output.json
done
echo "]" >> output.json
