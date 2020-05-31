#!/bin/bash
set -e
service mysql start
mysql < db.sql
service mysql stop