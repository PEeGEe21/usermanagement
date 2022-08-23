document.addEventListener('click', (e) => {
    const isDropdownButton = e.target.matches("[data-dropdown-btn]")
    if(!isDropdownButton && e.target.closest('[data-dropdown]') != null) return

    let currentDropdown
    if(isDropdownButton){
        currentDropdown = e.target.closest('[data-dropdown]')
        currentDropdown.classList.toggle('show')
        
    }

    document.querySelectorAll("[data-dropdown].show").forEach(dropdown => {
        if(dropdown === currentDropdown) return
        dropdown.classList.remove('show')
    })
})