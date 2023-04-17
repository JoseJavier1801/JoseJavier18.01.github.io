    const darkMode= document.querySelector('#dark-mode-toggle');
      const body = document.querySelector('body');
      const header = document.querySelector('header');
      const main = document.querySelector('main');
      const footer = document.querySelector('footer');
      const a = document.querySelector('a');
      const items=document.querySelector('#items');
      const div = document.querySelector('div');
      const card=document.querySelector('.card');
      
      darkMode.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        a.classList.toggle('dark-mode');
        header.classList.toggle('dark-mode');
        main.classList.toggle('dark-mode');
        footer.classList.toggle('dark-mode');
        items.classList.toggle('dark-mode');
        div.classList.toggle('dark-mode');
        card.classList.toggle('dark-mode');
      });