jQuery(function ($) {

  wp.media.view.AttachmentFilters.MediaCategory = wp.media.view.AttachmentFilters.extend({
    id: 'media-category-filter',

    createFilters: function () {
      var filters = {};

      // Добавляем "Все категории"
      filters.all = {
        text: 'Все категории',
        props: { media_category: 0 },
        priority: 10
      };

      // Берём список категорий из wp_localize_script
      _.each(mediaCategoriesList, function (cat) {
        filters['cat-' + cat.id] = {
          text: cat.name,
          props: { media_category: cat.id },
          priority: 20
        };
      });

      this.filters = filters;
    }
  });

  // Добавляем фильтры во все стандартные вкладки медиа
  wp.media.view.AttachmentsBrowser = wp.media.view.AttachmentsBrowser.extend({
    createToolbar: function () {
      wp.media.view.AttachmentsBrowser.__super__.createToolbar.call(this);

      this.toolbar.set(
        'MediaCategoryFilter',
        new wp.media.view.AttachmentFilters.MediaCategory({
          controller: this.controller,
          model: this.collection.props
        }).render()
      );
    }
  });
});
