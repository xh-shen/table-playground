git pull origin dev
yarn
yarn run build
rm -rf /www/nginx/html/table-playground-html/ && mv ./dist/ /www/nginx/html/table-playground-html/
