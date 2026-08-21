#!/bin/bash

# Check if the script is being run from the root of the project
#if [ ! -f .version ] || [ ! -f frontend/package.json ] || [ ! -f CHANGELOG.md ]; then
if [ ! -f package.json ]; then
    echo "Error: This script must be run from the root of the project."
    exit 1
fi

part=patch

if [ "$1" == "major" ]; then
	part=$1
elif [ "$1" == "minor" ]; then
	part=$1
fi

echo "do $part"


new_version=$(npm version $part)

git add package.json



echo $new_version



