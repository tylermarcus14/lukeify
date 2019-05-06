server {

        server_name lukeify.com;

        root /var/www/lukeify;

        location / {
                proxy_pass http://127.0.0.1:3000;
        }

	location ~* \.(jpg|jpeg|png|gif|woff|woff2)$ {
		expires 30d;
	}

    listen [::]:443 ssl ipv6only=on; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/lukeify.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/lukeify.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}
server {
    if ($host = lukeify.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


        listen 80;
        listen [::]:80;

        server_name lukeify.com;
    return 404; # managed by Certbot


}
