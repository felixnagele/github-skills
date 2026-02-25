from django.test import TestCase
from .models import User, Team, Activity, Workout, Leaderboard

class UserModelTest(TestCase):
    def test_create_user(self):
        team = Team.objects.create(name="Marvel", description="Marvel Team")
        user = User.objects.create(email="ironman@marvel.com", username="IronMan", team=team)
        self.assertEqual(user.email, "ironman@marvel.com")
        self.assertEqual(user.team.name, "Marvel")

class TeamModelTest(TestCase):
    def test_create_team(self):
        team = Team.objects.create(name="DC", description="DC Team")
        self.assertEqual(team.name, "DC")

class ActivityModelTest(TestCase):
    def test_create_activity(self):
        team = Team.objects.create(name="Marvel")
        user = User.objects.create(email="spiderman@marvel.com", username="Spiderman", team=team)
        activity = Activity.objects.create(user=user, activity_type="Running", duration=30, date="2024-01-01")
        self.assertEqual(activity.activity_type, "Running")

class WorkoutModelTest(TestCase):
    def test_create_workout(self):
        workout = Workout.objects.create(name="Pushups", description="Upper body workout")
        self.assertEqual(workout.name, "Pushups")

class LeaderboardModelTest(TestCase):
    def test_create_leaderboard(self):
        team = Team.objects.create(name="Marvel")
        leaderboard = Leaderboard.objects.create(team=team, points=100)
        self.assertEqual(leaderboard.points, 100)
