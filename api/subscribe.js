export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body;
  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Invalid email" });
  }

  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;

  if (!API_KEY || !AUDIENCE_ID) {
    return res.status(500).json({ error: "Missing env vars", hasKey: !!API_KEY, hasAudience: !!AUDIENCE_ID });
  }

  const DC = API_KEY.split("-").pop();
  const url = `https://${DC}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `apikey ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        status: "subscribed",
      }),
    });

    const data = await response.json();

    if (response.ok || data.title === "Member Exists") {
      return res.status(200).json({ success: true });
    }

    return res.status(500).json({ error: "Mailchimp error", detail: data.detail, title: data.title, status: response.status });
  } catch (err) {
    return res.status(500).json({ error: "Server error", message: err.message });
  }
}
