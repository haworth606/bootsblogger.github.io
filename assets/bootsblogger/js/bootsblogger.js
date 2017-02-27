/*!
 * Bootsblogger v1.0.0-alpha.1 (https://bootsblogger.github.io)
 * Copyright 2017 Igoy Nawamreh
 * Licensed under MIT (https://github.com/bootsblogger/bootsblogger/blob/master/LICENSE)
 */

(function ($) {
  'use strict';

  $(function () {

    $('.post-clickable').on('click', function () {
      window.location = $(this).attr('data-url')
    })

    $('.post-clickable a').on('click', function (e) {
      e.stopPropagation()
    })

  })

}(jQuery));

(function ($) {
  'use strict';

  $(function () {

    // COLLAPSABLE WIDGET
    // ==================

    $('.wg-collapse .widget:not(.PlusOne):not(.PlusBadge):not(.Translate)').each(function () {
      var wgId = $(this).attr('id')

      $(this).find('.widget-content').wrap('<div class="widget-collapse"></div>')
      $(this).find('.widget-collapse').attr('id', 'wg-collapse-' + wgId).addClass('collapse')

      $(this).find('h2').attr({
        'data-toggle' : 'collapse',
        'data-target' : '#wg-collapse-' + wgId
      })
      .addClass('collapsed').append('<i class="indicator fa fa-plus-circle pull-right" aria-hidden="true"></i>')
      .css('cursor', 'pointer')

      // On hide
      $(this).on('hide.bs.collapse', function () {
        $(this).find('h2').addClass('wg-title-hide-collapsing')
      })

      // On hidden
      $(this).on('hidden.bs.collapse', function () {
        $(this).find('.indicator').addClass('fa-plus-circle').removeClass('fa-minus-circle')
        $(this).find('h2').removeClass('wg-title-hide-collapsing')
      })

      // On show
      $(this).on('show.bs.collapse', function () {
        $(this).find('h2').addClass('wg-title-show-collapsing')
      })

      // On shown
      $(this).on('shown.bs.collapse', function () {
        $(this).find('.indicator').addClass('fa-minus-circle').removeClass('fa-plus-circle')
        $(this).find('h2').removeClass('wg-title-show-collapsing')
      })
    })

    $('.wg-collapse.open-all > .widget > .widget-collapse').addClass('show')
    $('.wg-collapse.open-all > .widget > h2').removeClass('collapsed')
    $('.wg-collapse.open-all > .widget > h2 .indicator').removeClass('fa-plus-circle').addClass('fa-minus-circle')

    $('.wg-collapse.open-first > .widget:first-child > .widget-collapse').addClass('show')
    $('.wg-collapse.open-first > .widget:first-child > h2').removeClass('collapsed')
    $('.wg-collapse.open-first > .widget:first-child > h2 .indicator').removeClass('fa-plus-circle').addClass('fa-minus-circle')


    // ACCORDION WIDGET
    // ================

    $('.wg-accordion .widget:not(.PlusOne):not(.PlusBadge):not(.Translate)').each(function () {
      var wgId = $(this).attr('id')
      var wgParentId = $(this).parent('.wg-accordion').attr('id')

      $(this).addClass('card')
      $(this).find('.widget-content').wrap('<div class="widget-collapse"></div>')
      $(this).find('.widget-collapse').attr('id', 'wg-collapse-' + wgId).addClass('collapse')

      $(this).find('h2').attr({
        'data-toggle' : 'collapse',
        'data-target' : '#wg-collapse-' + wgId,
        'data-parent' : '#' + wgParentId
      })
      .addClass('collapsed').append('<i class="indicator fa fa-chevron-right pull-right" aria-hidden="true"></i>')
      .css('cursor', 'pointer')

      // On hide
      $(this).on('hide.bs.collapse', function () {
        $(this).find('.indicator').addClass('fa-chevron-right').removeClass('fa-chevron-down')
        $(this).find('h2').addClass('wg-title-hide-collapsing')
      })

      // On hidden
      $(this).on('hidden.bs.collapse', function () {
        $(this).find('h2').removeClass('wg-title-hide-collapsing')
      })

      // On show
      $(this).on('show.bs.collapse', function () {
        $(this).find('.indicator').addClass('fa-chevron-down').removeClass('fa-chevron-right')
        $(this).find('h2').addClass('wg-title-show-collapsing')
      })

      // On shown
      $(this).on('shown.bs.collapse', function () {
        $(this).find('h2').removeClass('wg-title-show-collapsing')
      })
    })

    $('.wg-accordion.open-first > .widget:first-child > .widget-collapse').addClass('show')
    $('.wg-accordion.open-first > .widget:first-child > h2').removeClass('collapsed')
    $('.wg-accordion.open-first > .widget:first-child > h2 .indicator').removeClass('fa-chevron-right').addClass('fa-chevron-down')

  })

}(jQuery));

(function ($) {
  'use strict';

  $(function () {

    // HTML converter

    $('.js-comment-convert-btn').on('click', function () {
      var original = $('.js-comment-convert-textarea').val()
      var converted = original
      converted = converted.replace(/</g, '&lt;')
      converted = converted.replace(/>/g, '&gt;')

      $('.js-comment-convert-textarea').val(converted).focus().select().prop('readonly', true)
      $(this).hide()
      $('.js-comment-convert-btn-clear').show()
    })

    $('.js-comment-convert-btn-clear').on('click', function () {
      $('.js-comment-convert-textarea').val('').focus().select().prop('readonly', false)
      $(this).hide()
      $('.js-comment-convert-btn').show()
    })


    // Add/remove `.active` for form container

    $('.comment-form-container-original').addClass('active')

    $('.js-comment-action').on('click', function () {
      $('.comment-form-container-original, .comment-form-container-reply').each(function () {
        if ($(this).find('.comment-form').length) {
          $(this).addClass('active')
        } else {
          $(this).removeClass('active')
        }
      })
    })


    // Add/remove `.show` for `add comment` and `cancel reply` wrapper

    $('.js-comment-action').on('click', function () {
      $('.js-comment-action').removeClass('active')
      $(this).addClass('active')

      $('.comment-form-container-original').each(function () {
        if ($(this).find('.comment-form').length) {
          $('body').find('.comment-add-wrapper').removeClass('show')
        } else {
          $('body').find('.comment-add-wrapper').addClass('show')
        }
      })
      $('.comment-form-container-reply').each(function () {
        if ($(this).find('.comment-form').length) {
          $('body').find('.comment-cancel-wrapper').addClass('show')
        } else {
          $('body').find('.comment-cancel-wrapper:not(.show)').removeClass('show')
        }
      })
    })


    // Loading animation

    $('.comment-form').addClass('comment-form-loading')

    $('#comment-editor').on('load', function () {
      $('.comment-form').removeClass('comment-form-loading')
    })

    $('.js-comment-action').click(function () {
      $('.comment-form').addClass('comment-form-loading')

      $('#comment-editor').on('load', function () {
        $('.comment-form').removeClass('comment-form-loading')
      })
    })


    // Avatar

    // Resize
    if (document.getElementById('comments') !== null) {
      var commentResizeAvatar = document.getElementById('comments')
      var commentAvatar = commentResizeAvatar.getElementsByTagName('span')
      if (commentAvatar) {
        for (var i = 0; i < commentAvatar.length; i++) {
          var s = commentAvatar.item(i).innerHTML
          if (s.indexOf('style="') != -1) {
            s = s.replace(/src="https:\/\/img1.blogblog.com\/img\/blank.gif"/, '')
            s = s.replace(/src="http:\/\/img1.blogblog.com\/img\/blank.gif"/, '')
            s = s.replace(/display: none/i, '')
            s = s.replace(/longdesc=/i, 'src=')
            s = s.replace(/\/s[0-9]+\//, '/s50/')
            commentAvatar.item(i).innerHTML = s
          }
        }
      }
    }

    // Replace blank image
    $('#comments img[src="//img1.blogblog.com/img/blank.gif"]').attr('src', 'https://placehold.it/50/777/eee?text=?')

  })

}(jQuery));


// Comment editor iframe for reply form
//
// Original <http://www.dte.web.id/2013/01/membuat-fitur-komentar-berbalas.html>

if (document.getElementById('comment-editor') !== null) {
  var commentEditorIframeOriginal = document.getElementById('comment-editor').src.split('#')
  function reply(id) {
    var form = document.getElementById('comment-form')
    var frame = document.getElementById('comment-editor')
    var container = (id != 'cancel') ? document.getElementById('comment-form-container-reply-' + id) : document.getElementById('comment-form-container-original')
    var part = commentEditorIframeOriginal

    container.insertBefore(form, null)
    frame.src = (id != 'cancel') ? part[0] + '&parentID=' + id + '#' + part[1] : part[0] + '#' + part[1]
  }
}
