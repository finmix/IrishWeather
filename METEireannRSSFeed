# MET Eireann RSS Feed

# https://pypi.python.org/pypi/PyRSS2Gen
import datetime
import PyRSS2Gen

# Webserver
from bottle import route, run, response

# http://bottlepy.org/docs/dev/index.html
# from bottle import route, run, template
# @route('/hello/<name>')
# def index(name):
#     return template('<b>Hello {{name}}</b>!', name=name)
# run(host='localhost', port=8080)

from feedformatter import Feed
import time

# Imported to delete files
import os
# WOrking with CSV Files
import csv
# URL Navigation
import mechanize
# Regex processing
import re

import urllib2

from bs4 import BeautifulSoup



def define_source(passedInHTML):

	# This is where you load all the html from the page in question into soup to be parsed
	html = urllib2.urlopen(passedInHTML).read()
	soup = BeautifulSoup(html)#.decode('utf-8','ignore'))

	
	searchResultsList = soup.find('td', class_="maincontent")
	#print searchResultsList.text
	return searchResultsList.text



#####################
# MAIN CODE SECTION # 
#####################


@route('/Forecast.xml')
def getProductsList():
	forecast = define_source("http://www.met.ie/forecasts/")
	#forecast = forecast[0:1]


	response.headers['Content-Type'] = 'application/rss+xml'
	
	rss = PyRSS2Gen.RSS2(
	    title = "Andrew's PyRSS2Gen feed",
	    link = "http://www.dalkescientific.com/Python/PyRSS2Gen.html",
	    description = "The latest news about PyRSS2Gen, a "
	                  "Python library for generating RSS2 feeds",

	    lastBuildDate = datetime.datetime.now(),

	    items = [
	       PyRSS2Gen.RSSItem(
	         title = "PyRSS2Gen-0.0 released",
	         link = "http://www.dalkescientific.com/news/030906-PyRSS2Gen.html",
	         description = "Dalke Scientific today announced PyRSS2Gen-0.0, "
	                       "a library for generating RSS feeds for Python.  ",
	         guid = PyRSS2Gen.Guid("http://www.dalkescientific.com/news/"
	                          "030906-PyRSS2Gen.html"),
	         pubDate = datetime.datetime(2003, 9, 6, 21, 31)),
	       PyRSS2Gen.RSSItem(
	         title = "Thoughts on RSS feeds for bioinformatics",
	         link = "http://www.dalkescientific.com/writings/diary/"
	                "archive/2003/09/06/RSS.html",
	         description = "One of the reasons I wrote PyRSS2Gen was to "
	                       "experiment with RSS for data collection in "
	                       "bioinformatics.  Last year I came across...",
	         guid = PyRSS2Gen.Guid("http://www.dalkescientific.com/writings/"
	                               "diary/archive/2003/09/06/RSS.html"),
	         pubDate = datetime.datetime(2003, 9, 6, 21, 49)),
	    ])


	#rss.write_xml(open("pyrss2gen.xml", "w"))
	return rss.to_xml()


run(host='0.0.0.0', port=8888, debug=True)
#run(host='78.18.42.2', port=88, debug=True)
