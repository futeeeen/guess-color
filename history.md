# 專案推送變更紀錄

## 2026.06.13_01:47:30
* 新增遊戲中的背景圖片預載機制，開始遊戲後會預先載入後續 4 個題組的圖片，降低切換下一關時的等待感。
* 縮小右下角 `1`、`2`、`3`、`4` 數字遮擋格，維持貼齊實際圖片右下角但減少遮住圖片內容。
* Validation: ran `node --check .\script.js`.

## 2026.06.13_01:39:52
* 更新圖庫與題庫資料，新增 `pic/26`、`pic/27`、`pic/28` 題組素材。
* 重新執行 `generate_data.py`，`data.json` 目前包含 28 個可玩題組且沒有 warning。
* Validation: ran `python .\generate_data.py`, `python -m json.tool .\data.json`, and `node --check .\script.js`.

## 2026.06.13_01:16:28
* 更新題庫資料，重新掃描 `pic/` 後 `data.json` 目前包含 25 個可玩題組，新增收錄第 22 到 25 題。
* 調整未公布答案時的回饋：答錯顯示紅字與紅框，答對顯示綠字與綠框。
* 修正圖片右下角浮水印遮擋位置，讓 `1`、`2`、`3`、`4` 編號塊貼齊實際圖片右下角，而不是卡片留白區。
* 同步 `pic/22` 圖片汰換與新增 `pic/23`、`pic/24`、`pic/25` 題組素材。
* Validation: ran `python .\generate_data.py`, `python -m json.tool .\data.json`, and `node --check .\script.js`.

## 2026.06.13_00:27:14
* 追加 `pic/22` 新增的 1 張圖片檔案，讓本機素材同步到 GitHub repository 並觸發 Pages 自動部署。
* 重新執行 `generate_data.py`；目前仍為 21 個可玩題組，`pic/22` 因沒有 Answer 圖繼續被略過。
* Validation: ran `python .\generate_data.py` and `python -m json.tool .\data.json`.

## 2026.06.13_00:24:10
* 新增 GitHub Actions workflow，push 到 `main` 時會自動把靜態站部署到 GitHub Pages。
* 新增 `.nojekyll`，避免 GitHub Pages 用 Jekyll 處理靜態檔案。
* 追加 `pic/22` 新增的 1 張圖片檔案；重新產生 `data.json` 後目前仍為 21 個可玩題組，`pic/22` 因沒有 Answer 圖繼續被略過。
* Validation: ran `python .\generate_data.py`, `python -m json.tool .\data.json`, and `node --check .\script.js`.

## 2026.06.13_00:20:47
* 追加 `pic/22` 新增的 1 張圖片檔案，讓第 22 組素材同步到 GitHub repository。
* 重新執行 `generate_data.py`；目前仍為 21 個可玩題組，`pic/22` 因沒有 Answer 圖繼續被略過。
* Validation: ran `python .\generate_data.py` and `python -m json.tool .\data.json`.

## 2026.06.13_00:19:24
* 追加 `pic/22` 新增的 3 張圖片檔案，讓本機圖片資料夾與 GitHub repository 同步。
* 重新執行 `generate_data.py`；目前仍為 21 個可玩題組，`pic/22` 因沒有 Answer 圖繼續被略過。
* Validation: ran `python .\generate_data.py`.

## 2026.06.13_00:17:10
* 建立猜顏色 / 找原圖靜態網頁遊戲，包含首頁控制列、四宮格手機版版面、答案確認與公布答案互動。
* 新增 `generate_data.py`，可掃描 `pic/` 題組資料夾並產生前端讀取用的 `data.json`。
* 調整遊戲流程為每次開始時隨機排列題組，同一輪從第一題玩到最後一題不重複，確認答案後才能前往下一關。
* 公布答案時改為正確答案顯示綠色粗框、錯誤答案顯示紅色粗框，不再讓錯誤圖片變暗。
* 重新產生 `data.json`，目前包含 21 個可玩題組；`pic/22` 因沒有 Answer 圖未收錄為題目。
* Validation: ran `node --check .\script.js`, `python -m json.tool .\data.json`, and `python .\generate_data.py`.
