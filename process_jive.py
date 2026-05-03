import os
import subprocess
import librosa
import soundfile as sf
import numpy as np
import pydub
from pydub import AudioSegment
import glob

queries = [
    "Chubby Checker - Let's Twist Again (Official Music Video)",
    "Cardio Jive line dance | 카디오 자이브 라인댄스 |  by  Carlene Carter | Low Intermediate | LDWKA",
    "[자이브초급]Jive All Night Line Dance|자이브 올 나이트라인댄스|너무 신나요 최고",
    "[쉬운중급]Why - Tiggy Line Dance | 정말 신나는 라인댄스 수업에 강추합니다",
    "Old Time Rock And Roll Linedance Demo(올드타임릭앤롤)|Improve(초중급)",
    "My Ding Dong Dance - Line Dance (Beginner) 초중급 화요동호회 2~4시 (010 2880 0811)",
    "[라인댄스고급반] Retro Swing Line Dance || 레트로스윙 라인댄스",
    "Electro Shake Linedance #electroshake #shakeyourass #일렉트로쉐이크라인댄스",
    "Chicken Walk Jive line dance(Improver/Intermediate) 치킨 웍 자이브🐔🐤🐣라인댄스",
    "QUANDO TU (Jive) -Line Dance (Improver) 5.8"
]

target_bpm = 135.0
output_dir = "jive_audio"
os.makedirs(output_dir, exist_ok=True)

print("Downloading audios...")
for i, query in enumerate(queries):
    out_tmpl = f"{output_dir}/{i+1:02d}_%(title)s.%(ext)s"
    cmd = [
        "yt-dlp", 
        f"ytsearch1:{query}", 
        "-x", "--audio-format", "mp3", 
        "-o", out_tmpl,
        "--no-playlist"
    ]
    subprocess.run(cmd)

downloaded_files = sorted(glob.glob(os.path.join(output_dir, "*.mp3")))

processed_files = []
for f in downloaded_files:
    print(f"Processing {f}...")
    y, sr = librosa.load(f, sr=44100)
    
    # Trim silence
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
    
    # We use librosa.effects.time_stretch to adjust speed without changing pitch
    y_stretched = librosa.effects.time_stretch(y, rate=stretch_factor)
    
    out_wav = f.replace(".mp3", "_stretched.wav")
    sf.write(out_wav, y_stretched, sr)
    processed_files.append(out_wav)

print("Merging audios...")
combined = AudioSegment.empty()
crossfade_duration = 4000 # 4 seconds to make a smooth transition

for i, wav_file in enumerate(processed_files):
    audio = AudioSegment.from_wav(wav_file)
    audio = audio.normalize()
    if i == 0:
        combined = audio
    else:
        # Crossfade between tracks
        if len(combined) > crossfade_duration and len(audio) > crossfade_duration:
            combined = combined.append(audio, crossfade=crossfade_duration)
        else:
            combined = combined + audio

final_out = "Jive_Beginner_Practice_Mix.mp3"
combined.export(final_out, format="mp3", bitrate="192k")
print(f"Successfully generated {final_out}")
