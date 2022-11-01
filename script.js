const main_video = document.querySelector('.main-video video')
const main_video_title = document.querySelector('.main-video .title')
const video_playlist = document.querySelector('.video-playlist .videos')

let data = [
    {
        id: 1,
        title: 'Beef Ring',
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
        title: 'What about prejudice.',
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

data.forEach((video) => {
    let video_element = `
    <div class="video" data-id=${video.id}>
    <img src="/assets/images/play.png" alt="">
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
    console.log(match_video)
    main_video.src = 'assets/videos/' + match_video.name
    main_video.title =  match_video.title;
    main_video.id = match_video.id;
    }

})

    let currentVideo = main_video.id;

    function nextVideo(){
        console.log('ended')



        console.log(main_video.id)
        let next_video = data.find(video => video.id == currentVideo)
        console.log(next_video)
           

      
             main_video.src = 'assets/videos/' + next_video.name
            main_video.title =  next_video.title;
            currentVideo++
            main_video.addEventListener('ended', nextVideo,false);
        
    }

nextVideo()