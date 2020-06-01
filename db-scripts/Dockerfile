FROM mysql:latest
ENV MYSQL_ROOT_USER=root
ENV MYSQL_ROOT_PASSWORD=root
COPY db.sql /docker-entrypoint-initdb.d/
 RUN ["/usr/local/bin/docker-entrypoint.sh", "mysqld", "--datadir", "/initialized-db"]
EXPOSE 3306

