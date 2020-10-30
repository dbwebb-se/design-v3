#!/usr/bin/env bash
#
# Script run BEFORE kmom specific scripts.
# Put tests here that applies to all kmoms.
#
# Available (and usable) data:
#   $COURSE
#   $KMOM
#   $ACRONYM
#   $REDOVISA_HTTP_PREFIX
#   $REDOVISA_HTTP_POSTFIX
#   eval "$BROWSER" "$url" &
#
printf ">>> -------------- Pre (all kmoms) ----------------------\n"

# # Open localhost:1337 in browser
# printf "Open localhost:1337/eshop/index in browser\n"
# eval "$BROWSER" "http://127.0.0.1:1337/eshop/index" &

# Open me/kmom01/redovisa


local file=me/portfolio/github.txt
if [ -f "$file" ]; then
    local url=$( cat me/portfolio/github.txt )

    printf "$url/tags\n" 2>&1
    eval "$BROWSER" "$url/tags" &
    
    printf "$url/commits\n" 2>&1
    eval "$BROWSER" "$url/commits" &

    printf "$url\n" 2>&1
    eval "$BROWSER" "$url" &
fi

url="$REDOVISA_HTTP_PREFIX/~$ACRONYM/dbwebb-kurser/$COURSE/$REDOVISA_HTTP_POSTFIX"
printf "$url\n" 2>&1
eval "$BROWSER" "$url" &

echo
