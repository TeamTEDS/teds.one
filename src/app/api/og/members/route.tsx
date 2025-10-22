import { ImageResponse } from "next/og";
import { baseURL, people } from "@/resources";

export const runtime = 'edge';

async function loadGoogleFont(font: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status === 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error("failed to load font data");
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const user = url.searchParams.get("user") || "";

  // Find the person by first name
  const person = people.find(
    (p) => p.firstName.toLowerCase() === user.toLowerCase()
  );

  if (!person) {
    return new Response("User not found", { status: 404 });
  }

  const fontData = await loadGoogleFont("Geist:wght@400;700");

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: "#151515",
        padding: "0",
        overflow: "hidden",
      }}
    >
      {/* Left side - Profile image */}
      <div
        style={{
          display: "flex",
          width: "50%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          padding: "3rem",
        }}
      >
        <img
          src={baseURL + person.avatar}
          alt={person.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "1rem",
          }}
        />
      </div>

      {/* Right side - Name and title */}
      <div
        style={{
          display: "flex",
          width: "50%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: "3rem",
          paddingRight: "3rem",
          gap: "2rem",
          color: "white",
        }}
      >
        <span
          style={{
            fontSize: "5rem",
            fontWeight: "700",
            lineHeight: "1.1",
            whiteSpace: "wrap",
            textWrap: "balance",
            overflow: "hidden",
            letterSpacing: "-0.02em",
          }}
        >
          {person.name}
        </span>
        <span
          style={{
            fontSize: "2.5rem",
            lineHeight: "1.2",
            whiteSpace: "wrap",
            textWrap: "balance",
            opacity: "0.7",
          }}
        >
          {person.role} @ TEDS
        </span>
      </div>
    </div>,
    {
      width: 1280,
      height: 720,
      fonts: [
        {
          name: "Geist",
          data: fontData,
          style: "normal",
        },
      ],
    },
  );
}
