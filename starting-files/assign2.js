document.addEventListener("DOMContentLoaded", function() {

/* url of song api --- https versions hopefully a little later this semester */

const api = 'http://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php';

    
    fetch(api)
        .then(resp => resp.json())
        .then(data => {
        
        function removeDuplicateArtist() {
            const artists = data.map( song => song.artist.name );
            
            return artists.filter((item, index) => artists.indexOf(item) === index);
               
        }
        function removeDuplicateGenres() {
            const genres = data.map( song => song.genre.name );
            
            return genres.filter((item, index) => genres.indexOf(item) === index);
            
               
        }
        
        const artists = document.querySelector('#artist');
        const genres = document.querySelector('#genre');
        
            removeDuplicateArtist().forEach( artist => {
                
                let artistOption = document.createElement('option');
                                   artistOption.textContent = artist;
                                   artistOption.setAttribute("value", artist);
                                   artists.appendChild(artistOption);
                                   
                  
                
                                    });
        removeDuplicateGenres().forEach( genre => {
                
                let genreOption = document.createElement('option');
                                   genreOption.textContent = genre;
                                   genreOption.setAttribute("value", genre);
                                   genres.appendChild(genreOption);
                                   
                  
                
                                    });
        
        
        document.querySelectorAll('input[name="rdbtn"]').forEach((element) =>{element.addEventListener('click', function(e) {
       /*function disableInput() {*/
           let t = document.getElementById('t');
           let a = document.getElementById('a');
           let g = document.getElementById('g');
           
           if(t.checked == true)
           {
               document.querySelector('#title').disabled= false;
            document.querySelector('#artist').disabled= true;
               document.querySelector('#artist').selectedIndex = 0;
               document.querySelector('#genre').disabled= true;
               document.querySelector('#genre').selectedIndex = 0;
           }
           else if(a.checked == true)
           {
               document.querySelector('#title').disabled= true;
               document.querySelector('#title').value = '';
            document.querySelector('#artist').disabled= false;
               document.querySelector('#genre').disabled= true;
               document.querySelector('#genre').selectedIndex = 0;
           }
           else if(g.checked == true)
           {
               document.querySelector('#title').disabled= true;
               document.querySelector('#title').value = '';
            document.querySelector('#artist').disabled= true;
               document.querySelector('#artist').selectedIndex = 0;
               document.querySelector('#genre').disabled= false;
           }
            else
            {
                document.querySelector('#title').disabled= true;
            document.querySelector('#artist').disabled= true;

               document.querySelector('#genre').disabled= true;
                
                console.alert("select search type");
            }

       })
                                                                             })
        document.getElementById('searchBtn').addEventListener("click", searchSongs);
        
        function searchSongs() {
           
            
            
            let titleInput = document.querySelector('#title').value;
            let artistInput = document.querySelector('#artist').value;
            let genreInput = document.querySelector('#genre').value;
            console.log(titleInput);
            console.log(artistInput);
            console.log(genreInput);

                const title = new RegExp(titleInput, 'gi');
                const artist = new RegExp(artistInput, 'gi');
                const genre = new RegExp(genreInput, 'gi');

             const music = data.filter( song => song.title.match(title) && song.artist.name.match(artist) && song.genre.name.match(genre)); 
            
            
        const list = document.querySelector('#row');
            
            list.replaceChildren();
            
            for (let l of music) {
                let tr = document.createElement("tr");
                const title = document.createElement("td");
                const a = document.createElement('a');
                const link = document.createTextNode(l.title);
                a.appendChild(link);
                a.title = l.title;
                a.href = "#";
                title.appendChild(a)
                
                const artist = document.createElement("td");
                artist.textContent = l.artist.name;
                
                const genre = document.createElement("td");
                genre.textContent = l.genre.name;
                
                const year = document.createElement("td");
                year.textContent = l.year;
                
                const pop = document.createElement("td");
                pop.textContent = l.details.popularity;
                
                const view = document.createElement("td");
                view.appendChild(document.createElement('button'));
                
                
                const add = document.createElement("td");
                add.appendChild(document.createElement('button'));
                
                tr.append(title);
                tr.append(artist);
                tr.append(genre);
                tr.append(year);
                tr.append(pop);
                tr.append(view);
                tr.append(add);
                list.appendChild(tr);
                
            }
            /*titleInput = '';
            artistInput = '';
            genreInput = '';*/
            
        }
            })
   
    
        .catch(error => console.error(error)
            );

    
    
});



/* note: you may get a CORS error if you try fetching this locally (i.e., directly from a
   local file). To work correctly, this needs to be tested on a local web server.  
   Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
   use built-in Live Preview.
*/
