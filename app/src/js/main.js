require('jquery');
require('@fancyapps/fancybox');
require('handlebars');

init();

function init() {
  setLanguage();
}

function setLanguage(el) {
  var _newLangRequested = el ? el.data('lang') : 'en';

  getDataByLanguage(_newLangRequested, '#hero-tpl', "#hero-tpl-anchor", buildPage);
}

function getDataByLanguage(language, tplId, anchor, callback) {
  var _path = baseCDN + 'assets/data/' + language + '.json';

  $.getJSON(_path, function(data) {
      var template = $(tplId).html();
      var stone = Handlebars.compile(template)(data);

      $(anchor).html(stone);
      if (callback) { callback(language, data) }
  })
}

function buildPage(language, data) {
  var $languageEl = $('.js-language-select');
  var _activeClass = 'active';

  handleEmailForm(data);

  //replace video source
  $('.js-video').attr('src', baseCDN + 'assets/img/vhero-d2.mp4');

  // Handle Fancybox
  $(".fancybox").click(function() {
      $.fancybox({
          'padding': 0,
          'title': this.title,
          'href': this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
          'type': 'swf',
          'swf': {
            'wmode': 'transparent',
            'allowfullscreen': true
          },
          'closeBtn': false
      });

      return false;
  });

  // Add Active To Language Selection
  $languageEl.find("[data-lang='" + language + "']").addClass(_activeClass);

  // Change language
  $languageEl.children('a').click(function(e) {
    if (!$(this).hasClass(_activeClass)) {
      var $vm = $(this);

      $vm.siblings().removeClass(_activeClass);
      setLanguage($vm);
    }
  });
}

function handleEmailForm(data) {
  $('.js-email-form').on('submit', function () {
    var vm = $(this);
    var _errorClass = 'js-error';
    var $hasError = vm.hasClass(_errorClass);
    var $input = vm.find('input[type=text]').val();

    if ($input && validateEmail($input)) {
      Sailthru.integration("userSignUp", {
          "email" : $input,
          "lists" : {
            "CollagenPreLaunchInterest" : 1
          },
          "source" : "web",
          "vars" : {
            "webalias": fetchWebAlias()
          },
          "onSuccess" : function() {
            sendLead($input);
            vm.removeClass(_errorClass).addClass('success');
            vm.html($(
              '<div class="email-form__success">' +
                data.form.success +
              '</div>'
            ));
           },
          "onError" : function() {
            console.log("We've encountered an error signing you up. Please try again.");
           }
      });
    } else {
      if (!$hasError) {
        vm.append('<div class="email-form__error">' + data.form.error + '</div>');
        vm.addClass(_errorClass);
      }
    }

    return false;
  });
}

function sendLead(email) {
  var _name = 'unknown';

  $.ajax({
      type: 'POST',
      url: '/ajax/email',
      data: {
        email,
        firstname: _name,
        lastname: _name
      },
      success: function (response) {
        console.log('successfully sent', response)
      },
      error: function (error) {
        console.log('error sending', error)
      }
    });
}

function fetchWebAlias() {
  var full = window.location.host;
  var parts = full.split('.');

  if (parts.length > 2) {
    return parts[0]
  }

  return false;
}

function validateEmail(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
}
