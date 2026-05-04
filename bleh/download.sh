#!/bin/bash

ZIM_DIR="/mnt/AppsPool/wikipedia/zim"
COMPOSE_FILE="./docker-compose.yml"
BASE_URL="https://download.kiwix.org/zim/wikipedia"
UPDATED=false

#scrape the directory listing to find the latest maxi zim file
REMOTE_FILE=$(curl -s "${BASE_URL}/" \
    | grep -oP 'wikipedia_en_all_maxi_\d{4}-\d{2}\.zim' \
    | sort -V \
    | tail -1)

if [ -z "$REMOTE_FILE" ]; then
    echo "Could not find remote ZIM file. Exiting."
    exit 1
fi

echo "Latest remote ZIM: ${REMOTE_FILE}"

REMOTE="$BASE_URL/$REMOTE_FILE"
LOCAL_FILE="$ZIM_DIR/$REMOTE_FILE"

#get remote hash
echo getting remove hash
REMOTE_HASH=$(curl -s "${REMOTE}.sha256" | awk '{print $1}')

#get local hash (will be empty if file doesn't exist yet)
echo getting local hash
LOCAL_HASH=$(sha256sum "${LOCAL_FILE}" 2>/dev/null | awk '{print $1}')

echo comparing hashes
if [ "$REMOTE_HASH" != "$LOCAL_HASH" ]; then
    echo "New version found, downloading..."

    wget --progress=bar:force -O "${LOCAL_FILE}.tmp" "$REMOTE" 2>&1 | tee  ./download-update.log
    #remove old ZIM files before moving new one in
    rm -f "$ZIM_DIR"/*.zim
    mv "${LOCAL_FILE}.tmp" "$LOCAL_FILE"


    # Strip .zim and build viewer path
    ZIM_NAME="${REMOTE_FILE%.zim}"

    # Update the services.yaml
    sed -i "s|viewer#wikipedia_en_all_maxi_[0-9]\{4\}-[0-9]\{2\}/|viewer#${ZIM_NAME}/|g" /mnt/.ix-apps/app_mounts/homepage/config/services.yaml
    UPDATED=true
else
    echo "Already up to date, skipping."
fi

if [ "$UPDATED" = true ]; then
    docker compose -f "$COMPOSE_FILE" restart wikipedia
else
    docker compose -f "$COMPOSE_FILE" up -d wikipedia
fi
