#from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect
from .models import *
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import *


def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
    else:
        form = UserCreationForm()
    return render(request, 'register.html', {'form': form})


def post_list(request):

   return render(request,'Blog/post_list.html', {})


@api_view(['GET'])
def get_posts(request):
    posts_objs = Posts.objects.all()
    serializer = PostsSerializer(posts_objs,many=True)
    return Response({'status':200, 'payload': serializer.data})


@api_view(['POST'])
def publish_posts(request):
    # Pass the incoming JSON data to the serializer
    serializer = PostsSerializer(data=request.data)

    # Validate the data
    if serializer.is_valid():
        # Save the validated data to the database
        serializer.save()
        print(serializer)
        return Response(serializer.data)
    else:
        # Return errors if validation fails
        return Response(serializer.errors, status=400)


@api_view(['GET'])
def get_comments(request):
    comment_objs = Comments.objects.all()
    serializer = CommentsSerializer(comment_objs,many=True)
    return Response({'status':200, 'payload': serializer.data})

@api_view(['POST'])
def post_comments(request):
    data = request.data  # data from the user
    print(data) 
    serializer = CommentsSerializer(data)

    if not serializer.is_valid():
        print(serializer.errors)  # This will print any validation errors to the terminal
        return Response({'status': 403, 'errors': serializer.errors, 'message': 'Something went wrong'})

    serializer.save()

    return Response({'status': 200, 'payload': serializer.data, 'message': 'Post created successfully'})

@api_view(['GET'])
def get_users(request):
    users = Users.objects.all()
    serializer = UsersSerializer(users, many=True)
    return Response({'status': 200, 'payload': serializer.data})

@api_view(['POST'])
def create_user(request):
    serializer = UsersSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'status': 201, 'payload': serializer.data, 'message': 'User created successfully'})
    return Response({'status': 403, 'errors': serializer.errors, 'message': 'Something went wrong'})


@api_view(['PUT'])
def update_user(request, id):
    try:
        user = Users.objects.get(id=id)  # Fetch the user by ID
    except Users.DoesNotExist:
        return Response({'status': 404, 'message': 'User not found'})

    serializer = Users(user, data=request.data, partial=True)  # partial=True for partial updates

    if serializer.is_valid():
        serializer.save()
        return Response({'status': 200, 'message': 'User updated successfully', 'data': serializer.data})
    return Response({'status': 400, 'errors': serializer.errors, 'message': 'Failed to update user'})

@api_view(['DELETE'])
def delete_all_post(request):
    Posts.objects.all().delete()  # Deletes all records in the Posts model
    return Response({'status': 204 ,'message': 'All posts deleted successfully!' })

@api_view(['DELETE'])
def delete_user(request, user_id):
    try:
        user = Users.objects.get(id=user_id)
        user.delete()
        return Response({"message": "User deleted successfully!", 'status':204})
    except User.DoesNotExist:
        return Response({"error": "User not found!", 'status': 204})
    
@api_view(['GET'])
def get_clicked_post(request, post_id, user_id):
    try:
        user = Users.objects.get(id = user_id)
        post = Posts.objects.get(id = post_id)

        user_data = UsersSerializer(user).data
        post_data = PostsSerializer(post).data

        payload = {"message" : "Post fetched" ,
                    "status" : 200,
                    "user": user_data,
                    "post" : post_data
                    }

        return Response(payload)
    
    except User.DoesNotExist:
        return Response({"error" : "User not found!", 'status': 204})
    except Posts.DoesNotExist:
        return Response({"error" : "Post not found!", 'status': 204})
    
@api_view(['POST'])
def update_likes(request):
    post = Posts.objects.get(id=request.data['post_id'])
    user = 1

    print("User:", user)
    print("Post Likes:", post.likes.all())

    # Use filter to check if the user is already in the likes
    if post.likes.filter(id=user).exists():
        print("User has already liked the post, unliking...")
        post.likes.remove(user)
        return Response({'status': 'unliked', 'likes_count': post.likes.count()})
    else:
        print("User hasn't liked the post yet, liking...")
        post.likes.add(user)
        return Response({'status': 'liked', 'likes_count': post.likes.count()})

   