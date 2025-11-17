<?php
if (!defined('ABSPATH')) exit;

require_once get_template_directory() . '/admin/theme-settings/render-color/render-color.php';
require_once get_template_directory() . '/admin/theme-settings/render-color/color-settings-register.php';

require_once get_template_directory() . '/admin/theme-settings/menu.php';
require_once get_template_directory() . '/admin/theme-settings/sanitize.php';

require_once get_template_directory() . '/admin/theme-settings/page-settings.php';
require_once get_template_directory() . '/admin/theme-settings/page-instructions.php';
require_once get_template_directory() . '/admin/theme-settings/page-add-to-head.php';

require_once get_template_directory() . '/admin/theme-settings/enqueue.php';
require_once get_template_directory() . '/admin/theme-settings/helpers.php';
require_once get_template_directory() . '/admin/theme-settings/shortcodes.php';
