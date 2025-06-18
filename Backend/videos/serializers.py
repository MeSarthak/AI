from rest_framework import serializers

class UploadSerializer(serializers.Serializer):
    file = serializers.FileField()

    def validate_file(self, value):
        allowed_types = ['video', 'image']
        if not any(value.content_type.startswith(t) for t in allowed_types):
            raise serializers.ValidationError('Only video or image files are allowed.')
        return value
