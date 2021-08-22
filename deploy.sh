#!/usr/bin/env sh

# 發生錯誤時執行終止指令
set -e

# 打包編譯
npm run build

# 移動到打包資料夾下，若你有調整的話打包後的資料夾請務必調整
# cd dist

# 部署到自定義網域
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m '[第四版] SugarCafeBar - 產品卡片、產品詳細資訊(好食提醒)、部分UX調整'

# 部署到 https://<USERNAME>.github.io
git push -f https://github.com/kumatom/sugar-cafe-bar.git master
# git push -f https://github.com/kumatom/sugar-cafe-bar.git master:gh-pages

cd -
