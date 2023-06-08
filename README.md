# Расширение для браузера "Browser Fingerprint Protector"

Это расширение для браузера разработано с целью защиты пользовательского цифрового следа, также известного как браузерный отпечаток или Fingerprint. Расширение предоставляет набор функций и модулей, которые позволяют изменять и маскировать данные, используемые для идентификации пользователя в онлайн-среде.

## Особенности

- Изменение и маскировка заголовков HTTP: Расширение модифицирует значения заголовков User-Agent, Accept-Language и удаляет заголовок Referer для затруднения идентификации пользователя на основе этих данных.
- Изменение и маскировка списка шрифтов: Расширение искажает размеры шрифтов и добавляет случайный шум для усложнения точной идентификации пользователя.
- Защита от WebGL Fingerprinting: Расширение внедряется в WebGL-контекст браузера и модифицирует значения WebGL-параметров, чтобы обеспечить защиту от идентификации пользователя на основе WebGL-отпечатка.
- Защита от Canvas Fingerprinting: Расширение модифицирует функции, связанные с экспортом данных из элементов Canvas, чтобы предотвратить идентификацию пользователя на основе отпечатка Canvas.

## Установка

1. Скачайте расширение из репозитория.
2. Разархивируйте скачанный файл на компьютере.
3. Откройте браузер и введите в адресной строке `chrome://extensions`.
4. Включите режим разработчика (Developer Mode).
5. Нажмите на кнопку "Load unpacked" и выберите папку с расширением, которую вы разархивировали.
6. Расширение "Browser Fingerprint Protector" должно появиться в списке расширений браузера.
7. Убедитесь, что расширение включено.

## Использование

После установки и включения расширения, оно начнет автоматически применять защитные меры к браузеру при посещении веб-сайтов. Вы можете проверить его работу на следующих сайтах:

- https://coveryourtracks.eff.org/
- https://www.whatismybrowser.com/
- https://browserleaks.com/

На каждом из этих сайтов вы можете просмотреть результаты изменения данных и убедиться в эффективности защиты от идентификации на основе Fingerprint.

## Примечания

- Расширение разработано для браузеров на основе движка Chromium.
- При использовании расширения, возможно некоторое снижение функциональности некоторых веб-сайтов, особенно тех, которые полагаются на информацию, полученную из заголовков HTTP, шрифтов или функций WebGL и Canvas.
- Расширение поставляется "как есть" без каких-либо гарантий или обязательств со стороны разработчиков.

## Содействие

Если у вас есть какие-либо вопросы, проблемы или предложения по улучшению расширения, пожалуйста, свяжитесь с нами по адресу capleks@mail.ru. Мы ценим ваше содействие и готовы сотрудничать с сообществом для дальнейшего развития и совершенствования "Browser Fingerprint Protector".

