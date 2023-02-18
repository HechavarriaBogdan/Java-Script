const puppeteer = require('puppeteer');
async function testYaRu() {
	console.log('Запуск браузера');
	const browser = await puppeteer.launch({
    headless: false, // выключен безголовый режим
    slowMo: 100, // замедление, чтобы отслеживать выполнение теста
});

	console.log('создание новой вкладки в браузере');
	const page = await browser.newPage();

	console.log('переход по ссылке');
	await page.goto('https://ya.ru/');

	console.log('Шаг 1 - ввод данных в поисковую строку')
	const searchInput = await page.$('#text'); // запишется элемент строки поиска
	await searchInput.type('Автоматизация тестирования');


	console.log('шаг 2 - нажатие на кнопку "Найти"')
	const findButton = await page.$('.mini-suggest__button[type=submit]'); // поиск кнопки "Найти"
	await findButton.click();  // клик по кнопке "Найти"

	console.log('Ожидание перехода на страницу с поисковым результатом')
	await page.waitForNavigation('.serp-item');

	console.log('Получение элементов результата запроса')
	const result = await page.$('.serp-item');

	console.log('Проверка условия тест-кейса')
	if (result == null) {
		console.log('Результаты поиска не найдены')
	} else {
		console.log('Результаты поиска отобразились')
	}

	console.log('закрытие браузера');
	await browser.close();

}

testYaRu();