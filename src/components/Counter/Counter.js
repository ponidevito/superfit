//  Num counter
function numCounter(selector, number, time, step) {
    const counter = document.querySelector(selector)

    let res = 0

    const allTime = Math.round(time / (number / step))

    let interval = setInterval(() => {
        res = res + step

        if (res === number) {
            clearInterval(interval)
        }
        counter.innerHTML = res
    }, allTime)
}

// ЦЯ ФУНКЦІЯ МОЖЕ БУТИ ВИКЛИКАНА НЕОБМЕЖЕНУ КІЛЬКІСТЬ РАЗІВ

// Перший аргумент - селектор, куди будемо виводити результат ( з . якщо клас і з # якщо id). ПРИКЛАД: '.num1' або '#num1'
// Другий аргумент - кінцеве значення, що буде показане на сторінці
// Третій аргумент - час анімації (мілісекунди)
// Четвертий аргумент - крок анімації (наприклад, додаємо по 1 або по 10 або по 100)

// Play animation on scroll
// Програти анімацію під час скролу
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        // Замість section-3 пишемо той клас секції, при скролі до якої хочемо програти анімацію
        if (entry.target.classList.contains('section-3')) {
            numCounter('#num-1', 600, 2000, 10)
        }
    })
})
document.querySelectorAll('.section').forEach((section) => {
    observer.observe(section)
})
