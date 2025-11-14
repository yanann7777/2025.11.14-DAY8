const $ = id => document.getElementById(id);

// 計算日期差
function dateDiff(from, to) {
  if (to < from) return null;

  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonthDays = new Date(to.getFullYear(), to.getMonth(), 0).getDate();
    days += prevMonthDays;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalDays = Math.floor((to - from) / (1000 * 60 * 60 * 24));
  const totalYears = totalDays / 365.2425;

  return { years, months, days, totalYears };
}

// 換算人類年齡
function dogToHuman(dogYears, size) {
  const mapping = { small: 4, medium: 5, large: 6 };
  const perYear = mapping[size] || 5;

  if (dogYears <= 0) return 0;
  if (dogYears <= 1) return 15 * dogYears;
  if (dogYears <= 2) return 15 + 9 * (dogYears - 1);

  return 15 + 9 + perYear * (dogYears - 2);
}

function formatAge(y, m, d) {
  const list = [];
  if (y) list.push(`${y} 歲`);
  if (m) list.push(`${m} 個月`);
  if (d) list.push(`${d} 天`);
  return list.length ? list.join(" ") : "0 天";
}

// 顯示結果
function show(diff) {
  if (!diff) {
    $("dogAge").textContent = "請輸入有效的日期";
    $("humanAge").textContent = "—";
    return;
  }

  $("dogAge").textContent = formatAge(diff.years, diff.months, diff.days);
  const size = $("size").value;
  const human = dogToHuman(diff.totalYears, size);
  $("humanAge").textContent = human.toFixed(1) + " 歲";
}

// 按鈕行為
$("calc").addEventListener("click", () => {
  const birthVal = $("birth").value;
  if (!birthVal) return show(null);

  const birth = new Date(birthVal + "T00:00:00");
  const today = new Date();
  show(dateDiff(birth, today));
});

$("reset").addEventListener("click", () => {
  $("birth").value = "";
  $("size").value = "medium";
  $("dogAge").textContent = "—";
  $("humanAge").textContent = "—";
});
