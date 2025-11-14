/**
 * DOG 歲數計算機 (script.js)
 * * 計算狗狗的實際年齡和換算後的人類年齡。
 */

function calculateAge() {
    const birthdateInput = document.getElementById('birthdate').value;
    const dogAgeDisplay = document.getElementById('dog-age');
    const humanAgeDisplay = document.getElementById('human-age');
    
    // 檢查輸入是否有效
    if (!birthdateInput) {
        alert("請選擇狗狗的出生年月日！");
        dogAgeDisplay.textContent = '--';
        humanAgeDisplay.textContent = '--';
        return;
    }

    const birthDate = new Date(birthdateInput);
    const currentDate = new Date();

    // 1. 計算狗狗的實際年齡（以年為單位）

    // 計算兩個日期之間毫秒數的差異
    const diffInMilliseconds = currentDate - birthDate;
    
    // 將毫秒數轉換為年 (使用平均每年 365.25 天來計算閏年)
    const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25;
    const dogAgeInYears = diffInMilliseconds / millisecondsPerYear;

    // 2. 換算為人類年齡 (公式: 16 * In(狗狗年齡) + 31)
    
    let humanAge;
    
    if (dogAgeInYears < 1) {
        // 幼犬年齡處理：如果狗狗不滿 1 歲，直接使用比例或設定最低年齡來避免 ln(x) 負數/零的問題。
        // 這裡我們取一個最低值，讓結果不會太小或出錯，並讓狗狗年齡顯示小數點。
        humanAge = 31; // 剛出生設定為 31歲
        // 當然，更精確的方式會是使用另一個幼犬公式或插值法。
    } else {
        // 應用自然對數公式: 16 * ln(狗狗年齡) + 31
        // Math.log() 在 JavaScript 中就是自然對數 (ln)
        humanAge = 16 * Math.log(dogAgeInYears) + 31;
    }

    // 3. 輸出結果

    // 狗狗年齡顯示小數點後兩位
    dogAgeDisplay.textContent = dogAgeInYears.toFixed(2) + ' 歲';

    // 人類年齡顯示整數
    humanAgeDisplay.textContent = Math.floor(humanAge) + ' 歲';
}

// 頁面加載後立即計算妙麗的年齡 (使用 HTML 中預設的 value="2023-02-28")
document.addEventListener('DOMContentLoaded', calculateAge);
