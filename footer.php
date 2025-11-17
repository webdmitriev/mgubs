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

?>
<div style="display: block; width: 100%; height: 400px;"></div>

		<footer class="footer" style="display: none;">
			<div class="container">
				<div class="line-wrap">
					<a href="<?php echo get_home_url( null, '/' ); ?>" class="logotype">logotype</a>

					<?php
						wp_nav_menu( [
							'theme_location'  => 'footer-menu',
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

					<div class="footer-contacts">
						<?php if ($phone = get_theme_phone()): ?>
							<a href="tel:<?php echo esc_attr($phone); ?>">Phone: <?php echo esc_attr($phone); ?></a>
						<?php endif; ?>

						<?php if ($email = get_theme_email()): ?>
							<a href="mailto:<?php echo esc_attr($email); ?>">Email: <?php echo esc_attr($email); ?></a>
						<?php endif; ?>
					</div>

					<?php $partners = get_theme_partners(); if (!empty($partners)): ?>
						<div class="footer-partners">
							<?php foreach ($partners as $partner): if (!empty($partner['link'])): ?>
								<a href="<?php echo esc_url($partner['link']); ?>" target="_blank" rel="noopener noreferrer"><?php echo esc_html($partner['text']); ?></a>
        			<?php endif; endforeach; ?>
						</div>
					<?php endif; ?>

					<div class="footer-bottom">
						<p>© <?php echo date('Y'); ?> NZ Overseas | All Right reserved</p>
					</div>
				</div>
			</div>
		</footer>
	</div><!-- #app -->

<?php wp_footer(); ?>

</body>
</html>
