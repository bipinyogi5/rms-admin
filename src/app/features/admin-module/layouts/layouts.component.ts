import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'admin-layouts',
  standalone: true,
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.scss'],
  imports: [RouterModule]
})
export class LayoutsComponent {
  constructor() { 

// TypeScript

// Get the menu item
const menuItem = document.getElementById('menu');

// Add click event listener to the menu item
menuItem?.addEventListener('click', (event) => {
  const clickedMenuItem = event.currentTarget as HTMLElement;
  const subMenu = clickedMenuItem.querySelector('ul');

  // Toggle the visibility of the submenu
  if (subMenu) {
    const isVisible = subMenu.style.display === 'block';
    subMenu.style.display = isVisible ? 'none' : 'block';
  }
}); 
window.addEventListener('click', (event) => {
  const clickedElement = event.target as HTMLElement;
  if (!clickedElement.closest('#menu')) {
    const subMenu = menuItem?.querySelector('ul');
    if (subMenu) {
      subMenu.style.display = 'none';
    }
  }
});

  }
}
