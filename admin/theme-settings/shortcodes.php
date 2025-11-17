<?php

defined('ABSPATH') || exit;

// Шорткоды для вывода данных
function theme_phone_shortcode() {
  $phone = get_theme_phone();
  return $phone ? '<a href="tel:' . esc_attr($phone) . '">' . esc_html($phone) . '</a>' : '';
}
add_shortcode('theme_phone', 'theme_phone_shortcode');

function theme_email_shortcode() {
  $email = get_theme_email();
  return $email ? '<a href="mailto:' . esc_attr($email) . '">' . esc_html($email) . '</a>' : '';
}
add_shortcode('theme_email', 'theme_email_shortcode');

function theme_partners_shortcode() {
  $partners = get_theme_partners();
  if (empty($partners)) return '';

  $output = '<div class="theme-partners">';
  foreach ($partners as $partner) {
    $output .= '<div class="partner-item">';
    if (!empty($partner['link'])) $output .= '<a href="' . esc_url($partner['link']) . '" target="_blank" rel="noopener">';
    $output .= esc_html($partner['text']);
    if (!empty($partner['link'])) $output .= '</a>';
    $output .= '</div>';
  }
  $output .= '</div>';

  return $output;
}
add_shortcode('theme_partners', 'theme_partners_shortcode');
