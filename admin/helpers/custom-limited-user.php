<?php
/**
 * Custom User with Limited Rights
 * Add this file to your theme and include it in functions.php
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class Custom_Limited_User {
    
    private $user_login = 'content_editor'; // Change this to desired username
    private $user_email = 'dwyeiwuvdwtyi@dweferferfrr.com'; // Change this to desired email
    private $user_pass = 'lyykkf317sfD&5BxzIO78xhc'; // Change this to strong password
    private $user_role = 'limited_page_editor';
    
    public function __construct() {
        // Create custom role
        add_action('init', array($this, 'create_custom_role'));
        
        // Create user if it doesn't exist
        add_action('init', array($this, 'create_custom_user'));
        
        // Modify capabilities for this specific user
        add_action('admin_init', array($this, 'restrict_user_capabilities'));
        
        // Remove unnecessary menu items
        add_action('admin_menu', array($this, 'custom_admin_menu'), 999);
        
        // Redirect from admin pages they shouldn't access
        add_action('admin_init', array($this, 'redirect_from_pages'));
    }
    
    /**
     * Create custom role with limited capabilities
     */
    public function create_custom_role() {
        // Remove role if it exists (for updates)
        remove_role($this->user_role);
        
        // Capabilities for editing ONLY their own pages
        $capabilities = array(
            'read' => true,
            'edit_pages' => true,
            'edit_others_pages' => false,
            'edit_published_pages' => true,
            'publish_pages' => false,
            'delete_pages' => false,
            'delete_others_pages' => false,
            'delete_published_pages' => false,
            'upload_files' => true, // To add images to pages
            'unfiltered_html' => false, // For security
        );
        
        add_role(
            $this->user_role,
            __('Limited Page Editor', 'text-domain'),
            $capabilities
        );
    }
    
    /**
     * Create the user if doesn't exist
     */
    public function create_custom_user() {
        if (!username_exists($this->user_login) && !email_exists($this->user_email)) {
            $user_id = wp_create_user(
                $this->user_login,
                $this->user_pass,
                $this->user_email
            );
            
            if (!is_wp_error($user_id)) {
                $user = new WP_User($user_id);
                $user->set_role($this->user_role);
                
                // Log user creation (optional)
                error_log('Limited user created: ' . $this->user_login);
            }
        }
    }
    
    /**
     * Additional restrictions for this specific user
     */
    public function restrict_user_capabilities() {
        $current_user = wp_get_current_user();
        
        if ($current_user->user_login === $this->user_login) {
            // Filter to only show their own pages
            add_filter('parse_query', array($this, 'show_only_own_pages'));
            
            // Prevent access to theme/plugin editors
            if (defined('DISALLOW_FILE_EDIT')) {
                define('DISALLOW_FILE_EDIT', true);
            }
        }
    }
    
    /**
     * Show only pages created by this user
     */
    public function show_only_own_pages($query) {
        global $pagenow, $current_user;
        
        if ($pagenow == 'edit.php' && isset($query->query_vars['post_type']) && $query->query_vars['post_type'] == 'page') {
            $query->set('author', $current_user->ID);
        }
        
        return $query;
    }
    
    /**
     * Remove admin menu items for this user
     */
    public function custom_admin_menu() {
        $current_user = wp_get_current_user();
        
        if ($current_user->user_login === $this->user_login) {
            // Remove menus
            remove_menu_page('tools.php');
            remove_menu_page('options-general.php');
            remove_menu_page('themes.php');
            remove_menu_page('plugins.php');
            remove_menu_page('users.php');
            remove_menu_page('edit-comments.php');
            
            // Remove appearance submenus
            remove_submenu_page('themes.php', 'themes.php');
            remove_submenu_page('themes.php', 'customize.php');
            remove_submenu_page('themes.php', 'widgets.php');
            remove_submenu_page('themes.php', 'menus.php');
        }
    }
    
    /**
     * Redirect from admin pages they shouldn't access
     */
    public function redirect_from_pages() {
        $current_user = wp_get_current_user();
        
        if ($current_user->user_login === $this->user_login) {
            global $pagenow;
            
            $restricted_pages = array(
                'tools.php',
                'options-general.php',
                'themes.php',
                'plugins.php',
                'users.php',
                'edit-comments.php',
                'site-health.php',
                'export.php',
                'import.php'
            );
            
            if (in_array($pagenow, $restricted_pages)) {
                wp_redirect(admin_url('edit.php?post_type=page'));
                exit;
            }
        }
    }
}

// Initialize the class
new Custom_Limited_User();