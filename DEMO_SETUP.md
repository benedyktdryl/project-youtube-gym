# Demo Account Setup

This guide will help you set up a demo account with pre-populated data to quickly explore all features of TrainFlow.

## Quick Setup

### Step 1: Create Demo Account

1. Navigate to the registration page
2. Sign up with these credentials:
   - **Email:** demo@trainflow.com
   - **Password:** Demo123!
   - **Name:** Demo User

### Step 2: Seed Demo Data

After creating the account, run the seed script to populate sample data:

1. Open the Supabase SQL Editor
2. Copy and paste the contents of `seed-demo-data.sql`
3. Execute the script

The script will automatically:
- Update user preferences (muscle gain goal, 30-min workouts, medium intensity)
- Add available equipment (mat, dumbbells, resistance bands)
- Set preferred workout days (Mon, Wed, Fri, Sat)
- Schedule 4 workouts for the current week
- Add sample chat conversation history

## What Gets Seeded

### User Preferences
- Goal: Muscle Gain
- Duration: 30 minutes
- Intensity: Medium
- Equipment: Mat, Dumbbells, Resistance Bands
- Preferred Days: Monday, Wednesday, Friday, Saturday

### Scheduled Workouts
- **Monday** (2 days ago): Full Body HIIT - ✅ Completed
- **Wednesday** (today): Ab Workout - Pending
- **Friday** (in 2 days): Lower Body Workout - Pending
- **Saturday** (in 3 days): Yoga/Stretching - Pending

### Chat History
Sample conversation showing:
- User asking for help with fitness goals
- AI assistant providing workout recommendations
- Discussion about available equipment and schedule

## Testing All Features

After setup, you can test:

1. **Dashboard** - View workout stats and upcoming workouts
2. **Calendar** - See scheduled workouts and mark as complete
3. **Videos** - Browse the workout video catalog
4. **Settings** - View and modify preferences
5. **Profile** - See user profile information
6. **Chat** - View conversation history with AI assistant

## Login Credentials

The demo account credentials are displayed on the login page:
- **Email:** demo@trainflow.com
- **Password:** Demo123!

## Alternative: Manual Setup

If you prefer not to use the seed script, you can manually:
1. Create an account with any credentials
2. Go to Settings and configure your preferences
3. Browse Videos and add workouts to your calendar
4. Use the Chat feature to interact with the AI assistant

## Notes

- The demo account is shared, so data may change if multiple people use it
- For a private testing experience, create your own account
- The seed script can be run multiple times (it will reset the data)
- All scheduled workout dates are relative to the current date
