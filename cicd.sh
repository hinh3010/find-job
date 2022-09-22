cd /findjob/findjobweb
git remote set-url origin https://doantheanh172tb:Kzbe6KvAP9HnhNB5Nxbu@gitlab.vtechsoft.vn/findjob/web.git

rm -rf src
git reset --hard
git pull
# cp /findjob/findjobweb/.env.production /findjob/findjobweb/.env
n exec 16.14.2 yarn
rm -rf build/*
n exec 16.14.2 yarn run build
rm -rf build_production
cp -rf build build_production
# pm2 delete findjobweb
# pm2 serve build_production 3301 --spa --name findjobweb
pm2 restart findjobweb
pm2 list