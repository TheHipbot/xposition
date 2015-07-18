FROM thehipbot/web2py
COPY . /home/www-data/web2py/applications/xposition
RUN chown -R www-data:www-data /home/www-data/web2py/applications/xposition && \
    ln -s /home/www-data/web2py/applications/xposition /home/www-data/web2py/applications/init