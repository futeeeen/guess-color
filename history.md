# 專案推送變更紀錄

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
