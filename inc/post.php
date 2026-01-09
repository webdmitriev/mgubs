<?php

$url = get_template_directory_uri();
$image_base64 = 'data:image/gif;base64,R0lGODlhBwAFAIAAAP///wAAACH5BAEAAAEALAAAAAAHAAUAAAIFjI+puwUAOw==';

$id = $args['id'] ? $args['id'] : 0;
$tags = $args['tags'] ? $args['tags'] : [];
$date = $args['date'] ? $args['date'] : false;
$title = $args['title'] ? $args['title'] : false;
$is_logotype = $args['is_logotype'] ? $args['is_logotype'] : false;
$is_logotype_special = $args['is_logotype_special'] ? $args['is_logotype_special'] : false;
$image = get_template_directory_uri().'/assets/img/default/default-news.jpg';
$link = $args['link'] ? $args['link'] : '#';
?>

<a href="<?= $link; ?>" class="article-post">
  <?php
    if($args['image']) { echo theme_get_responsive_thumbnail($id, 'full', ['class' => 'article-news__img']); }
    else { echo '<img src="'.$image.'" class="article-news__img" />'; }
  ?>
  <?php if($is_logotype) { echo '<img src="'.get_is_logotype().'" class="article-news__icon" />'; } ?>
  <?php if($is_logotype_special) { echo '<img src="'.get_is_logotype_special().'" class="article-news__icon" />'; } ?>
  <?php if($tags): ?><p class="descr article-news__tags"><?php foreach ($tags as $tag) { echo $tag->name; } ?></p><?php endif; ?>
  <?php if($title): ?><p class="descr article-news__descr"><?php echo esc_html($title); ?></p><?php endif; ?>
  <?php if($date): ?><p class="descr article-news__date"><?php echo esc_html($date['day']); ?> <?php echo esc_html($date['month_russian']); ?> <?php echo esc_html($date['year']); ?></p><?php endif; ?>
</a>