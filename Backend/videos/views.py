import os
import cv2
import numpy as np
import joblib
from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input
from tensorflow.keras.preprocessing import image
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from .serializers import UploadSerializer
from django.core.files.storage import default_storage
from sklearn.decomposition import PCA
from sklearn.ensemble import IsolationForest

class FileUploadView(APIView):
    def post(self, request, format=None):
        serializer = UploadSerializer(data=request.data)
        if serializer.is_valid():
            uploaded_file = serializer.validated_data['file']
            filename = default_storage.save(os.path.join('uploads', uploaded_file.name), uploaded_file)
            file_url = settings.MEDIA_URL + filename
            
            # Process the video for anomaly detection
            video_path = os.path.join(settings.MEDIA_ROOT, filename)
            anomaly_results = self.detect_anomalies(video_path)
            
            response_data = {
                'file_url': file_url,
                'anomalies': anomaly_results
            }
            
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # Load PCA and Isolation Forest models
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Get the base directory of the Django project
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

        # Load models with absolute paths
        isolation_forest_path = os.path.join(base_dir, 'isoforest_ucsd_ped1.pkl')

        # Check if isolation forest model exists before loading
        if os.path.exists(isolation_forest_path):
            self.isolation_forest = joblib.load(isolation_forest_path)
        else:
            raise FileNotFoundError(f"Isolation Forest model not found at: {isolation_forest_path}")

        # PCA model is optional - only load if it exists
        pca_path = os.path.join(base_dir, 'pca_transformer.pkl')
        if os.path.exists(pca_path):
            self.pca = joblib.load(pca_path)
        else:
            self.pca = None
    
    # Feature extraction function
    def extract_features_from_video(self, video_path, resize_dim=(224, 224)):
        model = ResNet50(weights='imagenet', include_top=False, pooling='avg')
        cap = cv2.VideoCapture(video_path)

        features = []
        frame_indices = []
        frame_num = 0

        while True:
            ret, frame = cap.read()
            if not ret:
                break

            # Step 1: Convert to grayscale
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

            # Step 2: Resize
            gray_resized = cv2.resize(gray, resize_dim)

            # Step 3: Convert grayscale back to 3-channel RGB
            rgb = cv2.cvtColor(gray_resized, cv2.COLOR_GRAY2RGB)

            # Prepare input for ResNet50
            img_array = image.img_to_array(rgb)
            img_array = np.expand_dims(img_array, axis=0)
            img_array = preprocess_input(img_array)

            feature_vector = model.predict(img_array, verbose=0)
            features.append(feature_vector.flatten())
            frame_indices.append(frame_num)
            frame_num += 1

        cap.release()
        return np.array(features), frame_indices

    # Save anomalous frames
    def save_anomalous_frames(self, video_path, anomaly_indices, save_dir="anomalies_output"):
        os.makedirs(save_dir, exist_ok=True)
        cap = cv2.VideoCapture(video_path)
        frame_num = 0

        while True:
            ret, frame = cap.read()
            if not ret:
                break
            if frame_num in anomaly_indices:
                cv2.imwrite(f"{save_dir}/frame_{frame_num}.jpg", frame)
            frame_num += 1

        cap.release()
        return f"Saved {len(anomaly_indices)} anomalous frames in '{save_dir}'."

    # Main detection pipeline
    def detect_anomalies(self, video_path):
        # Extract features
        features, frame_indices = self.extract_features_from_video(video_path)
        total_frames = len(frame_indices)

        # Apply PCA if available, otherwise use raw features
        if self.pca is not None:
            features_processed = self.pca.transform(features)
        else:
            features_processed = features

        # Anomaly detection using Isolation Forest
        scores = self.isolation_forest.decision_function(features_processed)
        threshold = np.percentile(scores, 5)

        anomalous_frames = [frame_indices[i] for i, score in enumerate(scores) if score < threshold]

        # Save anomalous frames
        save_result = self.save_anomalous_frames(video_path, anomalous_frames)

        return {
            'total_frames': total_frames,
            'anomalous_frames': anomalous_frames,
            'anomaly_scores': scores.tolist(),
            'threshold': threshold,
            'save_result': save_result
        }



