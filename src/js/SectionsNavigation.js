//Sections Navigation
import { sidebar } from './main.js';
import { showCurrentSection } from './main.js';
export class SectionsNavigation {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.lastSection = localStorage.getItem('lastSection');
        //bind events
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                //Change URL
                e.preventDefault();
                this.navigate(link.dataset.path);
                this.setActiveSection(link.dataset.path);
                sidebar.closeSidebar();
            });
        });
    }
    navigate(path) {
        window.location.hash = path;
        //history.pushState(null, '', path);    // Use history.pushState if you want a  "URL" without #
    }
    setActiveSection(path) {
        this.navLinks.forEach(nav => {
            const span = nav.querySelector('span');
            if (nav.dataset.path === path) {
                nav.classList.remove('text-gray-600', "hover:bg-gray-50");
                nav.classList.add('text-emerald-700', "bg-emerald-50");
                span.classList.replace('font-medium', 'font-semibold');
            }
            else {
                nav.classList.remove('text-emerald-700', "bg-emerald-50");
                nav.classList.add('text-gray-600', "hover:bg-gray-50");
                span.classList.replace('font-semibold', 'font-medium');
            }

        });
        localStorage.setItem('lastSection', path)
        showCurrentSection(path);
    }
}