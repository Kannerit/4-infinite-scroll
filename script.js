console.log('Script is running! ');

let endOfThePage = 0;

let preloading = false;


const showGif = () => {
    let gif = document.getElementById('gif');
    console.log(`showGif()`);
    gif.style.display = 'block';
    preloading = true;
}

const hideGif = () => {
    let gif = document.getElementById('gif');
    console.log(`hideGif()` );
    gif.style.display = 'none';
    preloading = false;
}
const getData = () => {

    if (!preloading){

        showGif();

        fetch('https://akademia108.pl/api/ajax/get-users.php')
            .then(res => res.json())
            .then(data => {
    
                let body = document.body;
                let hr = document.createElement('hr');
                body.appendChild(hr);
    
                for (let user of data) {
                    let pId = document.createElement('p');
                    let pName = document.createElement('p');
                    let pWebsite = document.createElement('p');
    
                    pId.innerText = `User ID: ${user.id}`;
                    pName.innerText = `User Name: ${user.name}`;
                    pWebsite.innerHTML = `User Website: ${user.website}<br/>--------`;
    
                
                    body.appendChild(pId);
                    body.appendChild(pName);
                    body.appendChild(pWebsite);
    
                }

                hideGif();
    
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });

    }

}
const scrollToEndOfPage = () => {

    let d = document.documentElement;

    let scrollHeight = d.scrollHeight;

    let scrollTop = d.scrollTop;

    let clientHeight = d.clientHeight;

    let sumScrollTopClientHeight = Math.ceil(scrollTop + clientHeight);


    if (sumScrollTopClientHeight >= scrollHeight) {

        endOfThePage += 1;

        console.log(`Scrolled to the End of Page: ${endOfThePage}`);

        getData();
    }
    
}

window.addEventListener('scroll', scrollToEndOfPage);