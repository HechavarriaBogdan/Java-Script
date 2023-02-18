const puppeteer = require('puppeteer');
async function testTaxiResult() {
	console.log('Запуск браузера');
	const browser = await puppeteer.launch({
    headless: false, // выключен безголовый режим
    slowMo: 100, // замедление, чтобы отслеживать выполнение теста
});
	console.log('создание новой вкладки в браузере');
	const page = await browser.newPage();

	console.log('переход по ссылке');
	await page.goto('https://qa-routes.praktikum-services.ru/');

	console.log('Шаг 1 - ввод часов и минут')
	const hoursInput = await page.$('#form-input-hour'); // запишется элемент кнопки «Часы»
	await hoursInput.type('08');

	const minutesInput = await page.$('#form-input-minute'); // запишется элемент кнопки «Минуты»
	await minutesInput.type('00');

	console.log('Шаг 2 - заполнение поля Откуда')
	const fromInput = await page.$('#form-input-from'); // запишется элемент кнопки «Откуда»
	await fromInput.type('Усачева, 3');

	console.log('Шаг 3 - заполнение поля Куда')
	const toInput = await page.$('#form-input-to'); // запишется элемент кнопки «Куда»
	await toInput.type('Комсомольский проспект, 18');

	console.log('Шаг 4 - выбор режима Свой')
	const routeMode = await page.$('#form-mode-custom'); // поиск элемента выбора режима «Свой»
	await routeMode.click();  // клик по кнопке "Свой"

	console.log('шаг 5 - выбор вида транспорта')
	const typeTaxi = await page.$('#from-type-taxi'); // поиск элемента выбора транспорта «Такси»
	await typeTaxi.click();  // клик по кнопке "Такси"

	console.log('Ожидание элемента с результатом')
	await page.waitForSelector('#result-time-price'); // ожидание появления результирующего селектора

	console.log('Получение строки с результатом')
	const text = await page.$eval('#result-time-price', element => element.textContent);

	console.log('Проверка условия тест-кейса');
	if (text.startsWith('Такси')) {
		console.log('Успех, текст содержит ' + text);
	} else {
		console.log(`Ошибка. Текст не начинается со слова 'Такси'`);
	}

	await page.screenshot({path: 'testTaxiResult.png'})

	console.log('закрытие браузера');
	await browser.close();

} 

testTaxiResult();
