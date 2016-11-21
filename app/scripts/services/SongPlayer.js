(function() {
    function SongPlayer() {
        /**
        * @desc public function library
        * @type {Object}
        */
        var SongPlayer = {};
        /**
        * @desc current song being played
        * @type {Object}
        */
        var currentSong = null;
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true   
            });
            
            currentSong = song;
        };
        /**
        * @function playSong
        * @desc plays the current song and sets the play state of the song to true
        */
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing=true;
        };
        /**
        * @function .play public function
        * @desc Plays the song and sets it to current if not the current song
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            if (currentSong !== song) {
                setSong(song);                
                playSong(song);
            } else if (currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };
        /**
        * @function .pause public function
        * @desc pauses the currently playing song
        * @param {Object} song
        */
        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        };
        return SongPlayer;
    }
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();