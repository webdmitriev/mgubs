<?php
defined('ABSPATH') || exit;

$current_scheme = get_option('theme_color_scheme', 'default');
$color_schemes = [
    'default' => 'Default',
    'orange'  => 'Orange',
    'gray'    => 'Gray'
];
?>

<div class="wrap">
    <h1>Theme Color Settings</h1>

    <?php if (isset($_GET['settings-updated'])): ?>
        <div id="message" class="updated notice is-dismissible">
            <p>Settings saved.</p>
        </div>
    <?php endif; ?>

    <form method="post" action="options.php">
        <?php
            settings_fields('theme_color_settings_group');
            do_settings_sections('theme-color-settings');
            submit_button();
        ?>
    </form>
</div>
