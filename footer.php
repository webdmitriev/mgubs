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

					<div class="footer-bottom">
						<p>© <?php echo date('Y'); ?> NZ Overseas | All Right reserved</p>
					</div>
				</div>
			</div>
		</footer>

		<div class="overlay"></div>
	</div><!-- #app -->

<?php wp_footer(); ?>

</body>
</html>
