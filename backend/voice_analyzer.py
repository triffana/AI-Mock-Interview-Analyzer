import librosa

def analyze_voice(audio_file):

    y, sr = librosa.load(audio_file)

    duration = librosa.get_duration(y=y,sr=sr)

    return {

        "duration": duration

    }