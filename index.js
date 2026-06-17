// ВАЖНО: Замените sampleData на ваш полный массив данных из таблицы в формате JSON
const sampleData = [
  { gender: 2, branch: 2, city: 67, dept: 3, category: 2, recommend: 1, ethics: 11 },
  { gender: 2, branch: 2, city: 10, dept: 3, category: 2, recommend: 1, ethics: 11 },
  { gender: 7, branch: 67, dept: 3, category: 2, recommend: 2, ethics: 11 },
  // ... и так далее (добавьте все строки из вашей таблицы)
];

// Словарь для расшифровки цифр в текст
const dict = {
  gender: { 1: 'Мужской', 2: 'Женский' },
  branch: { 2: 'Тюмень', 3: 'Самара', 4: 'Уфа', 5: 'Красноярск' }, // дополните список
  recommend: { 10: 'Полностью согласен', 9: 'Скорее согласен', 8: 'Нейтрально', 7: 'Скорее не согласен', 1: 'Категорически не согласен' },
  ethics: { 11: 'Полностью согласен', 10: 'Скорее согласен', 9: 'Нейтрально' }
};

// Функция для расчета среднего
function getAverage(arr) {
  return (arr.reduce((sum, val) => sum + val, 0) / arr.length).toFixed(1);
}

// 1. Расчет и вывод среднего по рекомендации
const recScores = sampleData.map(item => item.recommend);
document.getElementById('avg-recommend').textContent = getAverage(recScores);

// 2. Статистика по полу
const genderCount = sampleData.reduce((acc, item) => {
  acc[dict.gender[item.gender]] = (acc[dict.gender[item.gender]] || 0) + 1;
  return acc;
}, {});
document.getElementById('gender-stats').textContent = 
  `Мужчин: ${genderCount['Мужской'] || 0}, Женщин: ${genderCount['Женский'] || 0}`;

// 3. График распределения баллов (Готовность рекомендовать)
const recLabels = Object.keys(dict.recommend).reverse(); // от 1 до 10
const recData = recLabels.map(score => sampleData.filter(d => d.recommend == score).length);

new Chart(document.getElementById('recommend-chart'), {
  type: 'bar',
  data: {
    labels: recLabels,
    datasets: [{
      data: recData,
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  },
  options: { responsive: true }
});

// 4. График по филиалам
const branchCount = sampleData.reduce((acc, item) => {
  acc[dict.branch[item.branch]] = (acc[dict.branch[item.branch]] || 0) + 1;
  return acc;
}, {});

new Chart(document.getElementById('branch-chart'), {
  type: 'pie',
  data: {
    labels: Object.keys(branchCount),
    datasets: [{
      data: Object.values(branchCount),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      hoverOffset: 4
    }]
  },
  options: { responsive: true }
});
