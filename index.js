// 1. Данные (скопировано из вашего примера)
const responses = [
    [2, 2, 67, 3, 2, 1, 1, 11, 1],
    [2, 2, 10, 3, 2, 1, 1, 11, 1],
    [2, 7, 67, 3, 2, 2, 1, 11, 1],
    [2, 7, 67, 3, 2, 2, 1, 11, 1],
    [2, 7, 10, 3, 2, 1, 2, 11, 1],
    [2, 2, 67, 3, 2, 1, 1, 11, 1],
    [2, 2, 67, 3, 2, 1, 1, 11, 1],
    [2, 7, 67, 3, 2, 1, 1, 11, 1],
    [2, 2, 67, 3, 2, 1, 1, 11, 1]
];

// 2. Словари расшифровки
const dicts = {
    gender: {1: 'Мужской', 2: 'Женский'},
    branch: {2: 'Тюмень', 7: 'ГО'},
    dept: {3: 'Управление ЕКЦ'}
};

// 3. Агрегация данных
const stats = {
    total: responses.length,
    scores: { q6: [], q8: [], q9: [], q10: [] },
    gender: {}, branch: {}, dept: {}
};

responses.forEach(row => {
    // Собираем баллы
    stats.scores.q6.push(row);
    stats.scores.q8.push(row);
    stats.scores.q9.push(row);
    stats.scores.q10.push(row);

    // Считаем доли категорий
    ['gender', 'branch', 'dept'].forEach(key => {
        const val = row[key === 'gender' ? 0 : key === 'branch' ? 1 : 3];
        stats[key][val] = (stats[key][val] || 0) + 1;
    });
});

// 4. Функции для вывода
function avg(arr) { return (arr.reduce((a,b)=>a+b,0) / arr.length).toFixed(2); }
function renderStats(id, data) {
    const total = stats.total;
    document.getElementById(id).innerHTML = Object.keys(data).map(k => 
        `${dicts[id.split('-')][k]}: ${data[k]} (\${((data[k]/total)*100).toFixed(1)}%)`
    ).join('<br>');
}

// 5. Отрисовка
document.getElementById('avg-recommend').textContent = `Средний балл: \${avg(stats.scores.q6)}`;
document.getElementById('avg-leader').textContent = `Средний балл: \${avg(stats.scores.q8)}`;
document.getElementById('avg-ethics').textContent = `Средний балл: \${avg(stats.scores.q9)}`;
document.getElementById('avg-colleagues').textContent = `Средний балл: \${avg(stats.scores.q10)}`;

renderStats('gender-stats', stats.gender);
renderStats('branch-stats', stats.branch);
renderStats('dept-stats', stats.dept);

// 6. Гистограмма (Chart.js)
const ctx = document.getElementById('recommend-chart').getContext('2d');
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        datasets: [{
            label: 'Частота ответов',
            data: [...Array(10)].map((_,i) => stats.scores.q6.filter(x => x === i+1).length),
            backgroundColor: 'rgba(54, 162, 235, 0.6)'
        }]
    },
    options: { responsive: true }
