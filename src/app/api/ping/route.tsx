const { MongoClient, ServerApiVersion } = require('mongodb');

export async function GET() {
  const uri = process.env.MONGODB_URI!;
  console.log(uri)

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    return new Response(JSON.stringify({ msg: "Ping success :) YAAAAAAAAYYYAYAYYA YIPPEE YAHOOO WOOOHOOO IT WORKED" }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  } finally {
    await client.close();
  }
}
