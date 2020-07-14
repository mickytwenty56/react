FROM gowyth/node-vim-nginx

# Remove the default nginx index.html
RUN rm -rf /var/www/html/index.nginx-debian.html

# Copy the contents of the dist directory over to the nginx web root
COPY /build/* /var/www/html/
COPY /build/static /var/www/html/static

#RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

# Expose the public http port
EXPOSE 80

# Start server
CMD ["nginx", "-g", "daemon off;"]
