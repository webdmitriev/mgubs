<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package webdmitriev
 */

$url = get_template_directory_uri();

$options = get_option('theme_settings');
$footer_program = $options['footer_edu_program'] ?? '';

?>
		<div style="display: block; width: 100%; height: 200px;"></div>

		<footer class="footer">
			<div class="container">
				<div class="footer-blocks">
					<div class="footer-block">
						<h3 class="h3">Навигация</h3>
						<?php
							wp_nav_menu( [
								'theme_location'  => 'navigation-menu',
								'menu'            => '',
								'container'       => '',
								'container_class' => '',
								'container_id'    => '',
								'menu_class'      => 'footer-menu',
								'menu_id'         => '',
								'echo'            => true,
								'fallback_cb'     => 'wp_page_menu',
								'before'          => '',
								'after'           => '',
								'link_before'     => '',
								'link_after'      => '',
								'items_wrap'      => '<ul id="%1$s" class="%2$s">%3$s</ul>',
								'depth'           => 0,
								'walker'          => '',
							] );
						?>
					</div>
					<div class="footer-block">
						<h3 class="h3">Программы</h3>
						<?php
							wp_nav_menu( [
								'theme_location'  => 'educational-programs-menu',
								'menu'            => '',
								'container'       => '',
								'container_class' => '',
								'container_id'    => '',
								'menu_class'      => 'footer-menu',
								'menu_id'         => '',
								'echo'            => true,
								'fallback_cb'     => 'wp_page_menu',
								'before'          => '',
								'after'           => '',
								'link_before'     => '',
								'link_after'      => '',
								'items_wrap'      => '<ul id="%1$s" class="%2$s">%3$s</ul>',
								'depth'           => 0,
								'walker'          => '',
							] );
						?>
					</div>
					<!--  -->
					<?php if (!empty($footer_program)) {
						$footer_posts = get_footer_posts_by_program($footer_program, 5);
						if ($footer_posts->have_posts()):
					?>
						<div class="footer-block">
							<h3 class="h3">Анонсы событий</h3>
							<?php
							$has_future_events = false;
								while ($footer_posts->have_posts()) : $footer_posts->the_post();
									$date_info = format_date_russian(get_post_meta(get_the_ID(), 'date_start', true));
									$date_time = get_post_meta(get_the_ID(), 'date_time', true);

									if ($date_info && $date_info['is_future']) :
										$has_future_events = true;
							?>
								<a href="<?php the_permalink(); ?>" class="program-item df-fs-st">
									<div class="program-item__date">
										<?php if ($date_info) : ?>
											<div class="program-item__day"><?php echo esc_html($date_info['day']); ?></div>
											<div class="program-item__month"><?php echo esc_html($date_info['month_russian']); ?></div>
										<?php else : ?>
											<div class="program-item__day">--</div>
											<div class="program-item__month">Даты нет</div>
										<?php endif; ?>
									</div>
									<div class="program-item__content">
										<div class="program-item__title"><?php the_title(); ?></div>
										<div class="program-item__time"><?php echo !empty($date_time) ? esc_html($date_time) : 'Время уточняется'; ?></div>
									</div>
								</a>
								<?php endif; endwhile;
								if (!$has_future_events): ?>
									<p class="no-events-message">Ближайших событий нет</p>
								<?php endif; ?>
						</div>
					<?php endif; wp_reset_postdata(); } ?>
				</div>

				<?php
					$social = get_theme_social();
					if (!empty($social)):
				?>
					<div class="footer-socials df-fs-fs">
						<?php foreach ($social as $key => $value) { ?>
							<a href="<?php echo esc_url($value['link']); ?>" target="_blank" rel="noopener noreferrer" class="footer-social">
								<img src="<?php echo esc_url($url); ?>/assets/img/icons/icon-<?= $value['icon'] ?>.svg" alt="" />
							</a>
						<?php } ?>
					</div>
				<?php endif; ?>

				<div class="footer-bottom">
					<p class="descr">Copyright © <?php echo date('Y'); ?> — Высшая школа бизнеса МГУ. All Rights Reserved</p>
					<a href="#" class="descr">Сведения об образовательной организации</a>
					<?php $description = get_footer_description(); ?>
					<?php if (!empty($description)): ?><p class="descr"><?php echo esc_html($description); ?></p><?php endif; ?>
				</div>
			</div>
		</footer>

		<div class="overlay"></div>

		<div class="popup-call" style="display: none;">
			www
		</div>

		<div class="popup popup-video" style="display: none;"></div>
	</div><!-- #app -->

<?php wp_footer(); ?>

</body>
</html>
