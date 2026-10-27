'use strict';

async function loadMenu({
  expandedSubMenu = [],
  activePage = ''
} = {}) {
  const sidebarMenu = document.getElementById('sidebarMenu');

  const response = await fetch('../menu.json');
  const menuItems = await response.json();

  menuItems.forEach(item => {
    const menuGroup = document.createElement('li');
    menuGroup.setAttribute('data-role', 'menu-group');
    menuGroup.classList.add('flex','flex-col','gap-px');

    const menuGroupLink = document.createElement('div');
    menuGroupLink.classList.add('flex','gap-0.5');

    const menuLink = document.createElement('a');
    menuLink.setAttribute('href', '');
    menuLink.setAttribute('data-role', 'menu-link');
    menuLink.classList.add(
      'flex-1',
      'flex',
      'items-center',
      'h-7',
      'px-1',
      'gap-[3px]',
      'rounded-sm',
      'text-slate-950',
      'dark:text-white',
      'hover:bg-slate-100',
      'dark:hover:bg-slate-900/70'
    );

    menuLink.innerHTML = `
      <i data-lucide="chevron-right" class="w-3.5 h-3.5 rotate-90 opacity-60 dark:opacity-40"></i>
      <span class="uppercase text-xs font-semibold tracking-wider dark:font-medium">${item.name}</span>
    `;

    menuLink.addEventListener('click', (e) => {
      e.preventDefault();

      const menuGroup = e.target.closest('li');
      const subMenu = menuGroup.querySelector('ul');

      subMenu.classList.toggle('hidden');
      menuLink.querySelector('svg').classList.toggle('rotate-90');
    });

    menuGroupLink.appendChild(menuLink);

    //------------------

    const menuToggle = document.createElement('a');

    menuToggle.setAttribute('href', '');
    menuToggle.setAttribute('data-role', 'menu-toggle');
    menuToggle.setAttribute('aria-expanded', false);

    menuToggle.classList.add(
      'w-7',
      'h-7',
      'flex',
      'items-center',
      'justify-center',
      'rounded-sm',
      'opacity-40',
      'hover:opacity-100',
      'hover:bg-slate-100',
      'dark:text-slate-200',
      'dark:hover:bg-slate-900/70'
    );

    menuToggle.innerHTML = `
      <i data-lucide="chevrons-up-down" class="w-3.5 h-3.5"></i>
      <i data-lucide="chevrons-down-up" class="w-3.5 h-3.5 hidden"></i>
    `;

    menuToggle.addEventListener('click', (e) => {
      e.preventDefault();

      const isExpanded = (menuToggle.getAttribute('aria-expanded') === 'true')? true : false;

      const menuGroup = menuToggle.closest('[data-role="menu-group"]');
      const menuLink = menuGroup.querySelector('[data-role="menu-link"]');

      const subMenu = menuGroup.querySelector('[data-role="submenu"]');
      const subMenuLinks = menuGroup.querySelectorAll('[data-role="submenu-link"]');

      const subNav = menuGroup.querySelectorAll('nav');

      if(isExpanded) {
        subMenuLinks.forEach(link => link.querySelector('svg').classList.remove('rotate-90'));
        subNav.forEach(nav => nav.classList.add('hidden'));
      } else {
        subMenuLinks.forEach(link => link.querySelector('svg').classList.add('rotate-90'));
        subNav.forEach(nav => nav.classList.remove('hidden'));

        menuLink.querySelector('svg').classList.add('rotate-90');
        subMenu.classList.remove('hidden');
      }

      menuToggle.setAttribute('aria-expanded', !isExpanded);

      menuToggle.querySelector('svg:first-child').classList.toggle('hidden', !isExpanded);
      menuToggle.querySelector('svg:last-child').classList.toggle('hidden', isExpanded);

      //menuToggleState(mt);
    });

    menuGroupLink.appendChild(menuToggle);

    //------------------

    menuGroup.appendChild(menuGroupLink);

    //------------------ submenu

    const subMenu = document.createElement('ul');
    subMenu.setAttribute('data-role', 'submenu');
    subMenu.classList.add('flex', 'flex-col', 'gap-px');

    item.submenu.forEach(subItem => {
      const submenuItem = document.createElement('li');
      submenuItem.setAttribute('data-role', 'submenu-item');

      const subMenuLink = document.createElement('div');
      subMenuLink.classList.add('flex','gap-0.5');

      subMenuLink.innerHTML = `
        <a data-role="submenu-link" href="${subItem.link}" class="flex-1 flex items-center h-sbn px-1 gap-0.5 rounded-sm hover:bg-slate-100 aria-pressed:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-900/70 dark:aria-pressed:bg-slate-900/70">
          <i data-lucide="chevron-right" class="w-3.5 h-3.5 opacity-60 dark:opacity-40 ${expandedSubMenu.includes(subItem.name) && 'rotate-90'} ${!subItem.subnav && 'invisible'}"></i>
          <div class="flex items-center gap-2">
            <i data-lucide="${subItem.icon}" class="w-4 h-4"></i>
            <span class="text-sm">${subItem.name}</span>
          </div>
        </a>
      `;

      subMenuLink.addEventListener('click', (e) => {
        if(!subItem.link) {
          e.preventDefault();

          const subMenuLinks = document.querySelectorAll('[data-role="submenu-link"]');
          subMenuLinks.forEach(link => link.removeAttribute('aria-pressed'));

          e.currentTarget.setAttribute('aria-pressed', true);
          e.currentTarget.querySelector('svg').classList.toggle('rotate-90');

          const subMenuItem = e.currentTarget.closest('[data-role="submenu-item"]');
          const subNav = subMenuItem.querySelector('nav');

          subNav.classList.toggle('hidden');

          const menuGroup = subMenuItem.closest('[data-role="menu-group"]');
          const menuToggle = menuGroup.querySelector('[data-role="menu-toggle"]');

          const isExpanded = (menuGroup.querySelectorAll('nav.hidden').length) ? false : true;

          menuToggle.setAttribute('aria-expanded', isExpanded);
          menuToggle.querySelector('svg:first-child').classList.toggle('hidden', isExpanded);
          menuToggle.querySelector('svg:last-child').classList.toggle('hidden', !isExpanded);

        }
      });

      submenuItem.appendChild(subMenuLink);

      if(subItem.subnav) {
        const subMenuNav = document.createElement('nav');
        subMenuNav.classList.add('flex','flex-col','gap-px','mt-px', 'hidden');

        if(expandedSubMenu.includes(subItem.name)) subMenuNav.classList.remove('hidden');

        let subnavs = '';
        subItem.subnav.forEach(subnavItem => {
          subnavs += `
            <a href="${subnavItem.link}" ${activePage == subnavItem.name && 'aria-selected="true"'} class="flex items-center h-sbn ${subnavItem.iconsize == 'sm' ? 'pl-11' : 'pl-11.5'} rounded-sm hover:bg-slate-100 aria-selected:bg-slate-100 aria-selected:text-blue-600 dark:text-slate-400 dark:hover:text-slate-300 dark:hover:bg-slate-900/70 dark:aria-selected:bg-slate-900/70 dark:aria-selected:hover:text-blue-600">
              <div class="flex items-center gap-2">
                <i data-lucide="${subnavItem.icon}" class="w-4 h-4 ${subnavItem.iconsize == 'sm' && 'stroke-[1.5]'}"></i>
                <span class="text-sm">${subnavItem.name}</span>
              </div>
            </a>
          `;
        });

        subMenuNav.innerHTML = `${subnavs}`;

        submenuItem.appendChild(subMenuNav);
      }

      subMenu.appendChild(submenuItem);
    });

    //------------------

    menuGroup.appendChild(subMenu);

    sidebarMenu.appendChild(menuGroup);

    //------------------

    lucide.createIcons();
  });
}
