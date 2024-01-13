cd client
rm -r build
cd ..
git reset --hard HEAD && git pull
cd client
npm install
npm run build
cd ..
pm2 delete 0
pm2 delete 1
pm2 start ~/Projects/react_mysql/backend/index.js
pm2 start 'serve -s ~/Projects/react_mysql/client/build'
pm2 list
pm2 save
pm2 startup
sudo env PATH=$PATH:/home/kb/.nvm/versions/node/v20.10.0/bin /home/kb/.nvm/versions/node/v20.10.0/lib/node_modules/pm2/>
