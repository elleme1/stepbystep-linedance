import os
import librosa
import soundfile as sf
import numpy as np
from pydub import AudioSegment
import glob

output_dir = "jive_audio"
target_bpm = 135.0

# Files to process
new_files = [
    "jive_audio/09_Chicken Walk Jive line dance.mp3",
    "jive_audio/10_QUANDO TU.mp3"
]

processed_files = []

# Existing stretched files
for i in range(1, 9):
    # Find the _stretched.wav for 1-8
    pattern = f"jive_audio/{i:02d}_*_stretched.wav"
    match = glob.glob(pattern)
    if match:
        processed_files.append(match[0])

# Process 09 and 10
for f in new_files:
    if os.path.exists(f):
        print(f"Processing {f}...")
        y, sr = librosa.load(f, sr=44100)
        y, index = librosa.effects.trim(y, top_db=30)
        
        tempo, _ = librosa.beat.beat_track(y=y, sr=sr)
        if isinstance(tempo, np.ndarray):
            tempo = float(tempo[0])
        else:
            tempo = float(tempo)
            
        while tempo < 95:
            tempo *= 2
        while tempo > 190:
            tempo /= 2
            
        print(f"Detected tempo: {tempo:.2f} BPM")
        
        stretch_factor = tempo / target_bpm
        print(f"Stretch factor: {stretch_factor:.2f}")
        
        y_stretched = librosa.effects.time_stretch(y, rate=stretch_factor)
        
        out_wav = f.replace(".mp3", "_stretched.wav")
        sf.write(out_wav, y_stretched, sr)
        processed_files.append(out_wav)

print("Merging all audios...")
combined = AudioSegment.empty()
crossfade_duration = 4000 # 4 seconds

for i, wav_file in enumerate(processed_files):
    audio = AudioSegment.from_wav(wav_file)
    audio = audio.normalize()
    if i == 0:
        combined = audio
    else:
        if len(combined) > crossfade_duration and len(audio) > crossfade_duration:
            combined = combined.append(audio, crossfade=crossfade_duration)
        else:
            combined = combined + audio

final_out = "Jive_Beginner_Practice_Mix_Full.mp3"
combined.export(final_out, format="mp3", bitrate="192k")
print(f"Successfully generated {final_out}")
