const main_video = document.querySelector('.main-video video')
const main_video_title = document.querySelector('.main-video .title')
const video_playlist = document.querySelector('.video-playlist .videos')
const progress = document.querySelector('.progress')

let data = [
    {
        id: 1,
        title: 'Beef ring',
        name: "BeefRing1960_2_512kb.mp4",
        duration: "11:05"
    },
    {
        id: 2,
        title: 'Leap',
        name: 'leapfrog.mp4',
        duration: "30:37"
    },
    {
        id: 3,
        title: 'What about prejudice',
        name: 'WhatAbou1959_512kb.mp4',
        duration: "18:15"
    },
    {
        id: 4,
        title: 'Your name here',
        name: 'YourName1960_512kb.mp4',
        duration: "26:02"
    }
]

let section = {
    module1: {id: 1, isComplete: false},
    module2: {id: 2, isComplete: false},
    module3: {id: 3, isComplete: false},
    module4: {id: 4, isComplete: false},
    key: function(n) {
        return this[Object.keys(this)[n]];
    }
}

data.forEach((video) => {
    let video_element = `
    <div class="video" data-id=${video.id}>
    <img src="assets/images/play.png" alt="play-button">
    <h3 class="title">${video.title}</h3>
    <p class="time">${video.duration}</p>
</div>`;

video_playlist.innerHTML += video_element;
})

let videos = document.querySelectorAll('.video')
videos[0].classList.add('active')

videos.forEach(selected_video => {
    selected_video.onclick = () => {
    let match_video = data.find(video => video.id == selected_video.dataset.id)
  
    main_video.src = 'assets/videos/' + match_video.name
    main_video.title =  match_video.title;
    main_video.id = match_video.id;
    
   nextVideo()
    }
})


    function nextVideo(){
        main_video.removeEventListener('ended', nextVideo)
        
        let match_video = data.find(video => video.id == main_video.id)
        let main_id_int = parseInt(main_video.id)

        if(main_id_int >= data.length){
            main_video.id = 1;
        } else {
            main_video.id++
        }

        main_video.src = 'assets/videos/' + match_video.name
        main_video.title =  match_video.title;
       
        main_video.addEventListener('ended', nextVideo, false);
        calculateProgress()
    }

    function updateModuleCompletion(){
        let main_vid_id = parseInt(main_video.id, 10)

        if(main_vid_id <= data.length){
           
            let vid_module = section.key(main_vid_id-1)
            vid_module.isComplete = true;
          
        } else {
            let lastModule = (Object.keys(section).length)-2;
            let vid_module = section.key(lastModule)
            vid_module.isComplete = true;
        }
    
    }

    function calculateProgress(){
        let numberComplete = 0;

        for(moduleN in section){
            if(section[moduleN].isComplete){
                numberComplete++
            }
        }
        let percentageComplete = (numberComplete/(Object.keys(section).length-1)*100)
        progress.innerHTML = `Progress Complete: &nbsp${percentageComplete}%`;
       
    }

main_video.addEventListener('ended', updateModuleCompletion, false);
nextVideo()

