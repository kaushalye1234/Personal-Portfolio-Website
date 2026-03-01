// 1. Select the button
const themeBtn = document.getElementById('theme-toggle');

// --- 1. THE "CHECK" (Runs immediately when page loads) ---
const currenttheme = localStorage.getItem('theme') ;

if(currenttheme === 'dark'){
    document.body.classList.add('dark-theme');
    themeBtn.textContent = '☀️ Light Mode';
}

// 2. Add a 'click' event listener
themeBtn.addEventListener('click', () => {
    // 3. Toggle the 'dark-theme' class on the body
    document.body.classList.toggle('dark-theme');
    let theme = 'light';// Default
    // Check if we just turned on dark mode
    if(document.body.classList.contains('dark-theme')){
        theme = 'dark';
        themeBtn.textContent = '☀️ Light Mode';
    }else{
        themeBtn.textContent = '🌙 Dark Mode';
    }
    // Save the choice to the "filing cabinet"
    localStorage.setItem('theme', theme);
   
});

