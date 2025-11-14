document.getElementById("calcBtn").addEventListener("click", function () {

    const dogName = document.getElementById("dogName").value.trim();
    const birthDate = new Date(document.getElementById("birthDate").value);
    const today = new Date();

    const diffMs = today - birthDate;
    const dogAgeYears = diffMs / (1000 * 60 * 60 * 24 * 365.25);

    if (dogAgeYears <= 0) {
        document.getElementById("result").innerText = "出生日期不能是未來！";
        return;
    }

    const humanAge = 16 * Math.log(dogAgeYears) + 31;

    const dogAgeFixed = dogAgeYears.toFixed(1);
    const humanAgeFixed = Math.round(humanAge);

    document.getElementById("result").innerText =
        `${dogName} 現在在大約 ${dogAgeFixed} 歲狗狗年齡，換算成人類年齡大約是 ${humanAgeFixed} 歲。`;
});
