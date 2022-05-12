import { ObservableValue } from "@src/jquingo/observable_value";

import lingo_theme_song_mp3 from "@mp3/lingo-theme-song.mp3";
import lingo_grey_mp3 from "@mp3/lingo-grey.mp3";
import lingo_yellow_mp3 from "@mp3/lingo-yellow.mp3";
import lingo_red_mp3 from "@mp3/lingo-red.mp3";
import lingo_win_mp3 from "@mp3/lingo-win.mp3";
import lingo_fail_mp3 from "@mp3/lingo-fail.mp3";

export enum SoundIdentifier {
    LINGO_THEME_SONG,
    LINGO_GREY,
    LINGO_YELLOW,
    LINGO_RED,
    LINGO_WIN,
    LINGO_FAIL,
}

type EnumDictionary<T extends string | symbol | number, U> = {
    [K in T]: U;
};

// Using {EnumDictionary} requires us to use all enum values, which is fine for our purposes
export const soundplayer: ObservableValue<
    EnumDictionary<SoundIdentifier, HTMLAudioElement>
> = new ObservableValue<EnumDictionary<SoundIdentifier, HTMLAudioElement>>({
    [SoundIdentifier.LINGO_THEME_SONG]: new Audio(lingo_theme_song_mp3),
    [SoundIdentifier.LINGO_GREY]: new Audio(lingo_grey_mp3),
    [SoundIdentifier.LINGO_YELLOW]: new Audio(lingo_yellow_mp3),
    [SoundIdentifier.LINGO_RED]: new Audio(lingo_red_mp3),
    [SoundIdentifier.LINGO_WIN]: new Audio(lingo_win_mp3),
    [SoundIdentifier.LINGO_FAIL]: new Audio(lingo_fail_mp3),
} as EnumDictionary<SoundIdentifier, HTMLAudioElement>);

export async function fadeIn(
    identifier: SoundIdentifier,
    target_volume: number,
    duration: number = 1000
): Promise<void> {
    const sound = soundplayer.get()[identifier];
    if (!sound) return;
    const step = 0.01;
    return new Promise<void>(
        (resolve: (value: void | PromiseLike<void>) => void) => {
            sound.volume = 0;
            sound.currentTime = 0;
            sound.play();
            const interval = setInterval(() => {
                if (sound.volume >= target_volume) {
                    clearInterval(interval);
                    resolve();
                }
                if (sound.volume + step >= target_volume)
                    sound.volume = target_volume;
                else sound.volume += step;
            }, duration / (target_volume / step));
        }
    );
}

export async function play(
    identifier: SoundIdentifier,
    volume: number,
    from: number = 0,
    clone: boolean = false
) {
    let sound = soundplayer.get()[identifier];
    if (clone) sound = sound.cloneNode(true) as HTMLAudioElement;
    sound.currentTime = -1;
    sound.volume = volume;
    sound.currentTime = from;
    return await sound.play();
}

export function pause(identifier: SoundIdentifier) {
    const sound = soundplayer.get()[identifier];
    sound.pause();
}

export async function fadeOut(
    identifier: SoundIdentifier,
    target_volume: number,
    duration: number = 1000
): Promise<void> {
    const sound = soundplayer.get()[identifier];
    if (!sound) return;
    const start_volume = sound.volume;
    const step = 0.01;
    return new Promise<void>(
        (resolve: (value: void | PromiseLike<void>) => void) => {
            const interval = setInterval(() => {
                if (sound.volume <= target_volume) {
                    sound.pause();
                    sound.currentTime = 0;
                    clearInterval(interval);
                    resolve();
                }
                if (sound.volume - step <= target_volume)
                    sound.volume = target_volume;
                else sound.volume -= step;
            }, duration / (start_volume / step));
        }
    );
}
