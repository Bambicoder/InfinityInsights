from django.conf import settings
from django.db import models
from django.utils import timezone



class Users(models.Model):
    username = models.CharField(max_length=15, unique=True)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=25)
    profile_pic = models.ImageField(upload_to='profile_pic/',blank=True, null=True)

    def __str__(self):
        return self.username
    

class Posts(models.Model):
    uid = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    tag1 = models.CharField(max_length=50,blank = True, null = True)
    tag2 = models.CharField(max_length=50,blank = True, null = True)
    tag3 = models.CharField(max_length=50,blank = True, null = True)
    content = models.TextField()
    image_url =  models.ImageField(upload_to='images/',blank=True, null=True)
    video_url = models.FileField(upload_to='videos/' ,blank=True, null=True)
    published_at = models.DateTimeField(default=timezone.now)
    likes = models.ManyToManyField(Users, related_name='liked_posts',blank=True)
    liked = models.BooleanField(default=False)

    def __str__(self):
        return self.title



class Comments(models.Model):
    uid = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    post_id = models.ForeignKey('Posts',on_delete=models.CASCADE)
    comment_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

