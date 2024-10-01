FROM postgres:14

#RUN echo 'America/Lima' > /etc/timezone && dpkg-reconfigure -f noninteractive tzdata
#RUN echo "timezone = 'America/Lima'" >> /var/lib/postgresql/data/postgresql.conf

RUN localedef -i es_PE -c -f UTF-8 -A /usr/share/locale/locale.alias es_PE.UTF-8
ENV LANG es_PE.utf8

# COPY database/*.sql /docker-entrypoint-initdb.d/