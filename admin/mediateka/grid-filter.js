(function ($) {
  if (typeof wp === 'undefined' || typeof wp.media === 'undefined') return;

  // Добавляем фильтр категорий
  wp.media.view.AttachmentFilters.MediaCategory = wp.media.view.AttachmentFilters.extend({
    id: 'media-category-filter',

    createFilters: function () {
      var filters = {};

      filters.all = {
        text: 'Все категории',
        props: { media_category: 0 },
        priority: 10
      };

      _.each(window.mediaCategoriesList, function (cat) {
        filters['cat-' + cat.id] = {
          text: cat.name,
          props: { media_category: cat.id },
          priority: 20
        };
      });

      this.filters = filters;
    },

    /**
     * ВАЖНО! Принудительно обновляем props модели
     */
    change: function () {
      var filter = this.filters[this.el.value];

      // Гарантированно обновляем параметры запроса
      this.model.set(filter.props);

      // Это заставляет WP выполнить новый AJAX-запрос
      this.model.trigger('change');
    }
  });

  // Добавляем select в модальное окно
  wp.media.view.AttachmentsBrowser = wp.media.view.AttachmentsBrowser.extend({
    createToolbar: function () {
      wp.media.view.AttachmentsBrowser.__super__.createToolbar.apply(this, arguments);

      this.toolbar.set(
        'MediaCategory',
        new wp.media.view.AttachmentFilters.MediaCategory({
          controller: this.controller,
          model: this.collection.props,
          priority: -75
        }).render()
      );
    }
  });

})(jQuery);
