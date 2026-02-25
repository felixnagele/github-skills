from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db import DatabaseError
from pymongo.errors import PyMongoError
import os
from .models import User, Team, Activity, Workout, Leaderboard
from .serializers import (
    UserSerializer,
    TeamSerializer,
    ActivitySerializer,
    WorkoutSerializer,
    LeaderboardSerializer,
)


class SafeModelViewSet(viewsets.ModelViewSet):
    def list(self, request, *args, **kwargs):
        try:
            return super().list(request, *args, **kwargs)
        except (DatabaseError, PyMongoError):
            return Response([])


class UserViewSet(SafeModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class TeamViewSet(SafeModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer


class ActivityViewSet(SafeModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer


class WorkoutViewSet(SafeModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer


class LeaderboardViewSet(SafeModelViewSet):
    queryset = Leaderboard.objects.all()
    serializer_class = LeaderboardSerializer


@api_view(["GET"])
def api_root(request, format=None):
    codespace_name = os.environ.get("CODESPACE_NAME")
    if codespace_name:
        base_url = f"https://{codespace_name}-8000.app.github.dev/api"
    else:
        base_url = "http://localhost:8000/api"
    return Response(
        {
            "users": f"{base_url}/users/",
            "teams": f"{base_url}/teams/",
            "activities": f"{base_url}/activities/",
            "workouts": f"{base_url}/workouts/",
            "leaderboard": f"{base_url}/leaderboard/",
        }
    )
