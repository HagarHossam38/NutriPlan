//Sidebar
export class Sidebar {
    constructor() {
        this.sidebar = document.getElementById('sidebar');
        this.sidebarOverlay = document.getElementById('sidebar-overlay');
        this.headerMenuBtn = document.getElementById('header-menu-btn')
        this.sidebarCloseBtn = document.getElementById('sidebar-close-btn');
        // We use arrow functions here instead of anonymous functions 
        // because arrow functions preserve the context of `this`.
        // In a regular function, `this` refers to the element that triggered the event (e.g., the button),
        // but with an arrow function, `this` keeps referring to the class instance,
        // allowing us to access class properties and methods correctly.
        this.headerMenuBtn.addEventListener('click', () => {
            this.sidebar.classList.add('open');
            this.sidebarOverlay.classList.add('active');
        });
        this.sidebarCloseBtn.addEventListener('click', () => {
            this.closeSidebar();
        })
        this.sidebarOverlay.addEventListener('click', () => {
            this.closeSidebar();
        })

    }
    closeSidebar() {
        this.sidebar.classList.remove('open');
        this.sidebarOverlay.classList.remove('active');
    }
}