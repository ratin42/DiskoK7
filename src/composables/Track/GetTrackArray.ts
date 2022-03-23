// Handle track Object
// Create an array of 8 Track Objects

import { ref, Ref } from "vue";
import * as Tone from "tone";
import { ToneAudioBuffer } from "tone";
import { tracksDescription } from "../../utils/tracksDescription.js";

type trackArray = Track[];

class Track {
    id: number = 0;
    color: string = "green";
    buffer: Tone.ToneAudioBuffer;
    player: Tone.Player | null;
    maxSampleLength: number = 20;
    offset: number = 0;
    currentPitch: number = 16;
    sliderValue: Ref<number> = ref(0);

    constructor(id: number, sampleUrl: string, color: string) {
        this.id = id;
        this.color = color;
        this.player = null;
        this.buffer = new Tone.ToneAudioBuffer(sampleUrl, () => {
            this.player = new Tone.Player(this.buffer);
            this.player.chain(Tone.Destination);
        });
    }

    startPlayer = () => {
        if (this.player) {
            this.player.start(0, this.offset);
        }
    };
    stopPlayer = () => {
        if (this.player) {
            this.player.stop(0);
        }
    };

    setOffset = (offset: number) => {
        this.offset = offset;
    };
    getOffset = () => {
        return this.offset;
    };

    changePitch = (pitch: number) => {
        this.currentPitch = this.sliderValue.value;
        pitch = pitch / 261.637;
        if (this.player) {
            this.player.playbackRate = pitch;
        }
    };
}

function getNewTrackArray() {
    let bank: trackArray[] = [];
    let tracks: trackArray = [];

    for (let b = 0; b < 4; b++) {
        for (let i = 0; i < 8; i++) {
            tracks.push(
                new Track(
                    tracksDescription[i].id,
                    tracksDescription[i].sampleUrl,
                    tracksDescription[i].color
                )
            );
        }
        bank.push(tracks);
        tracks = [];
    }
    return bank;
}

export { getNewTrackArray, Track };
export type { trackArray };
