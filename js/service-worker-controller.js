if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').then( registration => {
        console.log('Service Worker registered');
    }).catch(function (err) {
        console.log('Service Worker registration failed: ', err);
    });
}