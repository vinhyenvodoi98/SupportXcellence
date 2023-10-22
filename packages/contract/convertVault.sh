#!/bin/bash

input_file="broadcast/multi/Deploy.s.sol-latest/run.json"
output_file="output.json"

transactions=$(jq -c '.deployments[]' "$input_file")

contracts=()

for item in $transactions; do
    contractName=$(echo "$item" | jq -r '.transactions[0].contractName')
    contractAddress=$(echo "$item" | jq -r '.transactions[0].contractAddress')
    chain=$(echo "$item" | jq -r '.chain')
    contracts+=("\"$chain\": {\"$contractName\": \"$contractAddress\"}")
done

echo "{" > "$output_file"
for i in "${!contracts[@]}"; do
    echo -n "${contracts[$i]}," >> "$output_file"
done
truncate -s-1 $output_file
echo "}" >> "$output_file"

