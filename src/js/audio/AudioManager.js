import * as THREE from "three";

class AudioManager
{
    loadSounds()
    {
        this.audioBuffers = {};
        this.audios = {};
        return new Promise((resolve, reject) => {
            this.loader = new THREE.AudioLoader();
            return this.loadSound("fire", require("../../assets/sounds/Fire.mp3"))
                .then(() => {return this.loadSound("flashlight", require("../../assets/sounds/Flashlight.mp3"))})
                .then(() => {return this.loadSound("loop", require("../../assets/sounds/LOOP.mp3"))})
                .then(() => {return this.loadSound("mid", require("../../assets/sounds/MID.mp3"))})
                .then(() => {return this.loadSound("intro", require("../../assets/sounds/INTRO.mp3"))})

                .then(() => {return this.loadSound("zombieA1", require("../../assets/sounds/ZombieA1.mp3"))})
                .then(() => {return this.loadSound("zombieA2", require("../../assets/sounds/ZombieA2.mp3"))})
                .then(() => {return this.loadSound("zombieA3", require("../../assets/sounds/ZombieA3.mp3"))})
                .then(() => {return this.loadSound("zombieA4", require("../../assets/sounds/ZombieA4.mp3"))})
                .then(() => {return this.loadSound("zombieB1", require("../../assets/sounds/ZombieB1.mp3"))})
                .then(() => {return this.loadSound("zombieB2", require("../../assets/sounds/ZombieB2.mp3"))})
                .then(() => {return this.loadSound("zombieB3", require("../../assets/sounds/ZombieB3.mp3"))})
                .then(() => {return this.loadSound("zombieB4", require("../../assets/sounds/ZombieB4.mp3"))})

                .then(() => {return this.loadSound("scream", require("../../assets/sounds/Scream.mp3"))})
                
                .then(() => {return resolve();});
        })
    }

    setListener(listener)
    {
        this.listener = listener;
    }

    loadSound(name, sound)
    {
        return new Promise((resolve, reject) => {
            this.loader.load(sound, buffer => {
                this.audioBuffers = {
                    ...this.audioBuffers,
                    [name]: buffer 
                }
                resolve(buffer);
            }, undefined, e => reject(e));
        });
    }

    getAudioBuffer(name)
    {
        return this.audioBuffers[name];
    }

    bindAudio(name)
    {
        let audio = new THREE.Audio(this.listener);
        audio.setBuffer(this.getAudioBuffer(name));
        this.audios = {
            ...this.audios,
            [name]: audio
        }
        return audio;
    }

    bindPositionalAudio(name)
    {
        let audio = new THREE.PositionalAudio(this.listener);
        audio.setBuffer(this.getAudioBuffer(name));
        this.audios = {
            ...this.audios,
            [name]: audio
        }
    }

    newAudio(name)
    {
        let audio = new THREE.Audio(this.listener);
        audio.setBuffer(this.getAudioBuffer(name));
        return audio;
    }

    newPositionalAudio(name)
    {
        let audio = new THREE.PositionalAudio(this.listener);
        audio.setBuffer(this.getAudioBuffer(name));
        return audio;
    }

    getAudio(name)
    {
        return this.audios[name];
    }

    clearAudios()
    {
        this.audios = {};
    }
}

export default new AudioManager();