document.addEventListener("DOMContentLoaded", function() {
document.getElementById('singleSong').style.display = 'none';
    document.getElementById('close').style.display = 'none';
    document.getElementById('playlistView').style.display = 'none';
/* url of song api --- https versions hopefully a little later this semester */

const api = 'https://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php';

    
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
        
        const playlist = [];    

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
            addThead(list);
            for (let l of music) {
                
                let tr = document.createElement("tr");
                const title = document.createElement("td");
                const a = document.createElement('a');
                const link = document.createTextNode(l.title);
                a.appendChild(link);
                a.title = l.title;
                a.href = "#";
                a.setAttribute('id', 'refSong');
                a.setAttribute('value', l.song_id);
                title.appendChild(a);
                
                const artist = document.createElement("td");
                artist.textContent = l.artist.name;
                
                const genre = document.createElement("td");
                genre.textContent = l.genre.name;
                
                const year = document.createElement("td");
                year.textContent = l.year;
                
                const pop = document.createElement("td");
                pop.textContent = l.details.popularity;
                
                const view = document.createElement("td");
                const viewBtn = document.createElement('button');
                viewBtn.setAttribute('id', 'viewSong');
                viewBtn.setAttribute('value', l.song_id);
                viewBtn.textContent = "View";
                view.appendChild(viewBtn);
            
                const add = document.createElement("td");
                const addBtn = document.createElement('button');
                addBtn.setAttribute('id', 'add');
                addBtn.setAttribute('value', l.song_id);
                addBtn.textContent = 'Add';
                add.appendChild(addBtn);
                
                
                tr.append(title);
                tr.append(artist);
                tr.append(genre);
                tr.append(year);
                tr.append(pop);
                tr.append(view);
                tr.append(add);
                list.appendChild(tr);
                
                
            }
                

document.querySelectorAll('#add').forEach((element) =>{element.addEventListener('click', function(e) {
    
                
            for(let d of data)
            {
                if (d.song_id == e.target.getAttribute('value'))
                {
                    playlist.push(d);
                }
            }
                console.dir(playlist);
    
             });
              //end of add to playlist
            });
        

document.querySelectorAll('#viewSong, a').forEach((element) =>{element.addEventListener('click', function(e) {

    document.getElementById('display').style.display = 'none';
    document.getElementById('playlist').style.display = 'none';
    document.getElementById('singleSong').style.display =  'block';
    document.getElementById('close').style.display = 'block';
    
    
    
   const sd = document.querySelector('#songDescription');
    const songID = e.target.getAttribute('value');
    
    console.log(songID);
            sd.replaceChildren();
    
    for(let s of data)
    {
        if (s.song_id == songID)
        
        {
            let songInfo = document.createElement('td');
            songInfo.textContent = s.title + ", " + s.artist.name + ", " + s.artist.type + ", " + s.genre.name + ", " + s.year + ", " + (s.details.duration);
            
            sd.appendChild(songInfo);
            songInfo.appendChild(document.createElement('br'));
            
            let analysisData = document.createElement('ul');
                let bpm = document.createElement('li');
                bpm.textContent = "bpm, " + s.details.bpm;
                analysisData.appendChild(bpm);
            
                let energy = document.createElement('li');
                energy.textContent = "energy, " + s.analytics.energy;
                analysisData.appendChild(energy);
                
                let danceability = document.createElement('li');
                danceability.textContent = "danceability, " + s.analytics.danceability;
                analysisData.appendChild(danceability);
            
                let liveness = document.createElement('li');
                liveness.textContent = "liveness, " + s.analytics.liveness;
                analysisData.appendChild(liveness);
            
                let valence = document.createElement('li');
                valence.textContent = "valence, " + s.analytics.valence;
                analysisData.appendChild(valence);
                
                let acousticness = document.createElement('li');
                acousticness.textContent = "acousticness, " + s.analytics.acousticness;
                analysisData.appendChild(acousticness);
            
                let speechiness = document.createElement('li');
                speechiness.textContent = "speechiness, " + s.analytics.speechiness;
                analysisData.appendChild(speechiness);
            
                let popularity = document.createElement('li');
                popularity.textContent = "popularity, " + s.details.popularity;
                analysisData.appendChild(popularity);
            
            
            
            songInfo.appendChild(analysisData);
            
        const chartCanvas = document.getElementById("radarChart");
        const chartData = {
            labels: ['bpm', 'energy' , 'danceability', 'liveness', 'valence', 'acousticness', 'speechiness', 'popularity'],
                
                datasets: [
                {
                backgroundColor: '#00FF00',
                boarderColor: '#00FF00',
                
                data:[s.details.bpm, s.analytics.energy, s.analytics.danceability, s.analytics.liveness, s.analytics.valence, s.analytics.acousticness, s.analytics.speechiness, s.details.popularity]
            }
        ]};
            const radarChart = new Chart(chartCanvas, {
            type: 'radar',
            data: chartData
        });
            radarChart.resize();
                                 
        }
   
}
}   
                                                                                        
  )
    //end of viewSong
    });
            

        //end of search Songs
        }

        
            
        document.getElementById('playlist').addEventListener('click', viewPlaylist);
                
        function viewPlaylist()
        {
                document.getElementById('display').style.display = 'block';
    document.getElementById('close').style.display = 'block';
    document.getElementById('playlistView').style.display =  'block';
    document.getElementById('display').style.display = 'none';
            
            const list = document.getElementById('pRow');
            addThead(list);
            if (playlist.length != 0)
            {
                list.replaceChildren();
            for (let p of playlist) {
                
                let tr = document.createElement("tr");
                const title = document.createElement("td");
                const a = document.createElement('a');
                const link = document.createTextNode(p.title);
                a.appendChild(link);
                a.title = p.title;
                a.href = "#";
                a.setAttribute('id', 'refSong');
                a.setAttribute('value', p.song_id);
                title.appendChild(a);
                
                const artist = document.createElement("td");
                artist.textContent = p.artist.name;
                
                const genre = document.createElement("td");
                genre.textContent = p.genre.name;
                
                const year = document.createElement("td");
                year.textContent = p.year;
                
                const pop = document.createElement("td");
                pop.textContent = p.details.popularity;
                
                const view = document.createElement("td");
                const viewBtn = document.createElement('button');
                viewBtn.setAttribute('id', 'viewSong');
                viewBtn.setAttribute('value', p.song_id);
                viewBtn.textContent = "View";
                view.appendChild(viewBtn);

                
                
                tr.append(title);
                tr.append(artist);
                tr.append(genre);
                tr.append(year);
                tr.append(pop);
                tr.append(view);
                list.appendChild(tr);
            }
            }
            
            }
        
        document.getElementById('clearPlaylist').addEventListener('click', function(e)
        {
            while (playlist.length > 0)
            {
                playlist.pop();
            }
            //viewPlaylist();
        });
        
        document.getElementById('credits').addEventListener('click', function(e) {
                const a = document.createElement('a');
                const link = document.createTextNode('github');
                a.appendChild(link);
                a.title = 'github';
                a.href = "https://github.com/pluka073/COMP3521-A1.git";
           
             window.alert("lukas\n\n" + a);   
            });
        
        document.getElementById('close').addEventListener('click', function(e) {
                
                document.getElementById('display').style.display = 'block';
    document.getElementById('playlist').style.display = 'block';
    document.getElementById('singleSong').style.display =  'none';
    document.getElementById('close').style.display = 'none';
    document.getElementById('playlistView').style.display = 'none';
            });
        
        
        
        
        
        
        function addThead(table){
            let tr =document.createElement('tr');
            let title =document.createElement('th');
            title.textContent=('Title');
            let artist =document.createElement('th');
            artist.textContent=('Artist');
            let year =document.createElement('th');
            year.textContent=('Year');
            let genre =document.createElement('th');
            genre.textContent=('Genre');
            let pop =document.createElement('th')
            pop.textContent=('Popularity');
            
            tr.appendChild(title);
            tr.appendChild(artist);
            tr.appendChild(year);
            tr.appendChild(genre);
            tr.appendChild(pop);
            table.appendChild(tr);
        }

            
        


        //end of fetch
            })
   
    
        .catch(error => console.error(error)
            );

    
    
});

 


/* note: you may get a CORS error if you try fetching this locally (i.e., directly from a
   local file). To work correctly, this needs to be tested on a local web server.  
   Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
   use built-in Live Preview.
*/
