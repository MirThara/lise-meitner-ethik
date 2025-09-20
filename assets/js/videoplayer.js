// Helper-Function
function playAnim(video) {
    const start = document.getElementById(`play-${video}`);
    const fission = document.getElementById(video);
    if (fission.paused) {
        fission.play();
        start.innerText = "Animation pausieren";
    } else {
        fission.pause();
        start.innerText = "Animation abspielen";
    }
    fission.addEventListener('ended', () => {
        fission.pause();
        start.innerText = "Animation abspielen";
    });
}