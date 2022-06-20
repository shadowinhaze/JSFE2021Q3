export default class HomeButtons {
    static container = null;
    
    static genHomeButtons() {
        const parentContainer = document.querySelector('.main-screen__content');
        if (parentContainer.children.length > 1) return;
        
        HomeButtons.container = document.createElement('div');
        HomeButtons.container.classList.add('button-block');

        HomeButtons.container.innerHTML = `
            <button class="default-button mode artist">Artist quiz</button>
            <button class="default-button mode pictures">Pictures quiz</button>
        `
        const homeButtons = HomeButtons.container.querySelectorAll('.mode')
        homeButtons.forEach( button => {
            button.addEventListener('click', (e) => {
                if (e.target.classList.contains('artist')) {
                    localStorage.mode = 'artist';
                    location.hash = '#categories';
                    location.reload();
                } else {
                    localStorage.mode = 'pictures';
                    location.hash = '#categories';
                    location.reload();
                }
            })
        });

        parentContainer.append(HomeButtons.container)
    }
}