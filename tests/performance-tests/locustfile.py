from locust import HttpUser, task, between
import json

class FullSystemTestUser(HttpUser):
    wait_time = between(1, 2.5)
    token = None  # JWT token after login

    def on_start(self):
        # Called once per simulated user
        self.login()

    def login(self):
        login_payload = {
            "email": "odudooknale@gmail.com",
            "password": "123456"
        }
        with self.client.post("/api/v1/auth/login", json=login_payload, catch_response=True) as response:
            if response.status_code == 200:
                res_data = response.json()
                self.token = res_data["token"]  # Save token
                response.success()
            else:
                response.failure("Login failed")

    @task(2)
    def upload_audio_to_flask(self):
        if not self.token:
            return

        # Simulate audio upload to Flask server (host defined at runtime)
        with open("sample_audio.wav", "rb") as audio:
            files = {
                "file": ("sample_audio.wav", audio, "audio/wav")
            }
            headers = {
                "Authorization": f"Bearer {self.token}"  # Assuming token is needed for Flask
            }
            with self.client.post("http://127.0.0.1:5000/", files=files, headers=headers, catch_response=True) as response:
                if response.status_code == 200:
                    # Get the prediction from Flask response (if included in the response HTML)
                    prediction = response.text
                    if "prediction" in prediction:
                        response.success()
                    else:
                        response.failure("Prediction not found")
                else:
                    response.failure(f"Error uploading audio: {response.status_code}")
