<?php
/**
 * Simple Honeypot AntiBot for Contact Form 7
 */

if (!defined('ABSPATH')) exit;

class CF7_Honeypot {

  private static $instance;

  public static function init() {
    if (!self::$instance) {
      self::$instance = new self();
    }
    return self::$instance;
  }

  private function __construct() {
    add_action('wpcf7_init', [$this, 'register_tag']);
    add_filter('wpcf7_validate_honeypot', [$this, 'validate_honeypot'], 10, 2);
    add_action('wp_enqueue_scripts', [$this, 'add_css']);
  }

  /**
   * Регистрируем тег [honeypot fieldname]
   */
  public function register_tag() {
    wpcf7_add_form_tag(
      'honeypot',
      [$this, 'render_honeypot'],
      ['name-attr' => true]
    );
  }

  /**
   * Рендерим скрытое поле
   */
  public function render_honeypot($tag) {
    $tag = new WPCF7_FormTag($tag);
    $name = $tag->name;
    if (!$name) return '';

    return sprintf(
      '<span class="cf7-honeypot-wrapper"><input type="text" name="%s" class="cf7-honeypot-field" autocomplete="off"/></span>',
      esc_attr($name)
    );
  }

  /**
   * Валидация Honeypot
   */
  public function validate_honeypot($result, $tag) {
    $name = $tag->name;
    $value = isset($_POST[$name]) ? trim($_POST[$name]) : '';

    if (!empty($value)) {
      $result->invalidate($tag, __('Spam detected (honeypot).', 'contact-form-7'));
    }

    return $result;
  }

  /**
   * CSS для скрытия поля
   */
  public function add_css() {
    $css = '
      .cf7-honeypot-wrapper {
        position: absolute !important;
        left: -9999px !important;
        top: -9999px !important;
        overflow: hidden !important;
        height: 0 !important;
        width: 0 !important;
      }
    ';
    wp_add_inline_style('contact-form-7', $css);
  }
}

CF7_Honeypot::init();
