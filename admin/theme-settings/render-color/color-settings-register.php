<?php
defined('ABSPATH') || exit;

add_action('admin_init', function() {
    // Регистрируем опцию
    register_setting('theme_color_settings_group', 'theme_color_scheme');

    // Секция
    add_settings_section(
        'theme_color_settings_section',
        'Color Scheme Settings',
        '__return_false',
        'theme-color-settings'
    );

    // Поле выбора схемы
    add_settings_field(
        'theme_color_scheme',
        'Select Color Scheme',
        function() {
            $current = get_option('theme_color_scheme', 'default');
            $schemes = [
                'default' => 'Default',
                'orange'  => 'Orange',
                'gray'    => 'Gray'
            ];

            echo '<select name="theme_color_scheme">';
            foreach ($schemes as $key => $label) {
                $selected = ($current === $key) ? 'selected' : '';
                echo "<option value='{$key}' {$selected}>{$label}</option>";
            }
            echo '</select>';
        },
        'theme-color-settings',
        'theme_color_settings_section'
    );
});
