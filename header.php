<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package webdmitriev
 */

$url = get_template_directory_uri();
$theme = get_post_meta( get_the_ID(), 'theme', true );

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<link rel="shortcut icon" href="<?= esc_url($url); ?>/favicon.ico" type="image/x-icon">

	<script>
		(function() {
			const savedTheme = localStorage.getItem('theme');
			if (savedTheme === 'dark') {
				document.documentElement.classList.add('theme-dark');
			}
		})();
	</script>

	<?php wp_head(); ?>
</head>

<body <?php body_class(['is-animation', $theme]); ?>>

	<div id="app">

		<header class="header">
			<div class="container df-sp-ce">
				<a href="<?php echo get_home_url( null, '/' ); ?>" class="logotype"><img width="200" src="<?= get_theme_logo() ? get_theme_logo() : 'data:image/gif;base64,R0lGODlhBwAFAIAAAP///wAAACH5BAEAAAEALAAAAAAHAAUAAAIFjI+puwUAOw=='; ?>" alt="MGU" /></a>
				<button class="burger"><span></span></button>
			</div>
		</header>

		<div class="header-popup df-fs-fs">
			<div class="header-popup__content scroll-line-none">
				<div class="header-popup__content-top df-sp-ce">
					<button class="mobile-search-icon">
						<svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M23.5 29C16.0442 29 10 22.9558 10 15.5C10 8.04416 16.0442 2 23.5 2C30.9558 2 37 8.04416 37 15.5C37 22.9558 30.9558 29 23.5 29Z" stroke="#313135" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round"></path>
							<path d="M14 25L2 37" stroke="#313135" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round"></path>
						</svg>
					</button>
					<button class="close-popup"></button>
					<?php get_search_form(); ?>
				</div>
				<?php
					wp_nav_menu( [
						'theme_location'  => 'header-menu-01',
						'menu'            => '',
						'container'       => '',
						'container_class' => '',
						'container_id'    => '',
						'menu_class'      => 'header-menu',
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

					wp_nav_menu( [
						'theme_location'  => 'header-menu-02',
						'menu'            => '',
						'container'       => '',
						'container_class' => '',
						'container_id'    => '',
						'menu_class'      => 'header-menu',
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

					wp_nav_menu( [
						'theme_location'  => 'header-menu-03',
						'menu'            => '',
						'container'       => '',
						'container_class' => '',
						'container_id'    => '',
						'menu_class'      => 'header-menu',
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

			<div class="header-bottom df-sp-ce">
				<button class="eye">
					<svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
						<circle cx="29" cy="29" r="29" fill="#313135"></circle>
						<path d="M34.8022 28.4995C34.8022 31.6631 32.2045 34.2278 29 34.2278C25.7956 34.2278 23.1978 31.6631 23.1978 28.4995C23.1978 25.3358 25.7956 22.7712 29 22.7712C32.2045 22.7712 34.8022 25.3358 34.8022 28.4995Z" fill="white"></path>
						<path fill-rule="evenodd" clip-rule="evenodd" d="M9 28.5C9 28.5 18.0549 17 29 17C39.9451 17 49 28.5 49 28.5C49 28.5 39.989 40 29 40C18.011 40 9 28.5 9 28.5ZM19.4615 28.5C19.4615 33.7075 23.7253 37.917 29 37.917C34.2747 37.917 38.5385 33.6642 38.5385 28.5C38.5385 23.2925 34.2747 19.083 29 19.083C23.7253 19.083 19.4615 23.2925 19.4615 28.5Z" fill="white"></path>
					</svg>
				</button>

				<div class="mobile-eye_content df-fe-ce">
					<a href="<?php echo get_home_url( null, '/svedeniya-ob-obrazovatelnoj-organizaczii' ); ?>" class="mobile-page d-block mr-20"><svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="29" cy="29" r="29" fill="#C4C4C4"></circle><path d="M22 25H38V23H22V25Z" fill="white"></path><path d="M38 30H22V28H38V30Z" fill="white"></path><path d="M22 35H38V33H22V35Z" fill="white"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M43 44H17V11H33L43 21V44ZM41 42H19V13H32L32 18H22V20H32V22L41 22V42ZM34 15.8284L38.1716 20L34 20V15.8284Z" fill="white"></path></svg></a>
					<a href="https://en.mgubs.ru/" target="_blank" rel="noopener noreferrer" class="mgu-en" title="EN-RU">
						<svg width="106" height="58" viewBox="0 0 106 58" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g clip-path="url(#clip0_8576_4003)">
								<path d="M29 57.5L77 57.5C92.7401 57.5 105.5 44.7401 105.5 29C105.5 13.2599 92.7401 0.499999 77 0.499998L29 0.499993C13.2599 0.499992 0.500004 13.2599 0.500002 29C0.500001 44.7401 13.2599 57.5 29 57.5Z" stroke="#C4C4C4"></path>
								<path d="M3 29C3 43.3594 14.6406 55 29 55C43.3594 55 55 43.3594 55 29C55 14.6406 43.3594 3 29 3C14.6406 3 3 14.6406 3 29Z" fill="#313135"></path>
								<path d="M17.3509 37.0006H15.4809V21.6006C15.8036 21.6006 16.5442 21.5933 17.7029 21.5786C18.8616 21.5639 19.4996 21.5566 19.6169 21.5566C23.2689 21.5566 25.0949 23.0819 25.0949 26.1326C25.0949 27.2619 24.7649 28.2153 24.1049 28.9926C23.4596 29.7553 22.6749 30.2539 21.7509 30.4886L26.8769 37.0006H24.5889L19.8589 30.8406H17.3509V37.0006ZM19.5069 23.3166C19.0376 23.3166 18.3189 23.3313 17.3509 23.3606V29.0806H19.6169C20.5556 29.0806 21.3696 28.8166 22.0589 28.2886C22.7629 27.7459 23.1149 27.0346 23.1149 26.1546C23.1149 24.2626 21.9122 23.3166 19.5069 23.3166ZM41.7396 21.6006V30.5766C41.7396 32.7913 41.175 34.4486 40.0456 35.5486C38.9163 36.6486 37.4936 37.1986 35.7776 37.1986C33.8563 37.1986 32.309 36.6193 31.1356 35.4606C29.977 34.2873 29.3976 32.6079 29.3976 30.4226V21.6006H31.2676V30.0706C31.2676 31.7573 31.6563 33.0773 32.4336 34.0306C33.2256 34.9693 34.3403 35.4386 35.7776 35.4386C37.0683 35.4386 38.073 34.9986 38.7916 34.1186C39.5103 33.2239 39.8696 31.9186 39.8696 30.2026V21.6006H41.7396Z" fill="white"></path>
								<path d="M64.1674 36.9996V21.5996H72.8574V23.3596H66.0374V28.3316H72.1974V30.0916H66.0374V35.2396H73.0774V36.9996H64.1674ZM89.6917 36.9996H88.1957L78.5817 24.8996V36.9996H76.8217V21.5996H78.3177L87.9317 33.7436V21.5996H89.6917V36.9996Z" fill="#C4C4C4"></path>
							</g>
							<defs>
								<clipPath id="clip0_8576_4003">
									<rect width="106" height="58" fill="white"></rect>
								</clipPath>
							</defs>
						</svg>
					</a>
				</div>
			</div>
		</div>
