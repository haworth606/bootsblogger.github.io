/*!
 * Bootsblogger v1.0.0-alpha.1 (https://bootsblogger.github.io)
 * Copyright 2017 Igoy Nawamreh
 * Licensed under MIT (https://github.com/bootsblogger/bootsblogger/blob/master/LICENSE)
 */

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
