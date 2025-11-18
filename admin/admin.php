<?php

defined('ABSPATH') || exit;

/*
 * Remove admin bar (front page)
 */
add_filter('show_admin_bar', '__return_false');

/**
 * Post types
 */
require get_template_directory() . '/admin/helpers/post-types/allevents/post-allevents.php';
require get_template_directory() . '/admin/helpers/post-types/allevents/post-taxonomy.php';
require get_template_directory() . '/admin/helpers/post-types/allevents/meta-fields.php';
require get_template_directory() . '/admin/helpers/post-types/allevents/thumbnail-column.php';

require get_template_directory() . '/admin/helpers/post-types/teachers/post-teachers.php';
require get_template_directory() . '/admin/helpers/post-types/teachers/meta-fields.php';

require get_template_directory() . '/admin/helpers/post-types/success/post-success.php';

require get_template_directory() . '/admin/helpers/post-types/schoolhistory/post-schoolhistory.php';
require get_template_directory() . '/admin/helpers/post-types/schoolhistory/meta-fields.php';

require get_template_directory() . '/admin/helpers/post-types/manager/post-manager.php';
require get_template_directory() . '/admin/helpers/post-types/manager/meta-fields.php';

require get_template_directory() . '/admin/helpers/post-types/thanks/post-thanks.php';
require get_template_directory() . '/admin/helpers/post-types/admissions/post-admissions.php';

/**
 * Add for head something
 */
require_once get_template_directory() . '/admin/helpers/add-to-head.php';


/**
 * Shortcode cf7
 */
require_once get_template_directory() . '/admin/helpers/cf7.php';


/**
 * SEO
 */
require get_template_directory() . '/admin/helpers/seo-meta.php';


/**
 * Sitemap
 */
require get_template_directory() . '/admin/helpers/sitemap.php';


/**
 * Advanced Auto Linking
 */
// require_once get_template_directory() . '/admin/helpers/AdvancedAutoLinking.php';


/**
 * Convert webp
 */
require_once get_template_directory() . '/admin/helpers/convert-webp.php';


/**
 * Register categories for Gutenberg blocks
 */
require_once get_template_directory() . '/admin/helpers/register-block-categories.php';


/**
 * Register Gutenberg blocks and assets
 */
require_once get_template_directory() . '/admin/helpers/include-custom-gutenberg-blocks.php';
