'use strict';

lucide.createIcons();

//////////////////// Variables ////////////////////////
const sidebar = document.getElementById('sidebar');
const header = document.getElementById('header');
const mainContent = document.getElementById('mainContent');

const dropdownLinks = document.querySelectorAll('[data-role="dropdown-link"]');
const dropdownMenus = document.querySelectorAll('[data-role="dropdown-menu"]');

//////////////////// Sidebar Scrollbar ////////////////////////
const ps = new PerfectScrollbar(sidebar, {
  suppressScrollX: true,
  maxScrollbarLength: 0
});

//////////////////// Sidebar Menu ////////////////////////
const menuLinks = document.querySelectorAll('[data-role="menu-link"]');
const subMenuLinks = document.querySelectorAll('[data-role="submenu-link"]');

// Sidebar menu set toggle state
const menuToggleState = (mt) => {
  const mg = mt.closest('[data-role="menu-group"]');
  const ex = (mg.querySelectorAll('nav.hidden').length) ? false : true;

  mt.setAttribute('aria-expanded', ex);
  mt.querySelector('svg:first-child').classList.toggle('hidden', ex);
  mt.querySelector('svg:last-child').classList.toggle('hidden', !ex);
};

menuLinks.forEach((ml) => {
  ml.addEventListener('click', (e) => {
    e.preventDefault();

    const menuGroup = e.target.closest('li');
    const subMenu = menuGroup.querySelector('ul');

    subMenu.classList.toggle('hidden');
    ml.querySelector('svg').classList.toggle('rotate-90');

    subMenuLinks.forEach(sl => sl.removeAttribute('aria-pressed'));

    ps.update();
  });
});

subMenuLinks.forEach((sl) => {
  if(!sl.getAttribute('href')) {
    sl.addEventListener('click', (e) => {
      e.preventDefault();

      subMenuLinks.forEach(sl => sl.removeAttribute('aria-pressed'));

      e.currentTarget.setAttribute('aria-pressed', true);
      e.currentTarget.querySelector('svg').classList.toggle('rotate-90');

      const subMenuItem = e.currentTarget.closest('[data-role="submenu-item"]');
      const subNav = subMenuItem.querySelector('nav');

      subNav.classList.toggle('hidden');

      const menuGroup = subMenuItem.closest('[data-role="menu-group"]');
      const menuToggle = menuGroup.querySelector('[data-role="menu-toggle"]');

      menuToggleState(menuToggle);

      ps.update();
    });
  }
});

const menuToggles = document.querySelectorAll('[data-role="menu-toggle"]');
menuToggles.forEach((mt) => {
  mt.addEventListener('click', (e) => {
    e.preventDefault();

    const ex = mt.getAttribute('aria-expanded');

    const mg = mt.closest('[data-role="menu-group"]');
    const ml = mg.querySelector('[data-role="menu-link"]');

    const sm = mg.querySelector('[data-role="submenu"]');
    const sl = mg.querySelectorAll('[data-role="submenu-link"]');

    const sn = mg.querySelectorAll('nav');

    if(ex === 'true') {
      sl.forEach(sm => sm.querySelector('svg').classList.remove('rotate-90'));
      sn.forEach(nv => nv.classList.add('hidden'));
    } else {
      sl.forEach(sm => sm.querySelector('svg').classList.add('rotate-90'));
      sn.forEach(nv => nv.classList.remove('hidden'));

      ml.querySelector('svg').classList.add('rotate-90');
      sm.classList.remove('hidden');
    }

    subMenuLinks.forEach(sl => sl.removeAttribute('aria-pressed'));

    menuToggleState(mt);

    ps.update();
  });
});


//////////////////// Header Actions ////////////////////////
const toggleMenu = document.getElementById('toggleMenu');
const backdrop = document.getElementById('backdrop');
const desktopNav = window.matchMedia('(min-width: 1024px)');

const closeMobileDrawer = () => {
  if(!backdrop) return;

  sidebar.removeAttribute('data-open');
  backdrop.setAttribute('aria-hidden', 'true');

  if(!desktopNav.matches && toggleMenu) toggleMenu.removeAttribute('aria-expanded');
};

const openMobileDrawer = () => {
  sidebar.removeAttribute('aria-hidden');
  header.removeAttribute('aria-expanded');
  mainContent.removeAttribute('aria-expanded');
  sidebar.setAttribute('data-open', '');
  backdrop.removeAttribute('aria-hidden');
  toggleMenu.setAttribute('aria-expanded', 'true');

  ps.update();
};

if(toggleMenu !== null) {
  toggleMenu.addEventListener('click', (e) => {
    e.preventDefault();

    if(backdrop && !desktopNav.matches) {
      if(sidebar.hasAttribute('data-open')) closeMobileDrawer();
      else openMobileDrawer();
      return;
    }

    const expanded = toggleMenu.getAttribute('aria-expanded');
    if(expanded == null) {
      sidebar.setAttribute('aria-hidden', true);
      header.setAttribute('aria-expanded', true);
      mainContent.setAttribute('aria-expanded', true);

      toggleMenu.setAttribute('aria-expanded', true);

    } else {
      sidebar.removeAttribute('aria-hidden');
      header.removeAttribute('aria-expanded');
      mainContent.removeAttribute('aria-expanded');

      toggleMenu.removeAttribute('aria-expanded');
    }
  });
}

if(backdrop) {
  backdrop.addEventListener('click', closeMobileDrawer);

  desktopNav.addEventListener('change', () => {
    sidebar.removeAttribute('data-open');
    backdrop.setAttribute('aria-hidden', 'true');

    if(!desktopNav.matches) {
      toggleMenu.removeAttribute('aria-expanded');
      header.removeAttribute('aria-expanded');
      mainContent.removeAttribute('aria-expanded');
      sidebar.removeAttribute('aria-hidden');
    }
  });

  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') closeMobileDrawer();
  });
}

const toggleMenu2 = document.getElementById('toggleMenu2');
if(toggleMenu2 !== null) {
  toggleMenu2.addEventListener('click', (e) => {
    e.preventDefault();

    const expanded = toggleMenu2.getAttribute('aria-expanded');
    if(expanded == null) {
      sidebar.removeAttribute('aria-hidden');
      toggleMenu2.removeAttribute('aria-expanded');
      backdrop.removeAttribute('aria-hidden');
    } else {
      sidebar.setAttribute('aria-hidden', true);
      toggleMenu2.setAttribute('aria-expanded', true);
      backdrop.setAttribute('aria-hidden', true);
    }
  });
}

const toggleDarkMode = document.getElementById('toggleDarkMode');
toggleDarkMode.addEventListener('click', (e) => {
  e.preventDefault();

  const html = document.documentElement;
  html.classList.toggle('dark');
});


// Header Profile Menu
const profileLinks = document.querySelectorAll('[data-role="profile-link"]');
profileLinks.forEach(profileLink => {
  const targ = profileLink.getAttribute('data-target');
  const profileMenus = document.querySelectorAll('[data-role="profile-menu"]');

  profileLink.addEventListener('click', (e) => {
    e.preventDefault();

    profileMenus.forEach(profileMenu => {
      const menuId = profileMenu.getAttribute('id');

      if(menuId === targ) profileMenu.classList.remove('hidden');
      else profileMenu.classList.add('hidden');
    });
  });
});

// Reset back to profile menu when dropdown is closed
const backToMenuProfile = () => {
  const userLoggedDropdown = document.getElementById('userLoggedDropdown');
  const menu = document.getElementById('menuProfile');

  console.log(userLoggedDropdown.hasAttribute('aria-hidden'));

  if(userLoggedDropdown.hasAttribute('aria-hidden')) {
    menu.classList.remove('hidden');

    [...menu.parentNode.children].forEach(sibling => {
      if (sibling !== menu) sibling.classList.add('hidden');
    });
  }
};

//////////////////// Global Events ////////////////////////
document.addEventListener('click', function(e) {
  e.stopPropagation();

  // Close any dropdown when clicking outside from it
  const targetDropdownLink = e.target.closest('[data-role="dropdown-link"]');
  const targetDropdownMenu = e.target.closest('[data-role="dropdown-menu"]');

  if(!targetDropdownMenu && !targetDropdownLink) {
    dropdownMenus.forEach((dropdownMenu) => dropdownMenu.setAttribute('aria-hidden', true));
  }

  backToMenuProfile();
});

// Dropdown Menu
dropdownLinks.forEach((dropdownLink) => {
  dropdownLink.addEventListener('click', (e) => {
    e.preventDefault();

    if(dropdownLink.nextElementSibling.hasAttribute('aria-hidden'))
      dropdownLink.nextElementSibling.removeAttribute('aria-hidden');
    else dropdownLink.nextElementSibling.setAttribute('aria-hidden', true);

    dropdownMenus.forEach((dropdownMenu) => {
      if(dropdownMenu !== dropdownLink.nextElementSibling)
        dropdownMenu.setAttribute('aria-hidden', true);
    });
  });
});
