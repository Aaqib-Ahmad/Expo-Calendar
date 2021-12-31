export const clientId = "Paste your Google OAuth client id here.";

export const scopes = ["https://www.googleapis.com/auth/calendar.events","https://www.googleapis.com/auth/calendar","https://www.googleapis.com/auth/userinfo.profile",
"https://www.googleapis.com/auth/userinfo.email","https://www.googleapis.com/auth/calendar.settings.readonly" ];

export const redirectUrl = "host.exp.exponent:/oauth2redirect/google";

export const calendarId = 'Paste your Google calendar id from Google calendars';

export const apiKey = 'Paste your api key generate on Google Developers console';

export const URL = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}`;