#!/usr/bin/env bash
#
# This script is called by 'dbwebb test <target>' and can be used to prepare
# and execute additional scripts.
#
# Arguments:
#  course_dir           Absolute path to the basedir of the course repo.
#  course               Nickname of the course.
#  acronym              Acronym of the user executing the script.
#  <test_suite>         Kmom or Assignment of the testsuite to execute.
#                       If -g, --generate is passed here,
#                           it will call generate.d.bash instead.
#  <optional args>      Optional arguments
#


# Usage
if (( $# < 3 )); then
    printf "Usage: %s <course_dir> <course> <acronym> <test-suite> <optional args...>\n" \
        "$( basename -- "$0" )"
    exit 1
fi

COURSE_NICK="$2"
KMOM="$4"
ACRONYM="$3"

# Catches and replaces for student acronym
case "$5" in
    "-a" | "--acronym" )
        ACRONYM="$6"        ;;
esac

URL="http://www.student.bth.se/~$ACRONYM/$COURSE_NICK/me/portfolio"

echo "$URL"

PARSER_OUTPUT=$(node "./parsers/$KMOM.js $URL")

echo $PARSER_OUTPUT

exit 0
