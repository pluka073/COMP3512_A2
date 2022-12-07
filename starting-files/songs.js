const api = 'http://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php';


const songs = [];

fetch(api)
        .then(resp => resp.json())
        .then(data => songs.push(...data))
        .catch(error => console.error(error));


class Song {
    constructor(id, title/*, artist, genre, year, popularity*/) {
        this.id = id;
        this.title = title;
/*        this.artist = artist;
        this.genre = genre;
        this.year = year;
        this.popularity = popularity;*/
    }

    
    render() {
        let section = document.createElement('section');
      section.classList.add('song');
      let div = document.createElement('div');
        let h3 = document.createElement('h3');
        h3.textContent = `${this.title}`;
     /* let tab = document.createElement('table');
    let tr = document.createElement('tr');
      let th1 = document.createElement('th');
        th1.textContent = this.title;
        let th2 = document.createElement('th');
        th2.textContent = this.artist.name;
        let th3 = document.createElement('th');
        th3.textContent = this.genre.name;
        let th4 = document.createElement('th');
        th4.textContent = this.year;
        let th5 = document.createElement('th');
        th1.textContent = this.title;*/
      div.appendChild(h3);
        
        let form = document.createElement('FORM');
        let title = document.createElement('INPUT');
        title.setAttribute("type", "text");
        title.setAttribute('title', title)
        form.appendChild(title);
        section.appendChild(div);
        section.appendChild(form);
        
        return section;
    }
   
} 
const ss = [];
for ( let s of songs)
{
    ss= new Song (s.id, s.title, s.artist.name, s.genre.name, s.year, s.details.popularity)
}

ss.push(new Song('lukas', 'lukas', 'lukas', 'lukas', 'lukas', 'lukas'))

const getSongData = () => songs;


 export { Song , getSongData };