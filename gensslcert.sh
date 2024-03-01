#/!bin/bash

random_number=$((20 + RANDOM % 30))
domain=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w $random_number | head -n 1)

openssl ecparam -out www.${domain}.com.key -name prime256v1 -genkey
openssl req -new -days 365 -nodes -x509 \
    -subj "/C=US/ST=Denial/L=Springfield/O=Dis/CN=www.${domain}.com" \
    -key www.${domain}.com.key -out www.${domain}.com.cert


echo "SSLEngine on" >> /usr/local/apache2/conf/httpd.conf
echo "SSLCertificateFile /usr/local/apache2/www.${domain}.com.cert" >> /usr/local/apache2/conf/httpd.conf
echo "SSLCertificateKeyFile /usr/local/apache2/www.${domain}.com.key" >> /usr/local/apache2/conf/httpd.conf