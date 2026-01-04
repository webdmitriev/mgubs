<form class="search-form" role="search" method="get" id="searchform" action="<?php echo home_url('/') ?>" autocomplete="off">
  <label><input type="search" class="search-field" placeholder="Поиск…" value="<?php echo get_search_query() ?>" name="s" id="s"></label>
  <input type="submit" class="search-submit" id="searchsubmit" value="Поиск" />
  <ul class="ajax-search scroll-line-none"></ul>
</form>