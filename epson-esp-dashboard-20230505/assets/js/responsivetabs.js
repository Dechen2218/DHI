function storeTabs($tabs, $destination) {
  // measure width
  $tabs.each(function () {
    var width = $(this).outerWidth(true)
    $(this).find('a').data('width', width)
  })
  $tabs.prependTo($destination)

  //   $tabs.find('a').unwrap().removeClass('nav-link').addClass('dropdown-item')
}

function makeTabsResponsive($element) {
  var $tabs = $element.find('li')
  var $firstTab = $tabs.first()

  var individualTabHeight = $firstTab.outerHeight()
  var tabsHeight = $element.outerHeight()

  if (tabsHeight > individualTabHeight) {
    // get y pos of first tab
    var firstTabPos = $firstTab.offset()

    var thisTabPos
    $tabs.each(function () {
      var $thisTab = $(this)

      thisTabPos = $thisTab.offset()

      if (thisTabPos.top > firstTabPos.top) {
        var $dropdown = $element.find('.ep-responsive-tabs')

        if (!$dropdown.length) {
          var dropdownMarkup =
            '<li class="dropdown ep-responsive-tabs">' +
            '<a href="#" class="nav-link rounded-0 dropdown-toggle" data-bs-toggle="dropdown">More</a>' +
            '<div class="dropdown-menu">' +
            '</div></li>'
          $dropdown = $(dropdownMarkup)
          $element.append($dropdown)
        }

        var $previousTab = $thisTab.prev()
        var $followingTabs = $thisTab.nextAll().not('.dropdown')

        var $destination = $('.dropdown-menu', $dropdown)

        if (!$thisTab.hasClass('dropdown')) {
          storeTabs($followingTabs, $destination)
          storeTabs($thisTab, $destination)
        }
        storeTabs($previousTab, $destination)

        return
      }
    })
  } else {
    // check if enough space to move a menu item back out of "..."

    // get parent width
    var parentWidth = $element.parent().width()
    var tabSetWidth = 0
    var xPxAvailable

    // calculate total width of tab set (can't just use width of ul because it is 100% by default)
    $element.children('li').each(function () {
      tabSetWidth += $(this).outerWidth(true)
    })

    // calculate available horizontal space
    xPxAvailable = parentWidth - tabSetWidth

    $element.find('.dropdown-menu a').each(function () {
      if ($(this).data('width') <= xPxAvailable) {
        // fix for bootstrap 4
        $(this).removeClass('dropdown-item').addClass('nav-link')

        $(this)
          .insertBefore($element.find('.ep-responsive-tabs'))
          .wrap('<li class="nav-item"></li>')
        xPxAvailable -= $(this).data('width')
      } else {
        return false
      }
    })

    // if no menu items left, remove "..."
    if (!$element.find('.dropdown-menu a').length) {
      $element.find('.ep-responsive-tabs').remove()
    }
  }
}

$.fn.responsiveTabs = function () {
  this.each(function () {
    var tabs = $(this)
    makeTabsResponsive(tabs)

    $(window).resize(function () {
      makeTabsResponsive(tabs)
    })
  })

  return this
}
