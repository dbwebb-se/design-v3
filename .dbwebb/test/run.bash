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

echo $2
echo $3
echo $4
echo $5
echo $6
echo "\n"
echo "\n"

ACRONYM="$3"


# Catches acronym
case "$4" in
    "-a" | "--acronym" )
        ACRONYM="$5"        ;;
esac

echo $ACRONYM

exit 0
