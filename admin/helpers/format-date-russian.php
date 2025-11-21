<?php

defined('ABSPATH') || exit;

/**
 * Преобразует дату в формате Y-m-d в читаемый формат с русскими месяцами
 *
 * @param string $date_string Дата в формате Y-m-d
 * @param string $format Формат возврата: 'array' - массив частей, 'object' - объект, 'string' - строка
 * @return array|object|string|false
 */

function format_date_russian($date_string, $format = 'array') {
    if (empty($date_string)) {
        return false;
    }
    
    try {
        $date = DateTime::createFromFormat('Y-m-d', $date_string);
        if (!$date) {
            return false;
        }
        
        $year = $date->format('Y');
        $month = $date->format('m');
        $day = $date->format('d');
        $day_no_zero = ltrim($day, '0'); // день без ведущего нуля
        
        $russian_months = [
            '01' => 'Января', '02' => 'Февраля', '03' => 'Марта',
            '04' => 'Апреля', '05' => 'Мая', '06' => 'Июня',
            '07' => 'Июля', '08' => 'Августа', '09' => 'Сентября',
            '10' => 'Октября', '11' => 'Ноября', '12' => 'Декабря'
        ];
        
        $month_russian = $russian_months[$month] ?? $month;
        
        $result = [
            'year' => $year,
            'month' => $month,
            'month_russian' => $month_russian,
            'day' => $day_no_zero,
            'day_padded' => $day,
            'original' => $date_string,
            'timestamp' => $date->getTimestamp(),
            'iso' => $date->format('c'),
            'is_future' => $date->getTimestamp() > time() // НОВОЕ: проверка на будущую дату
        ];
        
        // Возвращаем в нужном формате
        switch ($format) {
            case 'object':
                return (object)$result;
            case 'string':
                return $day_no_zero . ' ' . $month_russian . ' ' . $year;
            case 'short':
                return $day_no_zero . ' ' . substr($month_russian, 0, 3);
            case 'array':
            default:
                return $result;
        }
        
    } catch (Exception $e) {
        return false;
    }
}

/**
 * Проверить, является ли дата будущей
 */
function is_future_date($date_string) {
    $date_info = format_date_russian($date_string);
    return $date_info && $date_info['is_future'];
}

/**
 * Проверить, является ли пост будущим событием
 */
function is_future_event($post_id = null) {
    if (!$post_id) {
        $post_id = get_the_ID();
    }
    
    $date_start = get_post_meta($post_id, 'date_start', true);
    return is_future_date($date_start);
}