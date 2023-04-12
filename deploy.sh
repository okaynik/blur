#!/bin/sh
sudo git pull
cd blur-frontend
npm install
npm run-script build
cd ..
cd back
npm install
sudo systemctl restart nginx
pm2 restart all
