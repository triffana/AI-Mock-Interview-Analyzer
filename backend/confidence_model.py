def calculate_confidence(

    eye_contact,

    speech_clarity,

    stress_score,

    voice_confidence

):

    score = (
        eye_contact * 0.30 +
        speech_clarity * 0.30 +
        voice_confidence * 0.20 +
        (100-stress_score) * 0.20
    )

    return round(score,2)