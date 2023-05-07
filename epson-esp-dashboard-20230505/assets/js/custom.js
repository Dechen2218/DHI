$(document).ready(function () {
  // Responsive Tabs
  $('.nav-tabs').responsiveTabs()

  // If redirecting from another page with hash in window.location
  if (window.location.hash) {
    var hash = window.location.hash
    var formIdArray = ['#F1', '#F2', '#F3', '#F4']

    if (formIdArray.includes(hash)) {
      var tabContentId = `#` + $(hash).parent()[0].id
      var formId = hash

      // set active for form nav tab
      $('.nav-link').removeClass('active')
      $('.nav-link')
        .filter(function () {
          return this.hash == tabContentId
        })
        .addClass('active')

      // show tab content
      $('.tab-pane').removeClass('show active')
      $(tabContentId).addClass('show active')

      // show selected form
      $(formId).removeClass('d-none')
      // hide form selection
      $('.form-selection').addClass('d-none')
    } else if (window.location.pathname.includes('inbox.html')) {
      var tabPaneId = hash
      // set active for form nav tab
      $('.nav-link').removeClass('active')
      $('.nav-link')
        .filter(function () {
          return this.hash == tabPaneId
        })
        .addClass('active')

      // show tab content
      $('.tab-pane').removeClass('show active')
      $(hash).addClass('show active')
    }
  }

  // ========== New Request Page ==========

  // nav item on click
  $(document).on('click', '#NewRequest .nav-item', function () {
    // show form selection section
    $('.form-selection').removeClass('d-none')
    // hide all form
    $('form').addClass('d-none')
  })

  $('#NewRequest .form-selection .ep-sq-btn').click(function () {
    // show selected form and hide form selection
    if ($(this).hasClass('F1')) {
      $('#F1').removeClass('d-none')
      $('.form-selection').addClass('d-none')
    } else if ($(this).hasClass('F2')) {
      $('#F2').removeClass('d-none')
      $('.form-selection').addClass('d-none')
    }
  })

  // ========== New Request Page ==========

  // ========== Report Page ==========

  // nav item on click
  $(document).on('click', '#Reports .nav-item', function () {
    // show form selection section
    $('.form-selection').removeClass('d-none')
    // hide all form
    $('form').addClass('d-none')
  })

  $('#Reports .form-selection .ep-sq-btn').click(function () {
    // show selected form and hide form selection
    if ($(this).hasClass('F3')) {
      $('#F3').removeClass('d-none')
      $('.form-selection').addClass('d-none')
    } else if ($(this).hasClass('F4')) {
      $('#F4').removeClass('d-none')
      $('.form-selection').addClass('d-none')
    }
  })

  // ========== Report Page ==========

  // ========== Admin Page ==========

  $('#Admin .ep-card .ep-sq-btn').click(function () {
    if ($(this).hasClass('F4')) {
      window.location = 'reports.html#F4'
    }
  })
})
