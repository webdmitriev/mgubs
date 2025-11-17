# Wordpress with Gutenberg

---

### What you can

- Auto sitemap.xml
- Typograph for blocks
- Auto Linking
- Changing color (:root {})

---

### Frontend optimize

| Task                    | Что делает                                     |
| ----------------------- | ---------------------------------------------- |
| `npm run frontend`      | просто пересобирает SCSS + JS при изменении    |
| `npm run frontend:live` | пересобирает и автоматически обновляет браузер |
| `npm run dev`           | Development Gutenberg blocks (WP часть)        |
| `npm run build`         | собирает Gutenberg-блоки (WP часть)            |
| `npm run images`        | Один раз сжать все картинки                    |


### Theme settings

| File                    | Description                                      |
| ----------------------- | ------------------------------------------------ |
| `theme-settings.php`      | главный файл, подключает всё остальное         |
| `menu.php`                | добавляет меню и подменю                       |
| `sanitize.php`            | санитизация данных                             |
| `page-settings.php`       | страница “Theme Settings” (основные настройки) |
| `page-instructions.php`   | страница “Video Instructions”                  |
| `enqueue.php`             | стили и скрипты админки                        |
| `helpers.php`             | функции получения опций                        |
| `shortcodes.php`          | все шорткоды                                   |
