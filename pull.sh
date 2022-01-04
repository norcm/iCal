#!/usr/bin/env bash
cd /home/iCal && /bin/git pull &>/dev/null && /bin/yarn run build
echo -e "X-Test-Author: Michael\r\n"
  echo "<html><head>"
  echo "<title>$NAME</title>"
  echo '<meta name="description" content="'$NAME'">'
  echo '<meta name="keywords" content="'$NAME'">'
  echo '<meta http-equiv="Content-type" content="text/html; charset=UTF-8">'
  echo '<meta name="ROBOTS" content="noindex">'
  echo "</head><body><pre>"
  echo "success"
  echo "</pre></body></html>"