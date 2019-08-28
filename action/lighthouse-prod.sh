#!/bin/bash

# $1 - xml url
parse_xml() {
  urls=`curl -s $1 | sed -n 's/^.*<loc>\(.*\)<\/loc>.*$/\1/p'`
  xmls=(`grep -e ".xml$" <<< $urls`)
  for xml_url in "${xmls[@]}"
  do
    parse_xml $xml_url
  done
  pages=(`grep -v -e ".xml$" <<< $urls`)
  for i in "${pages[@]}"
  do
    echo "$i"
    # or do whatever with individual element of the array
    URL="${i}" npm run test:lighthouse
  done
}
parse_xml https://killerrabb.it/sitemap.xml