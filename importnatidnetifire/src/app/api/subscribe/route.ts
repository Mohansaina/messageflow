import { NextRequest, NextResponse } from 'next/server';

// In a real application, you would connect to a database here
// For this example, we'll use an array to simulate storing emails
let subscribedEmails: string[] = [];

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Basic email validation
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check if email already exists
    if (subscribedEmails.includes(email)) {
      return NextResponse.json(
        { message: 'Email already subscribed' },
        { status: 409 }
      );
    }

    // Add email to our "database"
    subscribedEmails.push(email);

    // In a real application, you would save to a database like:
    // await db.collection('subscribers').insertOne({ email, createdAt: new Date() });

    console.log(`New subscription: ${email}`);
    console.log(`Total subscribers: ${subscribedEmails.length}`);

    return NextResponse.json(
      { message: 'Successfully subscribed!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to process subscription' },
      { status: 500 }
    );
  }
}

// Optional: API endpoint to get subscriber count
export async function GET() {
  return NextResponse.json({ count: subscribedEmails.length });
}