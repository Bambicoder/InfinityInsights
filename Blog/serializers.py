from rest_framework import serializers
from .models import *
from django.utils.timesince import timesince
from django.utils import timezone
from datetime import datetime, timedelta

class UsersSerializer(serializers.ModelSerializer):
	class Meta:
		model = Users
		fields = '__all__'

class PostsSerializer(serializers.ModelSerializer):
	likes_count = serializers.SerializerMethodField()
	time_ago = serializers.SerializerMethodField()

	class Meta: 
		model = Posts
		fields = '__all__'

	def get_time_ago(self,obj):
		now = timezone.now()
		time_difference = now - obj.published_at

		if time_difference > timedelta(minutes=1) :
			return timesince(obj.published_at, now).split(',')[0] + " ago"
		return 'just now'
	
	def get_likes_count(self,obj):
		return obj.likes.count()
		


class CommentsSerializer(serializers.ModelSerializer):
	class Meta:
		model = Comments
		fields = '__all__'

