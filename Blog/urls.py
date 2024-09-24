"""
URL configuration for Blog project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))

from django.contrib import admin
from django.urls import path

"""

from django.urls import path
from . import views

urlpatterns = [
    path('', views.post_list, name='post_list'),
    path('Posts/', views.get_posts, name = 'get_posts'),
    path('Posts/publish/', views.publish_posts, name='publish_posts'),
    path('Comments/',views.get_comments, name = 'get_comments'),
    path('Comments/post/',views.post_comments, name = 'post_comments'),
    path('users/', views.get_users, name='get_users'),
    path('users/create/', views.create_user, name='create_user'),
    path('users/update/', views.update_user, name='update_user'),
    path('users/update/', views.update_user, name='update_user'),
    path('delete_all_post/', views.delete_all_post, name='delete_all_post'),
    path('delete-user/<int:user_id>/', views.delete_user, name='delete_user'),
    path('posts/<int:post_id>/<int:user_id>/', views.get_clicked_post, name='get_clicked_post'),
    path('posts/update/likes/', views.update_likes, name = 'update_likes')

]
