export const onRequestGet: PagesFunction = async ({ request }) => {
  const url = new URL(request.url);
  const resource = url.searchParams.get("resource");

  // check if resource is valid and has dylankri.sh
  if (!resource?.startsWith("acct:") || !resource.endsWith("@dylankri.sh")) {
    return new Response("Not Found", { status: 404 });
  }

  const webfingerResponse = {
    subject: resource,
    links: [
      {
        rel: "http://openid.net/specs/connect/1.0/issuer",
        href: "https://sso.dylankri.sh"
      }
    ]
  };

  return new Response(JSON.stringify(webfingerResponse), {
    headers: {
      "Content-Type": "application/jrd+json"
    }
  });
};
