export async function POST(req: Request) {
  try {
    const body = await req.json();
  
    const res = await fetch('https://api.producthunt.com/v2/api/graphql', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEV_TOKEN}`,
        'Host': 'api.producthunt.com',
      },
      body: JSON.stringify(body),
    });
  
    const data = await res.json();

    if (data.error) {
      throw new Error(data);
    }
  
    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(`Error: ${(error as Error).message}`, {
      status: 500,
    });
  }
}