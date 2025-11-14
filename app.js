(function(){
const nameEl = document.getElementById('name');
const dobEl = document.getElementById('dob');
const calcBtn = document.getElementById('calcBtn');
const nowBtn = document.getElementById('nowBtn');
const resultEl = document.getElementById('result');


// 將 YYYY-MM-DD 轉 Date
function parseDateFromInput(v){
const parts = (v || '').split('-');
if(parts.length < 3) return null;
const y = parseInt(parts[0],10);
const m = parseInt(parts[1],10)-1;
const d = parseInt(parts[2],10);
return new Date(y,m,d);
}


// 計算狗狗年齡（年，含小數）
function calcDogAgeYears(birthDate, nowDate){
if(!birthDate || isNaN(birthDate.getTime())) return null;
const now = nowDate || new Date();
const diff = now.getTime() - birthDate.getTime();
if(diff < 0) return null; // 未出生
const years = diff / (365.2425 * 24 * 60 * 60 * 1000);
return years;
}


// 套用公式
function dogToHumanAge(dogYears){
if(dogYears <= 0) return null;
const human = 16 * Math.log(dogYears) + 31;
return human;
}


function render(){
const name = (nameEl.value || '妙麗').trim();
const birth = parseDateFromInput(dobEl.value);
const dogYears = calcDogAgeYears(birth, new Date());


if(dogYears === null || dogYears <= 0){
resultEl.textContent = `${name} 現在在大約 0 歲狗狗年齡，換算成人類年齡大約是 0 歲。`;
return;
}


const dogYearsFormatted = Number(dogYears.toFixed(2));
const humanAge = dogToHumanAge(dogYears);
const humanRounded = humanAge === null || !isFinite(humanAge) ? 0 : Math.round(humanAge);


resultEl.textContent = `${name} 現在在大約 ${dogYearsFormatted} 歲狗狗年齡，換算成人類年齡大約是 ${humanRounded} 歲。`;
}


calcBtn.addEventListener('click', render);


nowBtn.addEventListener('click', ()=>{
const t = new Date();
const yyyy = t.getFullYear();
const mm = String(t.getMonth()+1).padStart(2,'0');
const dd = String(t.getDate()).padStart(2,'0');
dobEl.value = `${yyyy}-${mm}-${dd}`;
render();
});


window.addEventListener('DOMContentLoaded', render);
})();