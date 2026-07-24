FROM roundcube/roundcubemail@sha256:89083b9d7034e9a6345248db296e2fa6870533d24724741d3a523433433ffde7

LABEL org.opencontainers.image.title="CBS Mail"
LABEL org.opencontainers.image.description="Cybrense UI and PWA layer for Roundcube"
LABEL org.opencontainers.image.source="https://github.com/Cybrense-IT-Services/CBS_Mail"
LABEL org.opencontainers.image.licenses="GPL-3.0-or-later"

# The upstream entrypoint copies /usr/src/roundcubemail into the live document
# root on first start. Baking the overlay here avoids fragile file bind mounts.
COPY --chown=www-data:www-data branding/ /usr/src/roundcubemail/skins/elastic/branding/
COPY --chown=www-data:www-data config/elastic-meta.json /usr/src/roundcubemail/skins/elastic/meta.json
COPY --chown=www-data:www-data templates/ /usr/src/roundcubemail/skins/elastic/templates/
COPY --chown=www-data:www-data plugins/cybrense_skin/ /usr/src/roundcubemail/plugins/cybrense_skin/
COPY --chown=www-data:www-data pwa/cybrense-manifest.json /usr/src/roundcubemail/public_html/cybrense-manifest.json
COPY --chown=www-data:www-data pwa/cybrense-sw.js /usr/src/roundcubemail/public_html/cybrense-sw.js
COPY --chown=www-data:www-data pwa/offline.html /usr/src/roundcubemail/public_html/offline.html
